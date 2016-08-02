import cheerio from 'cheerio'

export default async (ctx, next) => {
  // On the server run the code and inject the return value as a script appended
  // to the end of the head tag.
  if (typeof window === 'undefined') {
    let data
    ctx.bootstrap = async (run) => {
      data = await run()
      return data
    }
    await next()
    if (!data) return
    const $ = cheerio.load(ctx.body)
    const stringified = JSON.stringify(data)
     .replace(/</g, '\\u003c')
     .replace(/-->/g, '--\\>')
     .replace(/\u2028/g, '\\u2028')
     .replace(/\u2029/g, '\\u2029')
    $('head').append(`
      <script>
        window.__unikoadFetchBootstrap__ = ${stringified}
      </script>
    `)
    ctx.body = $.html()

  // On the client skip running the code and load the data from the bootstrapped
  // data instead.
  } else {
    ctx.bootstrap = () => Promise.resolve(window.__unikoadFetchBootstrap__)
    next()
  }
}
