import { Component } from 'react'
import { Link } from 'react-router-dom'
import CartSVG from '../../assets/cartSVG'
import './productItem.scss'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props
    const { gallery, name, prices } = product
    return (
      <li className="products__item">
        <Link className="products__item-link" to="/">
          <div className="products__item-img-wrapper">
            <img className="products__item-img" src={gallery[0]} alt={name} />
            <button className="products__item-btn">
              <CartSVG fill="white" />
            </button>
          </div>
          <h5 className="products__item-name">{name}</h5>
          <span className="products__item-price">
           {prices[0].currency.symbol}{prices[0].amount}
          </span>
        </Link>
      </li>
    )
  }
}
