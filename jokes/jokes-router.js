const axios = require('axios');
const verify = require('../auth/authenticate-middleware')
const request = require('supertest')

const router = require('express').Router();

router.get('/', verify, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});



module.exports = router;
