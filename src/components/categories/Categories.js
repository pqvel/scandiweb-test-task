import { PureComponent } from "react";
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../../core/redux/slices/productsSlice'
import './categories.scss'

class Categories extends PureComponent {
  
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    return (
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
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.products.categories,
})

const mapDispatchToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)