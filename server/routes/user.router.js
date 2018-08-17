const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    first: req.body.first,
    last: req.body.last,
    rank: req.body.rank,
    unit: req.body.unit
  };
  pool.query('INSERT INTO users (username, password, first, last, rank, unit_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [saveUser.username, saveUser.password, saveUser.first, saveUser.last, saveUser.rank, saveUser.unit], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get('/units', (req, res) => {
  pool.query(`select * from unit;`
  ).then(function (result) {
    res.send(result.rows);
  }).catch(function (error) {
    res.sendStatus(500);
  })
});

router.get('/leaders/:unit_id', (req, res) => {
  let unit_id = req.params.unit_id;
  pool.query(`select * from users where unit_id = $1;`,
    [unit_id]
  ).then(function (result) {
    res.send(result.rows);
  }).catch(function (error) {
    res.sendStatus(500);
  })
});

router.put('/leader/transfer', (req, res) => {
  let unit_id = req.body.unit_id;
  let id = req.body.id;
  pool.query('update users set unit_id = $1 where id = $2',
    [unit_id, id]
  ).then(function (result) {
  }).catch(function () {
    res.sendStatus(500);
  })
})

module.exports = router;
