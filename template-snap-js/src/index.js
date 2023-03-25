import { ethers } from "ethers";
import { panel, heading, text } from "@metamask/snaps-ui";
global.crypto = require('crypto');
const Decimal = require('decimal.js');
Decimal.set({ rounding: 5 });
Decimal.set({ modulo: Decimal.ROUND_FLOOR });
Decimal.set({ crypto: true });
Decimal.set({ precision: 1e+4 });
Decimal.set({ toExpPos: 1000 });


import { getBIP44AddressKeyDeriver } from "@metamask/key-tree";
const secret = '0x6a17a7d15ace9582eee61573e9c646c2f206c707261077668e24a7802cedbe16'; // hexadecimal string representing the secret to be split
const prime = Decimal('2').pow(333).sub(1);



module.exports.onRpcRequest = async ({ origin, request }) => {

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.dir(signer);

  switch (request.method) {
    
    case 'split':{
      const ethnode = await snap.request({
        method: "snap_getBip44Entropy",
        params: {
          coinType: 60,
        },
      });
      const keyDeriver = await getBIP44AddressKeyDeriver(ethnode);
      const key = await keyDeriver(0);
      const pvtKey = key.privateKey;
      function random(lower, upper) {
        if (lower > upper) {
          const temp = lower;
          lower = upper;
          upper = temp;
        }
      
        return lower.add(Decimal.random().times(upper.sub(lower + 1)).floor());
      }
      
      // Polynomial function where `a` is the coefficients
      function q(x, { a }) {
        let value = a[0];
        for (let i = 1; i < a.length; i++) {
          value = value.add(x.pow(i).times(a[i]));
        }
      
        return value;
      }
      
      function split(secret, n, k, prime) {
        if (Number.isInteger(secret) || Number.isInteger(prime)) {
          throw new TypeError(
            'The shamir.split() function must be called with a String<secret>' +
            'but got Number<secret>.'
          );
        }
      
        if (Number.isInteger(prime)) {
          throw new TypeError(
            'The shamir.split() function must be called with a String<prime>' +
            'but got Number<prime>.'
          );
        }
      
        if (secret.substring(0, 2) !== '0x') {
          throw new TypeError(
            'The shamir.split() function must be called with a' +
            'String<secret> in hexadecimals that begins with 0x.'
          );
        }
      
        if (!(prime instanceof Decimal) && prime.substring(0, 2) !== '0x') {
          throw new TypeError(
            'The shamir.split() function must be called with a' +
            'String<prime> in hexadecimals that begins with 0x.'
          );
        }
      
        const S = Decimal(secret);
        const p = Decimal(prime);
      
        if (S.greaterThan(prime)) {
          throw new RangeError('The String<secret> must be less than the String<prime>.');
        }
      
        let a = [S];
        let D = [];
      
        for (let i = 1; i < k; i++) {
          let coeff = random(Decimal(0), p.sub(0x1));
          a.push(coeff);
        }
      
        for (let i = 0; i < n; i++) {
          let x = Decimal(i + 1);
          D.push({
            x,
            y: q(x, { a }).mod(p),
          });
        }
      
        return D.map((share) => ({
          x: share.x.toString(),
          y: share.y.toHex(),
        }));
      }

var ans = split(secret,4,3,prime);





   
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "Confirmation",
          content: panel([
            heading("Shares"),
            
            text(`share1: ${ans[0].y}`),
            text(`share2: ${ans[1].y}`),
            text(`share3: ${ans[2].y}`),

          ]),
        },
      });
    }
    case 'combine': {


      return snap.request({

      });
    }
    case 'approve': {
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: { hello: 'world' } },
      });
      const Data = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });
      if(Data == 0){
        return snap.request({
          method: "snap_dialog",
          params: {
            type: 'Prompt',
            content: panel([
              heading('What is your share?'),
              text('Please enter the share given to you'),
            ]),
            placeholder: '0x123...',
          },
        });
      }
      else{
        var OldShare = Data();
        


      }
      
      return snap.request({
        method: "snap_dialog",
        params: {
          type: 'Prompt',
          content: panel([
            heading('What is your share?'),
            text('Please enter the share given to you'),
          ]),
          placeholder: '0x123...',
        },
      });
    }

      

    default:
      throw new Error('Method not found.');
  }
};
