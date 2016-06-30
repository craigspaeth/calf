const onDropBackground = (tree, item) => {
  const background = tree.select('campaign').select('background')
  if (background.get()) return
  if (item.type === 'color') background.set({ type: 'color', color: 'red' })
}

export const onDrop = (tree, item) => {
  onDropBackground(tree, item)
}

export const onEndEditorDrag = (tree, monitor) => {
  console.log('end')
  const editor = tree.select('editor')
  const delta = monitor.getDifferenceFromInitialOffset()
  const { x, y } = editor.get()
  editor.set('x', x + delta.x)
  editor.set('y', y + delta.y)
  editor.set('hidden', false)
  console.log('moo', editor.get())
}

export const onBeginEditorDrag = (tree) => {
  tree.select('editor').set('hidden', true)
}
