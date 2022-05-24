var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

router.use(cors({origin: 'http://localhost:3000'}));

const stripe = require("stripe")('sk_test_51KvQTcDUppirLbInSXaGQNKrgEklAUkko1eGqWzTZEAsjCuKS5ZPD1WA4ZHCGHubTc0CSHkLgQNgwQkdf1rmQGfV000DWVrx2q');

router.use(express.static("public"));
router.use(express.json());

const calculateOrderAmount = (items) => {
  console.log("ITEMS: " + items[0].id);
  return 100;
};

router.post("/depositPayment", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router;