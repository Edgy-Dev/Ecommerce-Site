const router = require('express').Router()
const {User} = require('../db/models')
const {ResponseMessage} = require('../utils')

router.post('/login', require('./local'))
// router.post('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({where: {email: req.body.email}})
//     if (!user) {
//       console.log('No such user found:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else if (!user.validPassword(req.body.password)) {
//       console.log('Incorrect password for user:', req.body.email)
//       res.status(401).send('Wrong username and/or password')
//     } else {
//       req.login(user, err => (err ? next(err) : res.json(user)))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/register', async (req, res, next) => {
  try {
    /* Check if user exists and if password=paswordConfirm */
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (user) {
      res.status(400).send(
        new ResponseMessage(null, {
          name: 'RegistrationError',
          message: 'Account already exists. Please log in.'
        })
      )
    } else if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send(
        new ResponseMessage(null, {
          name: 'RegistrationError',
          message: 'Password is not the same as password confirmation.'
        })
      )
    } else {
      /** Create and login user
       * passport attaches req.login method
       */
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      })
      req.login(newUser, err => {
        if (err) {
          next(err)
        } else {
          next()
        }
      })
    }
  } catch (err) {
    err.name = err.name || 'RegistrationError'
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.json(new ResponseMessage('Succesfully logged out'))
})

router.get('/me', (req, res) => {
  console.log('/me', req.session.id, req.user)
  res.json(new ResponseMessage(req.user || {}))
})

router.use('/google', require('./google'))

router.use('/github', require('./github'))

module.exports = router
