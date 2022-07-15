import { PureComponent } from "react";
import { connect } from "react-redux";
import { totalPrice } from "../../core/helpers/totalPrice";

class TotalPrice extends PureComponent {
  render() {
    const { products, currentValue, myClass = '' } = this.props

    return (
      <span className={myClass}>
        {currentValue}{totalPrice(products, currentValue)}
      </span>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.cartProducts,
  currentValue: state.currencies.currentValue
})

export default connect(mapStateToProps)(TotalPrice)