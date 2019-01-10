import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

const ContentLoading = props => {
  return (
    <div className="app-page fixed aligned">
      <div style={{textAlign: 'center'}}>
        <p>{props.text}</p>
        <CircularProgress />
      </div>
    </div>
  )
}

ContentLoading.propTypes = {
  text: PropTypes.string.isRequired
}

export default ContentLoading
