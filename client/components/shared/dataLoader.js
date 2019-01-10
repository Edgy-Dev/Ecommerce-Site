/** Loads data when component mounts */

import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import React from 'react'

import ContentLoading from './LoadingIndicators/ContentLoading'

export function LoaderFn(dataName, loaderFn, dataLoaded) {
  this.dataName = dataName
  this.loaderFn = loaderFn
  this.dataLoaded = dataLoaded
}

const dataLoader = (title, loaders) => WrappedComponent => {
  // Holds selectors that check if data has loaded
  const selectors = loaders.reduce((map, loader) => {
    map[loader.dataName + 'Loaded'] = loader.dataLoaded()
    return map
  }, {})
  const mapStateToProps = createStructuredSelector(selectors)

  // Holds dispatchers used to load data
  const mapDispatchToProps = dispatch => {
    return loaders.reduce((map, loader) => {
      map['fetch' + capitalize(loader.dataName)] = () =>
        dispatch(loader.loaderFn())
      return map
    })
  }

  return connect(mapStateToProps, mapDispatchToProps)(
    class DataLoader extends React.PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          loading: true
        }
      }

      componentDidMount() {
        this.props.setTitle(title)
        const dataLoaded = loaders
          .map(loader => this.props[loader.dataName + 'Loaded'])
          .every(dataLoad => dataLoad)

        if (dataLoaded && this.state.loading) {
          this.setState({loading: false})
        } else {
          this.loadData()
        }
      }

      componentDidUpdate() {
        const dataLoaded = loaders
          .map(loader => this.props[loader.dataName + 'Loaded'])
          .every(dataLoad => dataLoad)

        if (dataLoaded && this.state.loading) {
          this.setState({loading: false})
        }
      }

      componentWillUnmount() {
        this.props.resetTitle()
      }

      loadData() {
        const dataLoaders = []
        loaders.forEach(loader => {
          const dataLoaded = loader.dataName + 'Loaded'
          const loaderFn = 'fetch' + capitalize(loader.dataName)
          if (!this.props[dataLoaded]) {
            dataLoaders.push(this.props[loaderFn])
          }
        })

        this.executeLoaders(dataLoaders)
      }

      executeLoaders(dataLoaders) {
        dataLoaders.forEach(loader => {
          loader()
        })
      }

      render() {
        if (this.state.loading) {
          return <ContentLoading text="Fetching Data" />
        } else {
          return <WrappedComponent {...this.props} />
        }
      }
    }
  )
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default dataLoader
