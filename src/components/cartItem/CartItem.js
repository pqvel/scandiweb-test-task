import { PureComponent } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { attrPositions } from '../../core/constants/attrPositions'
import { generateId } from '../../core/helpers/generateId'
import ProductAttributes from '../productAttributes/ProductAttributes'
import ProductPrice from '../productPrice/ProductPrice'
import 'swiper/css'
import './cartItem.scss'

export default class CartItem extends PureComponent {

  onCountChange = (value) => {
    const { onChangeCount, product } = this.props
    const { count, uid } = product
    return onChangeCount(value, count, uid)
  }

  render() {
    const { name, brand, prices, attributes, gallery, count, uid } = this.props.product

    return (
      <li className="cart__item">
        <div className="cart__item-left">
          <span className="cart__item-name">{name}</span>
          <span className="cart__item-brand">{brand}</span>
          <ProductPrice 
            myClass="cart__item-price"
            prices={prices}
          />
          <ProductAttributes 
            productId={uid}
            attributes={attributes}
            position={attrPositions.cartProducts}
          />
        </div>
        <div className="cart__item-right">
          <div className="cart__item-counter">
            <span className="cart__item-counter-count">{count}</span>
            <button onClick={() => this.onCountChange(1)} className="cart__item-counter-btn" />
            <button onClick={() => this.onCountChange(-1)} className="cart__item-counter-btn" />
          </div>
          <div className="cart__item-slider">
            <Swiper
              slidesPerView={1}
              modules={[Navigation]}
              navigation={gallery.length > 1}
              spaceBetween={50}
              grabCursor
            >
              {gallery.map(src => (
                <SwiperSlide key={generateId()}>
                  <img
                    className="cart__item-img" 
                    src={src} 
                    alt="product" 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </li>
    )
  }
}