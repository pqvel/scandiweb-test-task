export const totalPrice = (products, currentValue) => {
  return products.reduce((acc, product) => {
    const { count, prices } = product;
    const value = prices.filter(({ currency }) => currency.symbol === currentValue)[0].amount
    return acc + value * count
  }, 0).toFixed(2)
}