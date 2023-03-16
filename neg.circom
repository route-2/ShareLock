//check negative
pragma circom 2.1.4;

include "circomlib/poseidon.circom";
// include "https://github.com/0xPARC/circom-secp256k1/blob/master/circuits/bigint.circom";

template Example () {
    signal input a;
    signal input b;
    signal output c;
    c <== a - b;
}




template Test(){
    component c1 = Example();
    signal input x;
    signal input y;
    signal output z;
    c1.a<==x;
    c1.b<==y;
    z<==c1.c + 2;
}

component main = Test();



/* INPUT = {
    "x": "5",
    "y": "6"
} */