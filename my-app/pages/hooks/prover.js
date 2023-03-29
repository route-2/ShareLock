const {CircomJS} = require("@zefi/circomjs")
const Prover = async(input) => {
    const circomjs = new CircomJS()
    const circuit =  circomjs.getCircuit("mul")

    // important to await compilation, before running circuit.genProof()
    await circuit.compile()

   
    console.log(input,"input")

    const proof = await circuit.genProof(input);
    console.log(proof)

    console.log("proof verification result ----->",await circuit.verifyProof(proof))
}

export default Prover()