import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ProductPrice from '../productPrice/ProductPrice'
import CartSVG from '../../assets/CartSVG'
import './productItem.scss'

export default class ProductItem extends PureComponent {
  render() {
    const { product, currUrl, onAddToCart } = this.props
    const { gallery, name, prices, id, inStock } = product
    
    return (
      <li className="products__item">
        <Link className="products__item-link" to={`${currUrl}/${id}`}>
          <div className="products__item-img-wrapper">
            <img 
              className="products__item-img" 
              src={gallery[0]} 
              alt={name}
            />
            <View inStock={inStock} onAddToCart={onAddToCart} />
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

class View extends PureComponent {
  render() {
    const { inStock, onAddToCart } = this.props

    if (inStock) {
      return (
        <button className="products__item-btn" onClick={onAddToCart}>
          <CartSVG fill="white" />
        </button>
      )
    }

    return <span className="products__item-out-stock">out of stock</span>
  }
}