import { PureComponent } from "react";
import { connect } from "react-redux";

class ProductPrice extends PureComponent {
  render() {
    const { myClass = '', prices, currentValue } = this.props
    return (
      <span className={myClass}>
        {
          prices
            .filter(item => currentValue === item.currency.symbol)
            .map(({ currency, amount }) => `${currency.symbol}${amount}`)
        }
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  currentValue: state.currencies.currentValue,
})

export default connect(mapStateToProps)(ProductPrice)