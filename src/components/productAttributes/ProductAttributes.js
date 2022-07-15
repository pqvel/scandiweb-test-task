import { PureComponent } from "react";
import { connect } from "react-redux";
import { changeActiveProductAttr, changeActiveCartProductAttr } from "../../core/redux/slices/productsSlice";
import { generateId } from "../../core/helpers/generateId"
import { attrPositions } from "../../core/constants/attrPositions"

class ProductAttributes extends PureComponent {
  
  onChangeActiveAttr = (attrId, attrItemId) => {
    const { changeActiveProductAttr, changeActiveCartProductAttr, productId, position } = this.props

    const args = {
      productId,
      attrId,
      attrItemId
    }

    switch (position) {
      case attrPositions.products:
        return changeActiveProductAttr(args)
      case attrPositions.cartProducts:
        return changeActiveCartProductAttr(args)
      default: return
    } 
  }

  render() {
    const { attributes } = this.props;

    return (
      <>
        {
          attributes.map(({ type, items, name, id }) => {
            switch (type) {
              case 'swatch':
                return (
                  <div key={generateId()}>
                    <ProductAttrTitle name={name}/>
                    <ul className="cart__item-attribute">
                      {items.map((attrItem) => (
                        <li   
                          className={`cart__item-attr-${type}${attrItem.active ? ` cart__item-attr-${type}--active` : ''}`}
                          key={generateId()}
                          onClick={() => this.onChangeActiveAttr(id, attrItem.id)}
                          style={{backgroundColor: attrItem.value}}
                        />
                      ))}
                    </ul>
                  </div>
                );
              case 'text':
                return (
                  <div key={generateId()}>
                    <ProductAttrTitle name={name}/>
                    <ul className="cart__item-attribute">
                      {items.map((attrItem) => (
                        <li 
                          className={`cart__item-attr-${type}${attrItem.active ? ` cart__item-attr-${type}--active` : ''}`}
                          key={generateId()}
                          onClick={() => this.onChangeActiveAttr(id, attrItem.id)}
                        >{attrItem.displayValue}</li>
                      ))}
                    </ul>
                  </div>
                );
              default:
                return null  
            }
          })
        }  
      </>
    )
  }
}

class ProductAttrTitle extends PureComponent {
  render() {
    return (
      <h4 className='cart__item-attribute-title'>
        {this.props.name}:
      </h4>
    )
  }
}


const mapStateToProps = (state) => ({
  products: state.products.cartProducts
})

const mapDispatchToProps = {
  changeActiveProductAttr,
  changeActiveCartProductAttr,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttributes)