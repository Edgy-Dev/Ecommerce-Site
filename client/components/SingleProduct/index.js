import React, {Component} from 'react'
import {connect} from 'react-redux'
import {retreiveProducts} from '../../store/productAbstract'

class SingleProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      currentProduct: {...this.props.displayedProducts[0]}
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    const newProduct = this.state.currentProduct
    const place = event.target.getAttribute('name')
    const change = event.target.value
    newProduct[place] = change
    this.setState({
      currentProduct: newProduct
    })
    console.log(this.state.currentProduct)
  }

  render() {
    const product = this.props.displayedProducts[0]
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.thumbImage} />
        <ul>
          <p>Price: ${(product.price / 100).toFixed(2)}</p>
          <p>{product.description}</p>
        </ul>
        <form>
          <label htmlFor="category" name="category">
            Type:
          </label>
          <select onChange={this.handleChange} name="category">
            {product.category.map(category => (
              <option name="category" value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="size" name="size">
            Size:
          </label>
          <select onChange={this.handleChange} name="size">
            {product.size.map(size => (
              <option name="size" value={size}>
                {size}
              </option>
            ))}
          </select>
          <label htmlFor="color" name="color">
            Color:
          </label>
          <select onChange={this.handleChange} name="color">
            {product.color.map(color => (
              <option name="color" value={color}>
                {color}
              </option>
            ))}
          </select>
          {/* {add api route to query product instance} */}
          <button type="button">Add To Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allProducts: state.products.allProducts,
    displayedProducts: state.products.allProducts.filter(
      product => product.id == ownProps.match.params.id
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts() {
      dispatch(retreiveProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
