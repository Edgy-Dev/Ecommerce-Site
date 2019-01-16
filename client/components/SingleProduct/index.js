import React, {Component} from 'react'
import {connect} from 'react-redux'
import {retreiveProducts} from '../../store/productAbstract'
import {putToCart} from '../../store/actions/user'

class SingleProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProduct: {
        name: props.displayedProducts[0].name,
        category: props.displayedProducts[0].category,
        color: props.displayedProducts[0].color[0],
        size: props.displayedProducts[0].size[0],
        quantity: 1
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const newProduct = this.state.currentProduct
    const place = event.target.getAttribute('name')
    const change = event.target.value
    newProduct[place] = change
    this.setState({
      currentProduct: newProduct
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.putToCart(this.state.currentProduct)
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
            Type: {product.category}
          </label>
          <label htmlFor="size" name="size">
            Size:
          </label>
          <select onChange={this.handleChange} name="size">
            {product.size.map(size => (
              <option key={size} name="size" value={size}>
                {size}
              </option>
            ))}
          </select>
          <label htmlFor="color" name="color">
            Color:
          </label>
          <select onChange={this.handleChange} name="color">
            {product.color.map(color => (
              <option key={color} name="color" value={color}>
                {color}
              </option>
            ))}
          </select>
          <label htmlFor="quantity" name="quantity">
            Quantity:
          </label>
          <select onChange={this.handleChange} name="quantity">
            <option name="quantity" value={1}>
              1
            </option>
            <option name="quantity" value={2}>
              2
            </option>
            <option name="quantity" value={3}>
              3
            </option>
            <option name="quantity" value={4}>
              4
            </option>
            <option name="quantity" value={5}>
              5
            </option>
          </select>

          {/* {add api route to query product instance} */}
          <button onClick={this.handleSubmit} type="submit">
            Add To Cart
          </button>
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
    },
    putToCart(product) {
      dispatch(putToCart(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
