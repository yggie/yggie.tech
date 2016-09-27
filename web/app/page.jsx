import preact from 'preact'

let router = null // instantiated later as a singleton

export default class Page extends preact.Component {
  render() {
    if (this.props.children.length !== 1) {
      throw new Error('Exactly one component must be specified as the child!')
    }

    return this.props.children[0]
  }

  componentWillReceiveProps(nextProps) {
    this.updatePageMeta(nextProps)
  }

  componentDidMount() {
    this.updatePageMeta(this.props)

    router.mountPage(this)
  }

  updatePageMeta(props) {
    document.head.querySelector('title').innerText = props.title || 'Page Title'
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
    const { href } = location

    if (document.attachEvent) {
      document.attachEvent('onclick', this.onClickEvent.bind(this))
    } else {
      document.addEventListener('click', this.onClickEvent.bind(this), false)
    }

    history.replaceState(null, this.pageModuleName(href), href)

    const self = this
    window.onpopstate = function onpopstate() {
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
    const { base: pageElement } = pageNode
    const root = pageElement.parentNode
    preact.render(preact.h(Component.default), root, pageElement)

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
