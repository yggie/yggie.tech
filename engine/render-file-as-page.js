import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StandardLayout from '../web/layouts/standard-layout.jsx'

export default function renderFileAsPage(filepath, assets) {
  const Component = require(filepath).default
  const pageConfig = Component.PAGE_CONFIG || {}
  const component = React.createElement(Component, {})
  const layout = layoutElementForConfig(pageConfig, assets, {
    main: component,
  })

  return renderComponentAsPage(layout)
}

function renderComponentAsPage(component) {
  return {
    html: renderComponentAsHTML(component),
  }
}

function renderComponentAsHTML(component) {
  return `<!DOCTYPE html>${ReactDOMServer.renderToString(component)}`
}

function layoutElementForConfig(pageConfig, assets, elements) {
  return React.createElement(pageConfig.layout || StandardLayout, {
    title: pageConfig.title,
    assets: assets,
    elements: {
      main: elements.main,
    },
  })
}
