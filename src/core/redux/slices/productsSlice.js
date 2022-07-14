import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { generateId } from '../../helpers/generateId'
import productService from '../../services/productService'


const { getCategories, getProducts, getOneProduct } = productService()

export const fetchCategories = createAsyncThunk( 'products/fetchCategories', getCategories )
export const fetchProducts = createAsyncThunk( 'products/fetchProducts', getProducts )
export const fetchOneProduct = createAsyncThunk( 'products/fetchOneProduct', getOneProduct )

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cartProducts: [],
    currentCategory: 'all',
    categories: [],
    loading: false,
    error: false
  },
  reducers: {
    resetErorr: (state) => {
      state.error = false
    },
    addToCart: (state, action) => {
      if (!action.payload.inStock) {
        return
      }

      const equalCartProducts = []
      state.cartProducts.forEach((cartProduct, i) => {
        if (cartProduct.id === action.payload.id) {
          equalCartProducts.push({
            cartProduct,
            index: i
          })
        }
      })

      if (equalCartProducts.length === 0) {
        state.cartProducts.push({...action.payload, count: 1 })
        return
      }

      const equalCartProductIndex = equalCartProducts.findIndex((cartProduct) => {
        return cartProduct.cartProduct.attributes.every((attr, i) => {
          return attr.items.every((item, k) => {
            return item.active === action.payload.attributes[i].items[k].active
          })
        })
      })
      
      if (equalCartProductIndex === -1) {
        state.cartProducts.push({...action.payload, count: 1, uid: generateId()})
        return
      }

      const cartProductIndex = equalCartProducts[equalCartProductIndex].index
      state.cartProducts[cartProductIndex].count++

    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(({ uid }) => uid !== action.payload)
    },
    removeAllProductsFromCart: (state) => {
      state.cartProducts = []
    },
    changeProductCount: (state, action) => {
      const i = state.cartProducts.findIndex(item => item.uid === action.payload.id)
      if (i === -1) {
        state.cartProducts.push({...action.payload, count: 1, uid: generateId()})
      } else {
        state.cartProducts[i] = { ...state.cartProducts[i], count: action.payload.count  }
      }
    },
    changeActiveProductAttr: (state, action) => {
      const { productId, attrId, attrItemId } = action.payload
      const productIndex = state.products.findIndex(({uid}) => uid === productId)

      state.products[productIndex].attributes.forEach(attr => {
        if (attr.id === attrId) {
          attr.items = attr.items.map(item => {
            item.active = item.id === attrItemId
            return item
          })
        }
      });
    },
    changeActiveCartProductAttr: (state, action) => {
      const { productId, attrId, attrItemId } = action.payload      
      const productIndex = state.cartProducts.findIndex(({uid}) => uid === productId)
      const product = state.cartProducts[productIndex]

      product.attributes.forEach(attr => {
        if (attr.id === attrId) {
          attr.items = attr.items.map(item => {
            item.active = item.id === attrItemId
            return item
          })
        }
      })

      state.cartProducts[productIndex] = product
      
      const equalCartProducts = []
      
      state.cartProducts.forEach((cartProduct, i) => {
        if (cartProduct.id === product.id && cartProduct.uid !== product.uid) {
          equalCartProducts.push({
            index: i,
            cartProduct
          })
        }
      })

      if (equalCartProducts.length === 0) {
        return
      }
      
      const equalCartProductsIndex = equalCartProducts.findIndex(({ cartProduct }) => {
        return cartProduct.attributes.every((attr, i) => {
          return attr.items.every((item, k) => {
            return item.active === product.attributes[i].items[k].active
          })
        })
      })

      if (equalCartProductsIndex === -1) {
        return
      }
      const equalCartProduct = state.cartProducts[equalCartProducts[equalCartProductsIndex].index]
      state.cartProducts[equalCartProducts[equalCartProductsIndex].index] = {
        ...equalCartProduct,
        count: equalCartProduct.count + product.count
      }

      state.cartProducts = state.cartProducts.filter(cartProduct => cartProduct.uid !== product.uid)
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products
      state.currentCategory = action.payload.name
      state.loading = false
    },
    [fetchProducts.pending]: (state) => {
      state.loading = true
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = false
      state.error = true
    },
    [fetchOneProduct.fulfilled]: (state, action) => {
      state.products = []
      state.products.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  resetErorr,
  addToCart,
  removeFromCart,
  removeAllProductsFromCart,
  changeProductCount,
  changeActiveProductAttr,
  changeActiveCartProductAttr
 } = productsSlice.actions

export default productsSlice.reducer