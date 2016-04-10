const render = typeof window === 'undefined'
  ? require('./server').default
  : require('./client').default

export default render
