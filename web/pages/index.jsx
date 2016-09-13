import React from 'react'
import StandardLayout from '../layouts/standard-layout.jsx'

const MODULE_NAME = 'pages/index'

export default class Index extends React.Component {
  onClickBigBadButton() {
    alert('The big bad button has been clicked')
  }

  render() {
    return (
      <StandardLayout assets={this.props.assets}
        componentModuleName={MODULE_NAME}>
        <main>
          <h1>Hello World!</h1>

          <p>This is a sample page with some soon to be added content</p>

          <button onClick={this.onClickBigBadButton}>
            Big Bad Button
          </button>
        </main>
      </StandardLayout>
    )
  }
}
