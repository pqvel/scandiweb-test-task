import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { fetchCategories } from '../../core/redux/slices/productsSlice'
import CurrencySelect from '../currencySelect/CurrencySelect'
import Bag from '../bag/Bag'
import './header.scss'

class Header extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props

    return (
      <header className="header">
        <div className="container header__container">
          <ul className="categories">
            {categories.map(({ name }, i) => (
              <li className="categories__item" key={i}>
                <NavLink
                  className="categories__link"
                  activeClassName="categories__link--active"
                  to={`/${name}`}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Logo />
          <div className="header__wrapper">
            <CurrencySelect/>
            <Bag />
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
})

const mapDispatchToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)