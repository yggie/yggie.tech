import preact from 'preact'
import InitScript from '../init-script.jsx'

export default class StandardLayout extends preact.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>{this.props.title || 'Page Title'}</title>

        <link rel="stylesheet" href={this.props.assets.globalStylesheet}/>
      </head>

      <body>
        {this.props.children}

        {this.scriptTags()}

        {this.props.initScript}
      </body>
      </html>
    )
  }

  scriptTags() {
    return (this.props.assets.scripts || []).map((scriptLink) => {
      return <script src={scriptLink} key={scriptLink}></script>
    })
  }
}
