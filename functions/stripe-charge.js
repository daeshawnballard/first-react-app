const stripe = require('stripe')('sk_test_PB0YdAAanS0RRfM9cflOFF2D')

exports.handler = async function(event) {
       const {
           tokenId, 
           email,
           name,
           description,
           amount
       } = JSON.parse(event.body)

       const customer = await stripe.customers.create({
           description: email,
           source: tokenId
       }) 

       await stripe.charges.create({
           customer: customer.id,
           amount,
           name,
           description, 
           currency: 'usd'
       })
}