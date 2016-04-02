import page from 'page'
import render from 'render-client'
import router from './router'

document.addEventListener('click', (e) => {
  let target = e.target || e.srcElement
  console.log('CLICK', target.tagName)
  if (target.tagName === 'A') {
    let href = target.getAttribute('href')
    if (!href.match(/^http/)) {
      console.log('PAGE!', href)
      e.preventDefault()
      page(href)
    }
  }
})

page(render())
router()()
