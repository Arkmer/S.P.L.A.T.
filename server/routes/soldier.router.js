const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.post('/', (req, res) => {
    console.log('submitSoldier.POST', req.body);
    pool.query('INSERT INTO soldier (first, last, rank, eval, ets, apft) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [req.body.first, req.body.last, req.body.rank, req.body.eval, req.body.ets, req.body.apft], (err, result) => {
        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      })
    // check if logged in
  });

module.exports = router;