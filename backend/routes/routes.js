const express = require('express');
const Shares = require('../model/shares');
const Cryptr = require('cryptr');

const router = express.Router()

router.post('/post', (req, res) => {

    const key = req.body.key;
    const cryptr = new Cryptr(key);
    const encryptedString = cryptr.encrypt(req.body.share);

    const data = new Shares({
        address: req.body.address,
        share: encryptedString
    })
    data.save()
        .then(data => {
            res.status(200).json(data)
        }
        )
        .catch(err => {
            res.json({ message: err })
        }
        )
})

router.get('/getOne/:addr', async(req, res) => {

    const key = req.body.key;
    const cryptr = new Cryptr(key);

    const data = await Shares.findOne({ address: req.params.addr })
    const decryptedString = cryptr.decrypt(data.share);
    res.status(200).json(decryptedString)
})

module.exports = router;