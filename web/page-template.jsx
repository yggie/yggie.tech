import preact from 'preact'

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

        {this.scriptTags()}

        <script dangerouslySetInnerHTML={this.scriptString()}></script>
      </body>
      </html>
    )
  }

  scriptTags() {
    return (this.props.assets.scripts || []).map((scriptLink) => {
      return <script src={scriptLink} key={scriptLink}></script>
    })
  }

  scriptString() {
    const pageModule = this.props.pageModule
    const cdnPaths = this.props.assets.cdnPaths
    const paths = Object.keys(cdnPaths).reduce((acc, key) => {
      acc[key] = cdnPaths[key].replace(/\.js$/, '')

      return acc
    }, {})

    const config = {
      paths: paths,
      baseUrl: 'js',
    }

    return {
      __html: `requirejs.config(${JSON.stringify(config)});require(['preact', '${pageModule}'],function(preact, Component) {
        var root=document.getElementById('${ROOT_ID}');
        preact.render(preact.h(Component.default),root,root.children[0]);
      })`,
    }
  }
}
