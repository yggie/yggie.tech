import React from 'react'
import ReactDOMServer from 'react-dom/server'
import requireFresh from '../require-fresh.js'

export default function renderFileAsPage(filepath, assets) {
  const Component = requireFresh(filepath).default
  const element = React.createElement(Component, {
    assets: assets,
  })

  return renderComponentAsPage(element)
}

function renderComponentAsPage(component) {
  return {
    html: renderComponentAsHTML(component),
  }
}

function renderComponentAsHTML(component) {
  return `<!DOCTYPE html>${ReactDOMServer.renderToString(component)}`
}
