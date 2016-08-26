import React from 'react'

export default class StandardLayout extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8"/>
        <title>{this.props.title || 'Page Title'}</title>

        <link rel="stylesheet" href={this.props.assets.globalStylesheet}/>
      </head>

      <body>
        {this.props.elements.main}
      </body>
      </html>
    )
  }
}
