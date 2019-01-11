'use strict'
require('../secrets')
const db = require('../server/db')
const {
  User,
  Address,
  PaymentInfo,
  Order,
  ProductAbstract
} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const totalUsers = 50
  const totalProductsAb = 25

  const users = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      email: faker.internet.email(),
      password: 'password',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))

  //await User.create(users[0]);

  const productsAb = Array(totalProductsAb)
    .fill(null)
    .map(_ => ({
      name: faker.commerce.productName(),
      price: faker.random.number({min: 1000, max: 10000})
    }))

  const addresses = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode()
    }))

  const payMentInfos = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      paymentToken: faker.random.alphaNumeric(30),
      lastFourDigits: faker.random.number({min: 1000, max: 9999})
    }))

  const completed = () => Math.random() > 0.5

  const cart = () =>
    Math.random() > 0.5
      ? []
      : Array(Math.ceil(Math.random() * 10))
          .fill(null)
          .map(_ => ({
            productId: Math.floor(Math.random() * totalProductsAb),
            quantity: Math.ceil(Math.random() * 6)
          }))

  const orders = Array(totalUsers * 10)
    .fill(null)
    .map(_ => ({
      cart: cart(),
      total: faker.random.number(),
      completed: completed()
    }))

  const userModels = await User.bulkCreate(users, {returning: true})
  const addressModels = await Address.bulkCreate(addresses, {returning: true})
  const paymentModels = await PaymentInfo.bulkCreate(payMentInfos, {
    returning: true
  })
  const orderModels = await Order.bulkCreate(orders, {returning: true})
  const productAbModels = await ProductAbstract.bulkCreate(productsAb, {
    returning: true
  })

  for (let i = 0; i < totalUsers; i++) {
    userModels[i].password = User.encryptPassword(userModels[i].password(), 5)

    await userModels[i].save()
    await addressModels[i].setUser(userModels[i])
    await paymentModels[i].setUser(userModels[i])
  }

  for (let i = 0; i < totalUsers * 10; i++) {
    await orderModels[i].setUser(userModels[i % totalUsers])
  }

  console.log(`seeded ${totalUsers} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
