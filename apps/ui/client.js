import page from 'page'
import render from 'render-client'
import router from './router'

document.addEventListener('click', (e) => {
  const target = e.target || e.srcElement
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    if (!href.match(/^http/)) {
      e.preventDefault()
      page(href)
    }
  }
})

page(render())
router()()
