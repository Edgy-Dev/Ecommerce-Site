import React from 'react'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {isEmpty} from 'lodash'
import {Elements, StripeProvider} from 'react-stripe-elements'

import {openDialog, closeDialog, resetDialog} from '../../store/actions/app'
import {makeSelectAnonUser, makeSelectUser} from '../../store/selectors/user'
import {checkout} from '../../store/actions/user'
import withTransition from '../shared/transitionWrapper'

import {SelectShippingAddress} from '../ShippingAddresses'

import CartItem from './CartItem'
import {
  DisplaySelectedAddress,
  DisplaySelectedPaymentOption
} from './DisplayUserOptions'
import AddShippingFrom from '../ShippingAddresses/AddShippingForm'
import AddPaymentForm from '../PaymentInfos/AddPaymentForm'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.user = isEmpty(this.props.user) ? this.props.anonUser : this.props.user

    this.state = {
      selectedAddress: this.initializeAddress(props),
      selectedPaymentOption: {},
      cart: this.initializeCart(props)
    }
  }

  initializeAddress = () => {
    return this.user.addresses.length > 0 ? this.user.addresses[0] : {}
  }

  initializePaymentOption = () => {
    return this.user.paymentInfos.length > 0 ? this.user.paymentInfos[0] : {}
  }

  initializeCart = () => {
    return this.user.cart
  }

  addAddress = data => {
    this.selectedAddress = data
    this.props.closeDialog()
  }

  handleAddAddress = () => {
    const dialogOptions = {
      open: true,
      title: 'Add address',
      renderContent: () => <AddShippingFrom addAddress={this.addAddress} />
    }
    this.props.openDialog(dialogOptions)
  }

  setPayment = token => {
    this.setState(state => ({
      ...state,
      selectedPaymentOption: {
        lastFourDigits: token.card.last4,
        expiration: `${token.card.exp_month}/${token.card.exp_year}`,
        source: token.id
      }
    }))

    this.props.closeDialog()
  }

  handleCloseDialog = () => {
    this.props.closeDialog()
  }

  handleAddPayment = () => {
    const dialogOptions = {
      open: true,
      title: 'Add payment',
      renderContent: () => (
        <Elements>
          <AddPaymentForm displayPayment={this.setPayment} />
        </Elements>
      )
    }
    this.props.openDialog(dialogOptions)
  }

  handleSelectAddress = event => {
    event.preventDefault()
    const selectedAddress = this.user.addresses.find(
      address => address.id === +event.target.value
    )
    this.setState(state => ({...state, selectedAddress: selectedAddress}))
  }

  handleSelectPaymentOption = event => {
    event.preventDefault()
    const selectedPaymentInfo = this.user.paymentInfos.find(
      option => option.id === +event.target.value
    )
    this.setState(state => ({...state, selectedPaymentInfo}))
  }

  checkout = () => {
    this.props.checkout(this.state)
  }

  render() {
    if (this.user.cart.length === 0) {
      return <h1>No products in cart</h1>
    } else {
      return (
        <div style={{width: '80%', margin: '30px auto'}}>
          <h1 style={{margin: '30px 0'}}>Review Order</h1>
          {this.user.cart.map(cartItem => (
            <CartItem key={cartItem.product.id} cartItem={cartItem} />
          ))}

          <h1 style={{margin: '30px 0'}}>Select Shipping Address</h1>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <SelectShippingAddress
              selectedAddress={this.state.selectedAddress}
              addresses={this.user.addresses}
              handleChange={this.handleSelectAddress}
            />
            <Button
              style={{height: '50px'}}
              variant="contained"
              color="primary"
              onClick={this.handleAddAddress}
            >
              Add Address
            </Button>
          </div>
          <DisplaySelectedAddress address={this.state.selectedAddress} />

          <h1 style={{margin: '30px 0'}}>Add Payment Option</h1>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              style={{height: '50px', margin: '10px 0'}}
              variant="contained"
              color="primary"
              onClick={this.handleAddPayment}
            >
              Add Payment
            </Button>
          </div>
          {!isEmpty(this.state.selectedPaymentOption) && (
            <DisplaySelectedPaymentOption
              paymentOption={this.state.selectedPaymentOption}
            />
          )}
          <div style={{margin: '30px 0'}} />
          <Button
            style={{width: '100%'}}
            variant="contained"
            color="primary"
            onClick={this.checkout}
          >
            Checkout
          </Button>
        </div>
      )
    }
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  anonUser: makeSelectAnonUser()
})

const mapDispatchToProps = dispatch => ({
  checkout: data => dispatch(checkout(data)),
  openDialog: dialogOptions => dispatch(openDialog(dialogOptions)),
  closeDialog: () => {
    dispatch(closeDialog())
    dispatch(resetDialog())
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, withTransition)(Cart)
