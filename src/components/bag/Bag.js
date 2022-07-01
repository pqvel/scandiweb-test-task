import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAllProductsFromCart } from '../../core/redux/slices/productsSlice'
import CartList from '../cartList/CartList'
import CartSVG from '../../assets/CartSVG'
import './bag.scss'

class Bag extends Component {
  state = {
    isOpen: false
  }

  componentDidUpdate(__, prevState) {
    if (!prevState.isOpen && this.state.isOpen) {
      document.body.style.overflow = 'hidden';
    }
    if (prevState.isOpen && !this.state.isOpen) {
      document.body.style.overflow = 'unset';
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isOpen } = this.state;
    const { products, removeAllProductsFromCart, currentValue } = this.props
    
    const count = products.reduce((acc, item) => {
      return acc + item.count
    }, 0)

    const total = products.reduce((acc, product) => {
      const { count, prices } = product;
      const value = prices.filter(({ currency }) => currency.symbol === currentValue)[0].amount
      return acc + value * count
    }, 0)

    return (
      <>  
        <div className="bag">
          <div className="bag__head" onClick={this.toggleModal}>
            <CartSVG />
            {count ? <span className="bag__count"> {count < 10 ? count : '9+'}</span> : null}
          </div>
          { isOpen ? 
            <div className="bag__body">
              <p className="bag__text">
                My bag,&nbsp;<span>{count} items</span>
              </p>
              <div className="bag__view">
                <div className="bag__view-wrapper">
                  {
                    !products.length ? <p className="bag__empty">your bag is empty</p> : <CartList />
                  }
                </div>
              </div>
              <div className="bag__row bag__total-block">
                <span className="bag__total-label">Total</span>
                <span className="bag__total-value">{currentValue}{total.toFixed(2)}</span>
              </div>
              <div className="bag__row bag__btns">
                <Link onClick={this.toggleModal} className="bag__link" to="/cart">View bag</Link>
                <button onClick={() => removeAllProductsFromCart()} className="bag__btn">Check out</button>
              </div>

            </div> : null
          }
        </div>
        {isOpen ? (
          <>
            <div className="bag__popup" onClick={this.toggleModal}></div>
            <div className="bag__popup bag__popup--black"></div>
          </>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.cartProducts,
  currentValue: state.currencies.currentValue
})

const mapDispatchToProps = {
  removeAllProductsFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Bag)