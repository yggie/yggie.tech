import preact from 'preact'

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

    mountRouter()
  }

  updatePageMeta(props) {
    document.head.querySelector('title').innerText = props.title || 'Page Title'
  }
}

let routerMounted = false
function mountRouter() {
  if (routerMounted) {
    return
  }

  routerMounted = true

  if (document.attachEvent) {
    document.attachEvent('onclick', onClickEvent)
  } else {
    document.addEventListener('click', onClickEvent, false)
  }

  window.history.replaceState(null, pageModuleName(window.location.href), window.location.href)
  window.onpopstate = function onpopstate() {
    loadPage(pageModuleName(window.location.href), window.location.href, true)
  }
}

function onClickEvent(event) {
  const target = event.target

  if (target.tagName === 'A') {
    const href = target.href

    if (href.includes(window.location.origin)) {
      event.preventDefault()

      loadPage(pageModuleName(href), href)
    }
  }
}

function loadPage(pageModule, url, skipPushState) {
  require([pageModule], (Component) => {
    const root = document.getElementById('main-view')
    preact.render(preact.h(Component.default), root, root.children[0])

    if (!skipPushState) {
      window.history.pushState(null, pageModule, url)
    }
  }, () => {
    require(['pages/404'], (ErrorPage) => {
      const root = document.getElementById('main-view')
      preact.render(preact.h(ErrorPage.default), root, root.children[0])

      if (!skipPushState) {
        window.history.pushState(null, pageModule, url)
      }
    })
  })
}

function pageModuleName(href) {
  const moduleName = 'pages/' + href.replace(window.location.origin, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')

  return moduleName === 'pages/' ? 'pages/index' : moduleName
}
