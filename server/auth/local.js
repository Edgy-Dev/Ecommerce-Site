const passport = require('passport')
const LocalStatedgy = require('passport-local')
const router = require('express').Router()

const {User, Address} = require('../db/models')
const {ResponseMessage} = require('../utils')

const localStategdy = new LocalStatedgy(
  {usernameField: 'email'},
  async (email, password, done) => {
    try {
      /* Find user */
      console.log(email, 'here')
      const user = await User.findOne({
        where: {email: email},
        attributes: ['firstName', 'lastName'],
        include: [
          {
            model: Address,
            attributes: [
              ['streetAddress', 'firstLine'],
              'city',
              'state',
              'zipCode'
            ]
          }
        ]
      })

      /* Validate password */
      if (!user) {
        return done(null, false)
      }
      if (!user.validPassword(password)) {
        return done(null, false)
      }

      /* Return user data */
      return done(null, {
        id: user.id,
        firstName: user
      })
    } catch (err) {
      return done(err)
    }
  }
)

passport.use(localStategdy)

const handleSuccessfulLogin = (req, res) => {
  res.json(new ResponseMessage(req.user))
}

router.use(
  '/',
  passport.authenticate('local', {failWithError: true}),
  handleSuccessfulLogin
)

module.exports = router
