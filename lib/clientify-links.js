import page from 'page'

document.addEventListener('click', (e) => {
  const target = e.target || e.srcElement
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    if (href && !href.match(/^http/)) {
      e.preventDefault()
      page(href)
    }
  }
})
