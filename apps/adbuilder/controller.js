const onDropBackground = (tree, item) => {
  const background = tree.select('campaign').select('background')
  if (background.get()) return
  if (item.type === 'color') background.set({ type: 'color', color: 'red' })
}

export const onDrop = (tree, item) => {
  onDropBackground(tree, item)
}
