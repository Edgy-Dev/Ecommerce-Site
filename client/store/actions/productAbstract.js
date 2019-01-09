import * as types from '../constants/productAbstract'

/* Action creators */
export const getProducts = products => ({type: types.GET_INVENTORY, products})

/* Thunk creators */
export const retreiveProducts = () => async dispatch => {
  try {
    const res = await axios.get('/productabstract')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}
