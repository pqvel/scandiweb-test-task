import { ApolloClient, InMemoryCache, defaultDataIdFromObject } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      // FIXME: workaround buggy apollo cache, dont cache certain types at all!
      switch (object.__typename) {
        case 'AttributeSet':
          return Math.random()
        default:
          return defaultDataIdFromObject(object) // fall back to default handling
      }
    }
  })
})

export default apolloClient
