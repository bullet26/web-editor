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
