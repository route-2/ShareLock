const express = require('express');
const Shares = require('../model/shares');
const Cryptr = require('cryptr');
const {CircomJS} = require("@zefi/circomjs")

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

router.post('/getOne', async(req, res) => {

    const key = req.body.key;
    const cryptr = new Cryptr(key);

    let data = await Shares.findOne({ address: req.body.addr })
    data = JSON.parse(JSON.stringify(data))
    const decryptedString = cryptr.decrypt(data.share);
    res.status(200).json(decryptedString)
})

router.post('/getproof', async(req, res) => {
    const circomjs = new CircomJS()
    const circuit =  circomjs.getCircuit("mul")

    await circuit.compile()

    const input = {
        x1:1,
    x2:2,
    x3:3,
    y1:16241961137592804136592688288472680631438566022962401345728929050782336497123002166703571609228246673,
    y2:14985916476921512878205310773046722192054320287993817627456745798676440190856829418928968240658202381,
    y3:13729871816250221619817933257620763752670074553025233909184562546570543884590656671154364872088158089
    }

    let field = 7.922816251426434e+28

    let newproof = [
        '1',
        req.body.y1/field,
        req.body.y2/field,
        req.body.y3/field,
    ]

    let proof = await circuit.genProof(input);
    proof.publicSignals = newproof
    let verifyProof = await circuit.verifyProof(proof)
    res.status(200).json(verifyProof)

})

module.exports = router;