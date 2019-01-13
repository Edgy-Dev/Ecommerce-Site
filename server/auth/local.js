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
      const user = await User.findOne({
        where: {email: email},
        include: [
          {
            model: Address,
            attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
          }
        ]
      })

      /* Validate password */
      if (!user) {
        return done(null, false)
      }
      const validPassword = await user.validPassword(password)
      if (!validPassword) {
        return done(null, false)
      }

      /* Return user user id */
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
)

passport.use(localStategdy)

const handleSuccessfulLogin = (req, res, next) => {
  res.json(new ResponseMessage(req.user))
}

router.use(
  '/',
  passport.authenticate('local', {failWithError: true}),
  handleSuccessfulLogin
)

module.exports = router
