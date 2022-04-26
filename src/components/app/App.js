import { Component } from 'react'
import Header from '../header/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CategoryPage from '../../pages/categoryPage/CategoryPage'
export default class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/:categoryId">
              <CategoryPage />
            </Route>
          </Switch>
        </Router>
      </main>
    )
  }
}
