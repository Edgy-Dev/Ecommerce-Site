'use strict'
require('../secrets')
const db = require('../server/db')
const {
  User,
  Address,
  PaymentInfo,
  Order,
  ProductAbstract,
  ProductInstance
} = require('../server/db/models')
const faker = require('faker')

/* eslint-disable max-statements*/
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const totalUsers = 30
  const totalProductsAb = 30

  // User data
  const users = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      email: faker.internet.email(),
      password: 'password',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  users[0] = {
    email: 'duncangichimu@gmail.com',
    password: 'password',
    firstName: 'Duncan',
    lastName: 'Gichimu'
  }

  const getPrice = category => {
    if (category == 'Tee') {
      return 1500
    } else if (category == 'Longsleeve') {
      return 2000
    } else if (category == 'Hoodie') {
      return 3000
    }
  }

  // Product abstract data
  const productsAb = Array(totalProductsAb)
    .fill(null)
    .reduce((products, _) => {
      const name = faker.commerce.productName()
      ;['Tee', 'Longsleeve', 'Hoodie'].forEach(category => {
        const price = getPrice(category)
        products.push({
          name,
          price,
          category
        })
      })
      return products
    }, [])

  // Address data
  const addresses = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode()
    }))

  // Payment info data
  const payMentInfos = Array(totalUsers)
    .fill(null)
    .map(_ => ({
      paymentToken: faker.random.alphaNumeric(30),
      lastFourDigits: faker.random.number({min: 1000, max: 9999})
    }))

  // Creater user, addresses, payment models, orders
  const userModels = await User.bulkCreate(users, {returning: true})
  const addressModels = await Address.bulkCreate(addresses, {returning: true})
  const paymentModels = await PaymentInfo.bulkCreate(payMentInfos, {
    returning: true
  })

  // Create product asbtract
  const productAbModels = await ProductAbstract.bulkCreate(productsAb, {
    returning: true
  })

  // Create product instance models
  const productInstanceModels = []
  for (let i = 0; i < productAbModels.length; i++) {
    for (let j = 0; j < productAbModels[i].color.length; j++) {
      for (let k = 0; k < productAbModels[i].size.length; k++) {
        const productInstance = await ProductInstance.create({
          name: productAbModels[i].name,
          category: productAbModels[i].category,
          color: productAbModels[i].color[j],
          size: productAbModels[i].size[k]
        })
        productInstanceModels.push(productInstance)
      }
    }
  }

  const cart = () =>
    Array(Math.ceil(Math.random() * 10))
      .fill(null)
      .map(_ => ({
        product:
          productInstanceModels[
            Math.floor(Math.random() * productInstanceModels.length)
          ],
        quantity: Math.ceil(Math.random() * 6)
      }))

  // Order data
  const completed = () => Math.random() > 0.5

  const orders = Array(totalUsers * 10)
    .fill(null)
    .map(_ => ({
      cart: cart(),
      total: faker.random.number(),
      completed: completed()
    }))

  const orderModels = await Order.bulkCreate(orders, {returning: true})

  // Encypt password
  // Set address and payment info
  for (let i = 0; i < totalUsers; i++) {
    userModels[i].password = User.encryptPassword(userModels[i].password(), 5)
    userModels[i].cart = Math.random() > 0.5 ? [] : cart()
    await userModels[i].save()
    await addressModels[i].setUser(userModels[i])
    await paymentModels[i].setUser(userModels[i])
  }

  // Set orders
  for (let i = 0; i < totalUsers * 10; i++) {
    await orderModels[i].setUser(userModels[i % totalUsers])
  }

  console.log(`seeded ${totalUsers} users`)
  console.log(`seeded products`)
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
