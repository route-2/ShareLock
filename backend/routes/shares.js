const express = require('express');
const router = express.Router();
const User = require('../model/user');
import {getSharesByKey,postShares} from "../controllers/shares.js"

router.get("/", getSharesByKey);
router.post("/:id", postShares);

module.exports = router;
