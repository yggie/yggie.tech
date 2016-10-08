import preact from 'preact'

let router = null // instantiated later as a singleton
export const ROOT_ID = 'root-view'

export default class Page extends preact.Component {
  render() {
    return (
      <div id={ROOT_ID}>
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

  updatePageMeta(props) {
    select('title').innerText = props.pageTitle || 'Page Title'

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
      self.loadPage(self.pageModuleName(href), href, true)
    }
  }

  onClickEvent(event) {
    const { target } = event

    if (target.tagName === 'A') {
      const { href } = target

      if (href.includes(window.location.origin)) {
        event.preventDefault()

        this.loadPage(this.pageModuleName(href), href)
      }
    }
  }

  loadPage(pageModule, url, skipPushState) {
    const self = this
    require([pageModule], (Component) => {
      self.renderPage(Component, pageModule, url, skipPushState)
    }, () => {
      require(['pages/404'], (ErrorPage) => {
        self.renderPage(ErrorPage, pageModule, url, skipPushState)
      })
    })
  }

  renderPage(Component, pageModule, url, skipPushState) {
    const { pageNode } = this
    const { base: rootElement } = pageNode
    const rootParent = rootElement.parentNode
    const vnode = preact.h(Component.default)
    preact.render(vnode, rootParent, rootElement)

    if (!skipPushState) {
      window.history.pushState(null, pageModule, url)
    }
  }

  pageModuleName(href) {
    const moduleName = 'pages/' + href.replace(window.location.origin, '')
      .replace(/^\//, '')
      .replace(/\/$/, '')

    return moduleName === 'pages/' ? 'pages/index' : moduleName
  }

  isBrowserCompatibleWithRouter() {
    return window.location &&
        window.history &&
        typeof window.onpopstate !== 'undefined'
  }
}

router = new Router()
