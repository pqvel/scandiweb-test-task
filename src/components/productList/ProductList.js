import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchProducts, addToCart, resetErorr } from '../../core/redux/slices/productsSlice'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import ProductItem from '../productItem/ProductItem'
import './productList.scss'

class ProductList extends Component {

  componentDidMount() {
    const { categoryId } = this.props.match.params
    this.props.fetchProducts(categoryId)
  }

  componentDidUpdate (prevProps) {
    const currCategoryId = this.props.match.params.categoryId
    const prevCategoryId = prevProps.match.params.categoryId
    
    if (currCategoryId !== prevCategoryId) {
      this.props.fetchProducts(currCategoryId)
    }
  }

  onAddToCart = (event, product) => {
    event.stopPropagation(); event.preventDefault();
    this.props.addToCart(product)
  }

  onError = () => {
    const { resetErorr, fetchProducts } = this.props
    const { categoryId } = this.props.match.params
    
    resetErorr()
    fetchProducts(categoryId)
  }

  render() {
    const { products, error, loading } = this.props

    if (error) {
      return <ErrorMessage clickHandler={() => this.onError()}/>
    }

    if (loading) {
      return (
        <div className="products__spinner">
          <Spinner />
        </div>
      )
    }
    
    return (
      <ul className="products__list">
        {products ? 
          products.map((item) => {
            const { categoryId } = this.props.match.params
            return ( 
              <ProductItem 
                key={item.id} 
                product={item} 
                currUrl={categoryId}
                onAddToCart={(event) => this.onAddToCart(event, item)}
              />
            )
          }) : null
        }
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.loading,
  error: state.products.error
})

const mapDispatchToProps = {
  addToCart,
  fetchProducts,
  resetErorr
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductList))