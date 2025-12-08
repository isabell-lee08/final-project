var express = require('express');
var router = express.Router();
const Cry = require('../models/cry.js')

router.get('/', async function (request, response) {
  try {
    const cry = await Cry.find();
    response.json(cry);
  } catch {
    console.log(error);
    response.send('Something went wrong.');
  }
})

router.post('/', async function (request, response) {
    console.log(request.body);
  try {
    const newCry = await Cry.create({
      ...request.body
    });
    response.json(newCry);
  } catch (error) {
    console.log(error);
    response.send('Something went wrong.');
  }
})

module.exports = router;
