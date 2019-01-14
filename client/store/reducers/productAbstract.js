import * as types from '../constants/productAbstract'

const defaultState = {
  allProducts: [],
  displayedProducts: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.GET_INVENTORY:
      // OB/JD: no need for the `=`, `:` instead
      return [...state, (allProducts = action.products)]
    default:
      return state
  }
}
