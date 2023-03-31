import User from "../model/user";

const Cryptr = require("cryptr");
// postShares() we need mapping for acc => shares that they hold from split()
// create model for mapping
// getShares() fetch the shares in db
// deleteShares() delete db instance

//normal get and post
export const getSharesByKey = async (req, res) => {
  const cryptr = new Cryptr("KeyFromFE");
  //search By Key
  const { shares } = req.params;
  const { key } = req.body;

  try {
    // Find the user with the specified address
    const user = await User.findOne({ shares });

    // decrypt the keys
    const decryptedString = cryptr.decrypt(shares);

    res.status(200).json({ shares: decryptedString });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const postShares = async (req, res) => {
  const { key, shares } = req.body;

  try {
    // Encrypt the user's shares using the specified key
    const cryptr = new Cryptr(key);

    const encryptedString = cryptr.encrypt(shares);

    // Create a new user with the specified address and encrypted shares
    const user = new User({ address, shares: encryptedString });
    await user.save();

    res.status(200).json({ message: "Shares saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getSharesByKey,
  postShares,
};
