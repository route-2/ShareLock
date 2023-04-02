const {CircomJS} = require("@zefi/circomjs")
const fs = require("fs")

const zkProof = async() => {
    const circomjs = new CircomJS()
    const circuit =  circomjs.getCircuit("mul")

    // important to await compilation, before running circuit.genProof()
    await circuit.compile()

    const input = {
        x1:1,
    x2:2,
    x3:3,
    y1:16241961137592804136592688288472680631438566022962401345728929050782336497123002166703571609228246673,
    y2:14985916476921512878205310773046722192054320287993817627456745798676440190856829418928968240658202381,
    y3:13729871816250221619817933257620763752670074553025233909184562546570543884590656671154364872088158089
    }

    let proof = await circuit.genProof(input);
    console.log("proof ----->",proof.publicSignals)
    console.log("proof verification result ----->",await circuit.verifyProof(proof))
}

export default zkProof()