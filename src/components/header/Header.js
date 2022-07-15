import { Component } from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import CurrencySelect from '../currencySelect/CurrencySelect'
import Bag from '../bag/Bag'
import Categories from '../categories/Categories'
import './header.scss'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <Categories />
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

export default Header