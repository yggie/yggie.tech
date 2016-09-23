import preact from 'preact'
import uglify from 'uglify-js'

const ROOT_ID = 'main-view'

export default class PageTemplate extends preact.Component {
  render() {
    if (this.props.children.length !== 1) {
      throw new Error('Exactly one component must be specified as the child!')
    }

    // TODO this makes a huge assumption that the child is always wrapped up in
    // the PageMeta tag or some layout that uses PageMeta internally
    const Node = this.props.children[0].nodeName
    const pageMeta = new Node().render().attributes

    // TODO get the title from the child somehow?
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>{pageMeta.title}</title>

        <link rel="stylesheet" href={this.props.assets.globalStylesheet}/>
      </head>

      <body>
        <div id={ROOT_ID}>
          {this.props.children}
        </div>

        <script dangerouslySetInnerHTML={this.scriptString()}></script>
      </body>
      </html>
    )
  }

  scriptString() {
    const pageModule = this.props.pageModule
    const cdnPaths = this.props.assets.cdnPaths
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

    const config = {
      paths: paths,
      baseUrl: 'js',
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
          requirejs.config(${JSON.stringify(config)});

          require(['preact', '${pageModule}'], function(preact, Component) {
            var root = document.getElementById('${ROOT_ID}');
            preact.render(preact.h(Component.default), root, root.children[0]);
          });
        }
      }).call(this, window, document);`, {
        fromString: true,
      })

    return {
      __html: minified.code,
    }
  }
}
