export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#56565C',
  orange: '#D17B05',
  rgba: (val: number) => {
    return {
      white: `rgba(255, 255, 255, ${val})`,
      black: `rgba(0, 0, 0, ${val})`,
      gray: `rgba(86, 86, 92, ${val})`,
      orange: `rgba(209, 123, 5, ${val})`,
    }
  },
}
