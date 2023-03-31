import User from "../model/user";
const crypto = require('crypto');
const Cryptr = require('cryptr');
// postShares() we need mapping for acc => shares that they hold from split()
// create model for mapping
// getShares() fetch the shares in db
// deleteShares() delete db instance 

//normal get and post
const getSharesByKey = async (req, res) => {
  const cryptr = new Cryptr('KeyFromFE');
  //search By Key
    const { address } = req.params;
  const { key } = req.body;

  try {
    // Find the user with the specified address
    const user = await User.findOne({ address });

    // Encrypt the keys
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(user.shares, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    res.status(200).json({ shares: decrypted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
    
}

const postShares = async (req, res) => {
    const { address, shares } = req.body;
  const { key } = req.body;

  try {
    // Encrypt the user's shares using the specified key
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(shares, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Create a new user with the specified address and encrypted shares
    const user = new User({ address, shares: encrypted });
    await user.save();

    res.status(200).json({ message: 'Shares saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }

   
}

module.exports = {
    getSharesByKey,
    postShares
}