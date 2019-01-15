import React from 'react'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {isEmpty} from 'lodash'

import {openDialog, closeDialog, resetDialog} from '../../store/actions/app'
import {makeSelectAnonUser, makeSelectUser} from '../../store/selectors/user'
import {checkout} from '../../store/actions/user'
import withTransition from '../shared/transitionWrapper'

import {SelectShippingAddress} from '../ShippingAddresses'
import {SelectPaymentInfo} from '../PaymentInfos'

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
    console.log(props)
    this.user = isEmpty(this.props.user) ? this.props.anonUser : this.props.user

    this.state = {
      selectedAddress: this.initializeAddress(props),
      selectedPaymentOption: this.initializePaymentOption(props)
    }

    this.user = isEmpty(this.props.user) ? this.props.anonUser : this.props.user
  }

  initializeAddress = () => {
    return this.user.addresses.length > 0 ? this.user.addresses[0] : {}
  }

  initializePaymentOption = () => {
    return this.user.paymentInfos.length > 0 ? this.user.paymentInfos[0] : {}
  }

  addAddress = data => {
    console.log(data)
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

  addPayment = data => {
    console.log(data)
    this.props.closeDialog()
  }

  handleAddPayment = () => {
    const dialogOptions = {
      open: true,
      title: 'Add payment',
      renderContent: () => <AddPaymentForm addPayment={this.addPayment} />
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
    console.log(this.state)
  }

  render() {
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

        <h1 style={{margin: '30px 0'}}>Choose Payment Option</h1>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <SelectPaymentInfo
            selectedPayment={this.state.selectedPaymentOption}
            paymentInfos={this.user.paymentInfos}
            handleChange={this.handleSelectPaymentOption}
          />
          <Button
            style={{height: '50px'}}
            variant="contained"
            color="primary"
            onClick={this.handleAddPayment}
          >
            Add Payment
          </Button>
        </div>
        <DisplaySelectedPaymentOption
          paymentOption={this.state.selectedPaymentOption}
        />

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

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  anonUser: makeSelectAnonUser()
})

const mapDispatchToProps = dispatch => ({
  checkout: () => dispatch(checkout),
  openDialog: dialogOptions => dispatch(openDialog(dialogOptions)),
  closeDialog: () => {
    dispatch(closeDialog())
    dispatch(resetDialog())
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, withTransition)(Cart)
