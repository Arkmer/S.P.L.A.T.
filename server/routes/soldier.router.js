const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../modules/pool.js');

router.post('/', (req, res) => {
    console.log('submitSoldier.POST', req.body);
    pool.query('INSERT INTO soldier (first, last, rank, eval, ets, apft, unit_id) VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [req.body.first, req.body.last, req.body.rank, req.body.eval, req.body.ets, req.body.apft, req.body.unit], (err, result) => {
        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      })
  });

router.get('/:unit', (req, res)=>{
    console.log('getSoldierRoster.GET');
    let unit = req.params.unit;
    pool.query(`select * from soldier where unit_id = ${unit};`)
    .then(function(result) {
        res.send(result.rows);
    }).catch(function(error) {
        console.log('there was a problem', error);
        res.sendStatus(500);
    })
});

module.exports = router;