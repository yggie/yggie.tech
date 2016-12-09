import preact from 'preact'
import uglify from 'uglify-js'
import { ROOT_ID } from './app/page-root.jsx'

export default class ServerRenderingTemplate extends preact.Component {
  render() {
    const { children, pageTitle, globalStylesheet } = this.initializePage()

    return (
      /* eslint-disable max-len */
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charSet="UTF-8"/>
        <title>{pageTitle}</title>

        <link href="https://fonts.googleapis.com/css?family=Muli|Roboto+Mono:300" rel="stylesheet"/>
        <link href={`${globalStylesheet}`} rel="stylesheet"/>
      </head>

      <body>
        {children}

        <script dangerouslySetInnerHTML={this.scriptString()}></script>
      </body>
      </html>
      /* eslint-enable max-len */
    )
  }

  initializePage() {
    if (this.props.children.length !== 1) {
      throw new Error('Exactly one component must be specified as the child!')
    }

    const { assets, children } = this.props
    const { globalStylesheet } = assets

    // assumes that the required attributes are passed in the props, as required
    // by the PageRoot component
    const Node = children[0].nodeName
    const { pageMetadata } = new Node(this.props).render().attributes
    const { title: pageTitle } = pageMetadata

    return { children, pageTitle, globalStylesheet }
  }

  scriptString() {
    const { pageModule, assets, scriptPaths } = this.props
    const { cdnPaths } = assets
    const filteredCdnPaths = Object.keys(cdnPaths).filter((key) => {
      return key !== 'requirejs'
    }).reduce((acc, key) => {
      acc[key] = cdnPaths[key]

      return acc
    }, {})

    const paths = Object.keys(filteredCdnPaths).reduce((acc, key) => {
      acc[key] = filteredCdnPaths[key].replace(/\.js$/, '')

      return acc
    }, {})

    const requireJsConfig = {
      paths: paths,
      baseUrl: scriptPaths,
    }

    const minified = uglify.minify(`
      (function (window, document) {
        if (window.attachEvent) {
          window.attachEvent('onload', onLoadWindow);
        } else {
          window.addEventListener('load', onLoadWindow, false);
        }

        function onLoadWindow() {
          var script = document.createElement('script');
          script.src = '${cdnPaths.requirejs}';

          document.head.appendChild(script);

          if (script.attachEvent) {
            script.attachEvent('onload', onLoadScript);
          } else {
            script.addEventListener('load', onLoadScript, false);
          }
        }

        function onLoadScript() {
          requirejs.config(${JSON.stringify(requireJsConfig)});

          require(['preact', 'site', '${pageModule}'], onLoadDependencies);
        }

        function onLoadDependencies(preact, site, Component) {
          var root = document.getElementById('${ROOT_ID}');
          var component = preact.h(Component.default, { site: site.default });
          preact.render(component, document.body, root);
        }
      }).call(this, window, document);`, {
        fromString: true,
      })

    return {
      __html: minified.code,
    }
  }
}
