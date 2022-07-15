import apolloClient from '../graphql/ApolloClient'
import { generateId } from '../helpers/generateId'
import { GET_CATEGORIES } from '../graphql/query/getCategories'
import { GET_PRODUCTS } from '../graphql/query/getProducts'
import { GET_CURRENCIES } from '../graphql/query/getCurrencies'
import { GET_ONE_PRODUCT } from '../graphql/query/getOneProduct'

const productService = () => {

  const _transformProduct = (product) => {
    return {
      ...product,
      count: 0,
      uid: generateId(),
      attributes: product.attributes.map((attr) => {
        return {
          ...attr,
          items: attr.items.map((item, i) => {
            return {
              ...item,
              active: i === 0
            }
          })
        }
      })
    }
  }

  const _request = (query, variables) => {
    return apolloClient.query({query, variables})
  }
  
  const getCurrencies = () => {
    return _request(GET_CURRENCIES)
            .then(({ data }) => data.currencies)
  }

  const getCategories = () => {
    return _request(GET_CATEGORIES)
            .then(({ data }) => data.categories)
  }

  const getProducts = (category = 'all') => {
    const variables = {input: {title: category}}
    return _request(GET_PRODUCTS, variables)
            .then(({ data }) => {
              const { products } = data.category
              return {
                ...data.category,
                products: products.map(_transformProduct)
              }
            })
  }

  const getOneProduct = (id) => {
    return _request(GET_ONE_PRODUCT, { id })
            .then(({ data }) => _transformProduct(data.product))
  }

  return {
    getCategories,
    getProducts,
    getOneProduct,
    getCurrencies
  }
}

export default productService