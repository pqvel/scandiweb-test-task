import { Component, PureComponent} from 'react'
import { connect } from 'react-redux'
import { changeCurrentValue, fetchCurrencies } from '../../core/redux/slices/currenciesSlice'
import CheckMarkSVG from '../../assets/CheckMarkSVG'
import './currencySelect.scss'

class CurrencySelect extends Component {
  state = {
    currentValue: "",
    isOpen: false
  }

  componentDidMount() {
    this.props.fetchCurrencies()
  }

  handleClick = (currencyValue) => {
    this.props.changeCurrentValue(currencyValue)
    this.toggleSelect()
  }

  toggleSelect = (event, stopPropagation = false) => {
    if (stopPropagation) {
      event.stopPropagation()
    }
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { currentValue, currencies } = this.props
    const { isOpen } = this.state
    return (
      <>
        <div className="currency">
        <div onClick={this.toggleSelect} className="currency__wrapper">
          <span className="currency__value">{currentValue}</span>
          <CheckMarkSVG myClass={isOpen ? "currency__checkmark currency__checkmark--close" : "currency__checkmark"} />
        </div>
        {isOpen ? <ul className="currency__select">
          {currencies.map((currency) => (
            <CurrencySelectItem 
              changeCurrentValue={this.handleClick} 
              key={currency.label} 
              currency={currency}
              active={currentValue === currency.symbol}
            />
          ))}
        </ul> : null}
      </div>
      {isOpen ? <div onClick={(e) => this.toggleSelect(e, true)} className="currency__popup"></div> : null}
      </>
    )
  }
}

class CurrencySelectItem extends PureComponent {
  render() {
    const { label, symbol } = this.props.currency
    const { changeCurrentValue, active } = this.props
    
    return (
      <li
        className={`currency__item${active ? ' active' : ''}`} 
        onClick={() => changeCurrentValue(symbol)} 
      >
          <span className="currency__item-value">{symbol}</span>
          <span className="currency__item-label">{label}</span>
      </li>
    )
  }
}

const mapStateToProps = (state) => ({
  currentValue: state.currencies.currentValue,
  currencies: state.currencies.currencies
})

const mapDispatchToProps = {
  changeCurrentValue,
  fetchCurrencies
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect)