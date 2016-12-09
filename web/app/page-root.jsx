import preact from 'preact'

let router = null // instantiated later as a singleton
export const ROOT_ID = 'root-view'

export default class PageRoot extends preact.Component {
  render() {
    return (
      <div {...this.props} id={ROOT_ID}>
        {this.props.children}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.updatePageMeta(nextProps)
  }

  componentDidMount() {
    this.updatePageMeta(this.props)

    router.mountPage(this)
  }

  updatePageMeta({ pageMetadata }) {
    select('title').innerText = pageMetadata.title || 'Page Title'

    function select(selector) {
      return document.head.querySelector(selector)
    }
  }
}

class Router {
  constructor() {
    this.pageNode = null
    this.initialized = false
  }

  mountPage(pageNode) {
    this.pageNode = pageNode

    if (!this.initialized) {
      this.initialize()
      this.initialized = true
    }
  }

  initialize() {
    if (!this.isBrowserCompatibleWithRouter()) {
      return
    }

    const { history, location } = window
    const { href: currentHref } = location

    if (document.attachEvent) {
      document.attachEvent('onclick', this.onClickEvent.bind(this))
    } else {
      document.addEventListener('click', this.onClickEvent.bind(this), false)
    }

    history.replaceState(null, this.pageModuleName(currentHref), currentHref)

    const self = this
    window.onpopstate = function onpopstate() {
      const { href } = location
      self.loadPage(href, true)
    }
  }

  onClickEvent(event) {
    const { target } = event

    if (target.tagName === 'A') {
      const { href } = target

      if (href.includes(window.location.origin)) {
        event.preventDefault()

        this.loadPage(href)
      }
    }
  }

  loadPage(url, skipPushState) {
    const pageModule = this.pageModuleName(url)
    const self = this
    require([pageModule], (Component) => {
      self.renderPage(Component, pageModule, url, skipPushState)
    }, () => {
      require(['404-page'], (ErrorPage) => {
        self.renderPage(ErrorPage, pageModule, url, skipPushState)
      })
    })
  }

  renderPage(Component, pageModule, url, skipPushState) {
    const { pageNode } = this
    const { base: rootElement, props: { site } } = pageNode
    const rootParent = rootElement.parentNode
    const vnode = preact.h(Component.default, {
      site: site,
    })
    preact.render(vnode, rootParent, rootElement)

    if (!skipPushState) {
      window.history.pushState(null, pageModule, url)
    }
  }

  pageModuleName(href) {
    const path = href.replace(window.location.origin, '')
    const normalizedPath = path.replace(/^\//, '').replace(/\/$/, '')

    return normalizedPath.length ? `${normalizedPath}-page` : 'index-page'
  }

  isBrowserCompatibleWithRouter() {
    return window.location &&
        window.history &&
        typeof window.onpopstate !== 'undefined'
  }
}

router = new Router()
