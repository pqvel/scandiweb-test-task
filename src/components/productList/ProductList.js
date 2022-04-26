import { Component } from 'react'
import apolloClient from '../../core/ApolloClient'
import { GET_PRODUCTS } from '../../core/graphql/query/getProducts'
import ProductItem from '../productItem/ProductItem'
import { withRouter } from 'react-router-dom'
import './productList.scss'

class ProductList extends Component {
  state = {
    products: [],
    categoryName: ''
  }

  componentDidMount() {
    const { categoryId } = this.props.match.params
    this.getProducts(categoryId)
  }

  componentDidUpdate(prevProps) {
    const currCategoryId = this.props.match.params.categoryId
    if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
      this.getProducts(currCategoryId)
    }
  }
  getProducts(categoryId) {
    apolloClient
      .query({ query: GET_PRODUCTS, variables: {input: {title: categoryId}}})
      .then(({ data }) => {
        const { name, products } = data.category
        this.setState({
          categoryName: name,
          products: products,
        })
      })
  }

  render() {
    const { categoryName, products } = this.state
    return (
      <section className="products">
        <div className="container products__container">
          <h3 className="products__title">{categoryName}</h3>
          <ul className="products__list">
            {products.map((item) => {
              return <ProductItem key={item.id} product={item} />
            })}
          </ul>
        </div>
      </section>
    )
  }
}

export default withRouter(ProductList)