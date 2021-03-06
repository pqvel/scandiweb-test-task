import { Component } from "react"
import { connect } from "react-redux"
import { removeAllProductsFromCart } from "../../core/redux/slices/productsSlice"
import { totalPrice } from "../../core/helpers/totalPrice";
import CartList from "../../components/cartList/CartList";
import TotalPrice from "../../components/totalPrice/TotalPrice";
import "./cartPage.scss"

class CartPage extends Component {
  render() {
    const { products, currentValue, removeAllProductsFromCart } = this.props

    const count = products.reduce((acc, item) => {
      return acc + item.count
    }, 0)

    const total = totalPrice(products, currentValue)
    const tax = 21;
    const totalTax = total * tax / 100;

    return (
      <section className="cart">
        <div className="container cart__constainer">
          <h2 className="cart__title">Cart</h2>
          <CartList />
          <div className="cart__order">
            <table className="cart__table">
              <tbody>
                <tr className="cart__table-item">
                  <td>Tax {tax}%:</td>
                  <td>{currentValue}{totalTax.toFixed(2)}</td>
                </tr>
                <tr className="cart__table-item">
                  <td>Quantity:</td>
                  <td>{count}</td>
                </tr>
                <tr className="cart__table-item">
                  <td className="bold">Total:</td>
                  <td><TotalPrice /></td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => removeAllProductsFromCart()} className="cart__btn">Order</button>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.cartProducts,
  currentValue: state.currencies.currentValue,
})

const mapDispatchToProps = {
  removeAllProductsFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)