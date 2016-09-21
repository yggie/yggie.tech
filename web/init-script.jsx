import preact from 'preact'

export default class InitScript extends preact.Component {
  scriptString() {
    const props = {
      assets: this.props.assets,
    }

    const componentModuleName = this.props.componentModuleName
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
      __html: `requirejs.config(${JSON.stringify(config)});require(['preact', '${componentModuleName}'],function(preact, Component) {
        preact.render(preact.h(Component.default, ${JSON.stringify(props)}),document,document);
      })`,
    }
  }

  render() {
    return <script dangerouslySetInnerHTML={this.scriptString()}></script>
  }
}
