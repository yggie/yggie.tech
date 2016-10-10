import preact from 'preact'
import preactRenderToString from 'preact-render-to-string'

import moduleName from './module-name.js'
import requireFresh from '../require-fresh.js'
import ServerRenderingTemplate from '../../web/server-rendering-template.jsx'

export default function renderFileAsPage(filepath, assets, { appDir, scriptPaths }) {
  const Component = requireFresh(filepath).default
  const fileModuleName = moduleName({
    base: appDir,
    filepath: filepath,
  })

  return renderComponentAsPage(
    <ServerRenderingTemplate assets={assets}
        pageModule={fileModuleName}
        scriptPaths={scriptPaths}>
      <Component></Component>
    </ServerRenderingTemplate>
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
