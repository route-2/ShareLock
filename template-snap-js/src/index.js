import { ethers } from "ethers";
import { panel, heading, text } from "@metamask/snaps-ui";
global.crypto = require('crypto');
const Decimal = require('decimal.js');

Decimal.set({ rounding: 5 });
Decimal.set({ modulo: Decimal.ROUND_FLOOR });
Decimal.set({ crypto: true });
Decimal.set({ precision: 1e+4 });
Decimal.set({ toExpPos: 1000 });
const Cryptr = require('cryptr');


import { getBIP44AddressKeyDeriver } from "@metamask/key-tree";

const secret = '0x6a17a7d15ace9582eee61573e9c646c2f206c707261077668e24a7802cedbe16'; // hexadecimal string representing the secret to be split
const prime = Decimal('2').pow(333).sub(1);


 
const shares = [
  {
    x: '1',
    y: '0x38896f011c787fb99306bbc3fc8f235bd103dc042a2b66289e5b65af15e0093c5da87e370df6fc3ff7'
  },
  {
    x: '2',
    y: '0x16edd898727b40ffff0856e12feb1a99924204af0effec6d9c2e0cbea97320bec5f022a2b7e60bad0a97'
  },
  {
    x: '3',
    y: '0x41fed7c541c5980d0605a87eb9cfd3138d5f15f35f52cdca1720611b61ee831141dfc922a086b001df8'
  },
  {
    x: '4',
    y: '0x7cec81aa5ffc2022d9b11aff71236ea4f8cc9ec7909ecb3386a475ed519366026e7364c8d7514f57a18'
  }
]



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
const cryptr = new Cryptr('myTotallySecretKey');

const encryptedString = cryptr.encrypt('bacon');

const EncryptedKey = await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Prompt',
    content: panel([
      heading('What is the Key?'),
      text('Please enter the Key to be encrypted'),
    ]),
    placeholder: 'Key...',
  },
});
// const encrypt = await generateEncryptionKey(EncryptedKey)
//   const encryptedConfig = await encrypt(JSON.stringifyO(ans))
 


//api call to post key 

return await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Alert',
    content: panel([
      heading('API CALL MADE'),
      text(`${encryptedString}`),
    ]),
  },
});


      
     
    }
   
    case 'approve': {
      
      const oldshare = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });

      const newshare = await snap.request({
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

      if(oldshare === null){
        await snap.request({
          method: 'snap_manageState',
          params: { operation: 'update', newState: { hello: newshare } },
        });
      }
      else{
        const oldshare = await snap.request({
          method: 'snap_manageState',
          params: { operation: 'get' },
        });
        await snap.request({
          method: 'snap_manageState',
          params: { operation: 'update', newState: { hello: newshare+','+oldshare.hello } },
        });
      }

      const Data1 = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });

      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Alert',
          content: panel([
            heading('What is your share?'),
            text('Please enter the share given to you'),
            text(`OldShare: ${String(Data1.hello)}`),
          ]),
        },
      });
    }
      
    case 'clear': {
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
      });
    }

    case 'clear':{
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
      });
    }


    case 'combine':{
      

      const walletAddress = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Prompt',
          content: panel([
            heading('What is the KEY '),
            text('Please enter the KEY to decrypt?'),
          ]),
          placeholder: 'Key...',
        },
      });

      

// api call decrypted key get


      

      function divmod(a, b, n) {
        let aCopy = (a instanceof Decimal) ? a : new Decimal(a);
      
        let bCopy = (b instanceof Decimal) ? b : new Decimal(b);
      
        let nCopy = (n instanceof Decimal) ? n : new Decimal(n);
      
        let t = Decimal('0');
        let nt = Decimal('1');
        let r = nCopy;
        let nr = bCopy.mod(n);
        let tmp;
        while (!nr.isZero()) {
          let quot = Decimal.floor(r.div(nr));
          tmp = nt;  nt = t.sub(quot.times(nt));  t = tmp;
          tmp = nr;  nr = r.sub(quot.times(nr));  r = tmp;
        };
        if (r.greaterThan(1)) return Decimal(0);
        if (t.isNegative()) t = t.add(n);
        return aCopy.times(t).mod(n);
      }

      function lagrangeBasis(data, j) {
        let denominator = Decimal(1);
        let numerator = Decimal(1);
        for (let i = 0; i < data.length; i++) {
          
          if (!data[j].x.equals(data[i].x)) {
            denominator = denominator.times(data[i].x.minus(data[j].x));
          }
        }
      
        for (let i = 0; i < data.length; i++) {
          if (!data[j].x.equals(data[i].x)) {
            numerator = numerator.times(data[i].x);
          }
        }
      
        return {
          numerator,
          denominator,
        };
      }
      
      function lagrangeInterpolate(data, p) {
        let S = Decimal(0);
       console.log(p,"prime")
        for (let i = 0; i < data.length; i++) {
          let basis = lagrangeBasis(data, i);
          console.log(basis, "basis")
          console.log("divmod is",divmod(basis.numerator, basis.denominator, p),"divMod for i",i,"prime:",p)
          S = S.add(data[i].y.times(divmod(basis.numerator, basis.denominator, p)));
        }
      
        const rest = S.mod(p);
        console.log(rest,"lagrange result")
      
      
        return rest;
      }
      
      function combine(shares, prime) {
        const p = Decimal(prime);
      
        // Wrap with Decimal on the input shares
        const decimalShares = shares.map((share) => ({
          x: Decimal(share.x),
          y: Decimal(share.y),
        }));
        console.log(decimalShares)
      
        return lagrangeInterpolate(decimalShares, p);
      }

      const combI = combine(shares,prime);
      console.log(combI)

      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Alert',
          content: panel([
            heading('Combined Secret'),
            text(`Combined Secret: ${combI}`),
          ]),
        },
      });
      
      break;

    }

    default:
      throw new Error('Method not found.');
  }
};
