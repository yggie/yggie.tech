import React from 'react'

export default class InitScript extends React.Component {
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
      __html: `requirejs.config(${JSON.stringify(config)});require(['react', 'react-dom', '${componentModuleName}'],function(React, ReactDOM, Component) {
        ReactDOM.render(React.createElement(Component.default, ${JSON.stringify(props)}),document);
      })`,
    }
  }

  render() {
    return <script dangerouslySetInnerHTML={this.scriptString()}></script>
  }
}
