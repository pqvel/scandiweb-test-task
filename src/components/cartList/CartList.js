import { Component } from "react"
import { connect } from "react-redux"
import { changeProductCount, removeFromCart } from "../../core/redux/slices/productsSlice"
import CartItem from "../cartItem/CartItem"

class CartList extends Component {
  
  onChangeCount = (value, count, id) => {
    const { removeFromCart, changeProductCount } = this.props
    if (value === 0 || (count === 1 && value === -1)) {
      removeFromCart(id)
      return;
    }
    changeProductCount({ count: count + value, id })
  }
  
  render() {
    const { products } = this.props;

    if (!products.length) {
      return (
        <div className="cart__empty">
          <p>your cart is empty</p>
        </div>
      )
    }

    return (
      <ul className="cart__list">
        {products.map(item => (
          <CartItem 
            product={item} 
            key={item.uid}
            onChangeCount={this.onChangeCount}
          />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.cartProducts,
})

const mapDispatchToProps = {
  changeProductCount,
  removeFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList)