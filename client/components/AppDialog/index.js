import React from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import DefaultDialog from '../shared/Dialogs/DefaultDialog'
import {closeDialog} from '../../store/actions/app'
import {makeSelectAppDialogOptions} from '../../store/selectors/app'

const AppDialog = props => {
  return (
    <DefaultDialog
      open={props.dialogOptions.open}
      width={props.dialogOptions.width}
      title={props.dialogOptions.title}
      contentText={props.dialogOptions.contentText}
      handleClose={props.handleDialogClose}
      renderContent={props.dialogOptions.renderContent}
      renderActions={props.dialogOptions.renderActions}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  dialogOptions: makeSelectAppDialogOptions()
})

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => dispatch(closeDialog())
})

AppDialog.propTypes = {
  dialogOptions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog)
