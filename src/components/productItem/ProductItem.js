import { Component } from 'react'
import { Link } from 'react-router-dom'
import ProductPrice from '../productPrice/ProductPrice'
import CartSVG from '../../assets/CartSVG'
import './productItem.scss'

export default class ProductItem extends Component {
  render() {
    const { product, currUrl, onAddToCart } = this.props
    const { gallery, name, prices, id } = product
    
    return (
      <li className="products__item">
        <Link className="products__item-link" to={`${currUrl}/${id}`}>
          <div className="products__item-img-wrapper">
            <img 
              className="products__item-img" 
              src={gallery[0]} 
              alt={name}
            />
            <button className="products__item-btn" onClick={onAddToCart}>
              <CartSVG fill="white" />
            </button>
          </div>
          <h5 className="products__item-name">{name}</h5>
          <ProductPrice 
            myClass="products__item-price"
            prices={prices}
          />
        </Link>
      </li>
    )
  }
}
