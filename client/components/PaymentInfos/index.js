import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import dataLoader from '../shared/dataLoader'
import withTransition from '../shared/transitionWrapper'

const PaymentInfo = ({paymentInfo, number}) => {
  return (
    <div className="row-horizontal">
      <div className="row-content">
        <span>{number + 1}</span>
        <span className="vertical-divider" />
        <span>Card ending in: XXXXXXXXXX{paymentInfo.lastFourDigits}</span>
      </div>
      <div className="row-actions">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}
const PaymentInfos = props => {
  return (
    <div>
      {props.paymentInfos.map((paymentInfo, i) => (
        <PaymentInfo
          key={paymentInfo.id}
          number={i}
          paymentInfo={paymentInfo}
        />
      ))}
    </div>
  )
}

const mapStateToProps = () => createStructuredSelector({})

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, withTransition)(PaymentInfos)
