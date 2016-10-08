import preact from 'preact'
import preactRenderToString from 'preact-render-to-string'

import moduleName from './module-name.js'
import PageTemplate from '../web/page-template.jsx'
import requireFresh from '../require-fresh.js'

export default function renderFileAsPage(filepath, assets, { appDir, scriptPaths }) {
  const Component = requireFresh(filepath).default
  const fileModuleName = moduleName({
    base: appDir,
    filepath: filepath,
  })

  return renderComponentAsPage(
    <PageTemplate assets={assets}
        pageModule={fileModuleName}
        scriptPaths={scriptPaths}>
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
