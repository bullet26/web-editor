export const colors = [
  '#3498db',
  '#0a4cd1',
  '#2ecc71',
  '#f39c12',
  '#1abc9c',
  '#f20ade',
  '#3366ff',
  '#16a085',
  '#f1c40f',
  '#9b59b6',
]

export const sortByType = (arr: { type: string }[]) =>
  arr.sort((a, b) => {
    if (a.type > b.type) {
      return 1
    }
    if (a.type < b.type) {
      return -1
    }
    return 0
  })
