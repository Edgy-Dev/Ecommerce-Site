import {createSelector} from 'reselect'

const selectProduct = state => state.products

export const makeSelectProductsLoaded = () =>
  createSelector(
    selectProduct,
    productState => productState.allProducts.length > 0
  )
