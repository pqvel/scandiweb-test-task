import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        description
        category
        gallery
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
  }
`
