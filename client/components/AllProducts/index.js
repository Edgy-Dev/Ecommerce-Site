import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {retreiveProducts} from '../../store/productAbstract'
import {SingleProductView} from '../SingleProduct'

class AllProductView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const productList = this.props.allProducts
    return (
      <div>
        <h2>{this.props.allProducts.length} Products</h2>
        <div>
          <ul>
            {productList.map(product => (
              <div>
                <li key={product.name}>{product.name}</li>
                <NavLink
                  to={`/products/${product.id}`}
                  component={SingleProductView}
                >
                  <img src={product.thumbImage} />
                </NavLink>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {allProducts: state.products.allProducts}
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts() {
      dispatch(retreiveProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductView)
