import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addToCart, fetchOneProduct } from '../../core/redux/slices/productsSlice'
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductAttributes from '../../components/productAttributes/ProductAttributes';
import ProductPrice from '../../components/productPrice/ProductPrice';
import Spinner from '../../components/spinner/Spinner';
import { attrPositions } from '../../core/constants/attrPositions';
import { generateId } from '../../core/helpers/generateId';
import './productPage.scss'

class ProductPage extends Component {
  state = {
    product: null,
  }

  componentDidMount() {
    const { productId } = this.props.match.params
    const { products, fetchOneProduct } = this.props
    
    const product = products.find(item => productId === item.id)
    
    if (!product) {
      fetchOneProduct(productId)
      return
    }
      
    this.setState({ product })
  }

  componentDidUpdate (__, prevState) {
    const { productId } = this.props.match.params
    const { products } = this.props
    const product = products.find(item => productId === item.id)

    if (JSON.stringify(product) !== JSON.stringify(prevState.product)) {
      this.setState({ product })
    }
  }

  onAddToCart = (product) => {
    this.props.addToCart(product)
  }

  render() {
    if (!this.state.product) {
      return (
        <div className="product__spinner">
          <Spinner />
        </div>
      )
    }
    
    const { product } = this.state
    const { gallery, uid, attributes, name, brand, prices, description, inStock } = product

    return (
      <section className="product-page product">
        <div className="container product__container">
          <ProductSlider images={gallery} />
          <div className="product__info">
            <h4 className="product__name">{name}</h4>
            <span className="product__brand">{brand}</span>
            <div>
              <ProductAttributes
                productId={uid}
                attributes={attributes}
                position={attrPositions.products}
              />
            </div>
            <h4 className="product__price-label">
              Price:
            </h4>
            <ProductPrice 
              myClass="product__price"
              prices={prices}
            />
            {inStock && <button className="product__btn" onClick={() => this.onAddToCart(product)}>Add to cart</button>}
            <div 
              className="product__description"
              dangerouslySetInnerHTML={{__html: description}}
              key={generateId()}
            />
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  cartProducts: state.products.cartProducts
})

const mapDispatchToProps = {
  addToCart,
  fetchOneProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage))