import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProductList from '../../components/productList/ProductList'

class CategoryPage extends Component {
  render() {
    const { category } = this.props

    return (
      <section className="products">
        <div className="container products__container">
          <h3 className="products__title">{category}</h3>
          <ProductList />  
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  category: state.products.currentCategory,
})

export default connect(mapStateToProps)(withRouter(CategoryPage))