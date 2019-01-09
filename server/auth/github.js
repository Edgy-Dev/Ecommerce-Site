const passport = require('passport')
const express = require('express')
const router = express.Router()
const Strategy = require('passport-github').Strategy

const {User} = require('../db/models/index')

const strategyConfiguration = {
  clientID: '4a803660f119d915600a',
  clientSecret: '0fc75dd4015c2253addbbef6c05d8357431ca50f',
  callbackURL: 'http://localhost:8080/auth/github/callback'
}

const verifyCallback = async (accessToken, refreshToken, profile, callback) => {
  try {
    const user = await User.findOrCreate({
      where: {githubId: profile.id}
    })
    return callback(null, user)
  } catch (error) {
    return callback(error, null)
  }
}

passport.use(new Strategy(strategyConfiguration, verifyCallback))

router.get('/github', passport.authenticate('github'))

router.get('/github/callback')

module.exports = router
