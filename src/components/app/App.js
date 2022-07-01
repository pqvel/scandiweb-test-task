import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../header/Header'
import CategoryPage from '../../pages/categoryPage/CategoryPage'
import ProductPage from '../../pages/productPage/ProductPage'
import CartPage from '../../pages/cartPage/CartPage'


export default class App extends Component {
  render() {
    return (
      <main className="main">
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/cart" exact>
              <CartPage />
            </Route>
            <Route path="/:categoryId" exact>
              <CategoryPage />
            </Route>
            <Route path="/:categoryId/:productId" exact>
              <ProductPage />
            </Route>
          </Switch>
        </Router>
      </main>
    )
  }
}
