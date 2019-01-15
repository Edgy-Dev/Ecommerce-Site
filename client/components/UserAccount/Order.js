import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    width: 245,
    margin: 10
  },
  media: {
    height: 250
  },
  title: {
    display: 'inline-block'
  },
  date: {
    display: 'inline-block',
    marginLeft: 10
  }
}

const stringifyCounts = counts => {
  const strArray = []
  for (let category in counts) {
    if (counts.hasOwnProperty(category)) {
      strArray.push(`${counts[category]} ${category}`)
    }
  }
  return strArray.join(', ')
}
const countCategories = cart => {
  const countsHash = cart.reduce((counts, item) => {
    const key = item.product.category
    if (counts[key]) {
      counts[key] += 1
    } else {
      counts[key] = 1
    }
    return counts
  }, {})
  return stringifyCounts(countsHash)
}

const Order = props => {
  const {classes, order} = props
  const categoryCounts = countCategories(order.cart)
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={order.cart[0].product.thumbImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            Order
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            {moment(order.createAt).format('ll')}
          </Typography>
          <div>
            <p>{categoryCounts}</p>
          </div>
          <div>Total: ${(order.total / 100).toFixed(2)}</div>
          <p>
            {order.completed
              ? 'Order has been shipped.'
              : 'Order has not yet been shipped.'}
          </p>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

Order.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Order)
