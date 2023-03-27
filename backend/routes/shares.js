const express = require('express');
const router = express.Router();
const {getShares,postShares} = require('../controllers/shares');
router.get('/', getShares);
router.post('/', postShares);
module.exports = router;
