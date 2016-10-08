import preact from 'preact'
import StandardLayout from '../app/layouts/standard-layout.jsx'

export default class Index extends preact.Component {
  render() {
    return (
      <StandardLayout pageTitle="The Index Page">
        <h1>Hello World!</h1>

        <p>This is a sample page with some soon to be added content</p>

        <ul>
          <li><a href="who">Who</a></li>
          <li><a href="what">What</a></li>
          <li><a href="where">Where</a></li>
          <li><a href="when">When</a></li>
          <li><a href="why">Why</a></li>
          <li><a href="https://twitter.com/">Twitter</a></li>
          <li><a target="_blank" href="https://www.facebook.com/">Facebook</a></li>
        </ul>
      </StandardLayout>
    )
  }
}
