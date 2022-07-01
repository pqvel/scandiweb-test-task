import { gql } from '@apollo/client'

export const GET_ONE_PRODUCT = gql`
  query GET_ONE_PRODUCT($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        
        items {
          displayValue
          value
          id
        }
      }
      prices {
          currency {
            label
            symbol
          }
          amount
      }
      brand
    }
  }
`
