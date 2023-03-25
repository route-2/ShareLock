import { ethers } from "ethers";


module.exports.onRpcRequest = async ({ origin, request }) => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.dir(signer);

  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              `Private Key: ${signer?._address}`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
