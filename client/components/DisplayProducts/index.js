import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {retreiveProducts} from '../../store/productAbstract'
import {SingleProductView} from '../SingleProduct'

import withTransition from '../shared/transitionWrapper'
import {withStyles as WithStyles} from '@material-ui/core/styles'
import styles from './styles'

import Product from './Product'

const DisplayProducts = props => {
  const {classes} = props
  const productList = props.displayedProducts

  if (props.products.length === 0) {
    return <h1>We sold everything ...</h1>
  } else {
    return (
      <div className={classes.productsWrapper}>
        <h2>{this.props.allProducts.length} Products</h2>
        <div className={classes.orders}>
          {productList.map(product => <Product product={product} />)}
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withStyles = WithStyles(styles)

export default compose(withConnect, withStyles, withTransition)(DisplayProducts)
