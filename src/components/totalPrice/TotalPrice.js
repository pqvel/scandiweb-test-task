import { PureComponent } from "react";
import { connect } from "react-redux";

class TotalPrice extends PureComponent {
  render() {
    const { products, currentValue } = this.props
    const total = products.reduce((acc, product) => {
      const { count, prices } = product;
      const value = prices.filter(({ currency }) => currency.symbol === currentValue)[0].amount
      return acc + value * count
    }, 0)
    return (
      <span>
        {total}
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.cartProducts,
  currentValue: state.currencies.currentValue
})

export default connect(mapStateToProps)(TotalPrice)