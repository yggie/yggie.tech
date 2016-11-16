import preact from 'preact'
import preactRenderToString from 'preact-render-to-string'

import moduleName from './module-name.js'
import requireFresh from '../require-fresh.js'
import ServerRenderingTemplate from '../../web/server-rendering-template.jsx'

const sitePath = `${__dirname}/../../web/app/site.js`

export default function renderFileAsPage(filepath, assets, { appDir, scriptPaths }) {
  const { default: site } = requireFresh(sitePath)
  const { default: Component } = requireFresh(filepath)
  const fileModuleName = moduleName({
    base: appDir,
    filepath: filepath,
  })

  return renderComponentAsPage(
    <ServerRenderingTemplate assets={assets}
        site={site}
        pageModule={fileModuleName}
        scriptPaths={scriptPaths}>
      <Component site={site}></Component>
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
