import path from 'path'
import preact from 'preact'
import preactRenderToString from 'preact-render-to-string'

import InitScript from '../web/init-script.jsx'
import requireFresh from '../require-fresh.js'

export default function renderFileAsPage(filepath, assets, webDir) {
  const Component = requireFresh(filepath).default
  // TODO combine this with the gulp normalize somehow?
  const moduleName = path.relative(webDir, filepath)
    .replace(path.extname(filepath), '')
  const element = preact.h(Component, {
    assets: assets,
    initScript: preact.h(InitScript, {
      assets: assets,
      componentModuleName: moduleName,
    }),
  })

  return renderComponentAsPage(element)
}

function renderComponentAsPage(component) {
  return {
    html: renderComponentAsHTML(component),
  }
}

function renderComponentAsHTML(component) {
  return `<!DOCTYPE html>${preactRenderToString(component)}`
}
