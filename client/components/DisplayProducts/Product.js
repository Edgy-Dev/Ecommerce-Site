import React from 'react'
import history from '../../history'
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

const Product = props => {
  const {classes, product} = props
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => history.push(`/products/${product.CardActionArea}`)}
      >
        <CardMedia
          className={classes.media}
          image={product.thumbImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.name} {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Product)
