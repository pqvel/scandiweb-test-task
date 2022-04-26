import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import apolloClient from '../../core/ApolloClient'
import { getCategories } from '../../core/graphql/query/getCategories'
import CartSVG from '../../assets/cartSVG'
import './header.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as Dollar } from '../../assets/dollar.svg'

export default class Header extends Component {
  state = {
    categories: [],
  }
  
  componentDidMount() {
    apolloClient.query({ query: getCategories }).then(({ data }) =>
      this.setState({
        categories: data.categories,
      })
    )
  }

  componentDidUpdate() {
    console.log(this.state.categories)
  }

  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <ul className="categories">
            {this.state.categories.map(({ name }, i) => (
              <li className="categories__item" key={i}>
                <NavLink
                  className="categories__link"
                  activeClassName="categories__link--active"
                  to={name}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Logo />

          <div>
            <Dollar />
            <CartSVG />
          </div>
        </div>
      </header>
    )
  }
}
