
const getShares = (req, res) => {
    res.render("shares", {
    } );
}

const postShares = (req, res) => {
    const shares = req.body.shares;
    const prime = req.body.prime;
    const combI = combine(shares,prime);
    console.log(combI)
    res.render("shares", {
        combI
    } );
}

module.exports = {
    getShares,
    postShares
}