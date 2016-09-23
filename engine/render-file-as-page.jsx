import path from 'path'
import preact from 'preact'
import preactRenderToString from 'preact-render-to-string'

import PageTemplate from '../web/server-only/page-template.jsx'
import requireFresh from '../require-fresh.js'

export default function renderFileAsPage(filepath, assets, webDir) {
  const Component = requireFresh(filepath).default
  // TODO combine this with the gulp normalize somehow?
  const moduleName = path.relative(webDir, filepath)
    .replace(path.extname(filepath), '')

  return renderComponentAsPage(
    <PageTemplate assets={assets} pageModule={moduleName}>
      <Component></Component>
    </PageTemplate>
  )
}

function renderComponentAsPage(component) {
  return {
    html: renderComponentAsHTML(component),
  }
}

function renderComponentAsHTML(component) {
  return `<!DOCTYPE html>${preactRenderToString(component)}`
}
