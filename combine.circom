pragma circom 2.1.4;
include "circomlib/comparators.circom";
include "circomlib/sign.circom";
include "circomlib/bitify.circom";


template combine () {
    signal input share[3][2];
  var sharesX;
   var sharesY; 
    signal output secret[3][2]; 

    var  shares[3][2];
    
 for(var i = 0;i<3;i++)

 {
    sharesX = share[i][0];
    sharesY = share[i][1];
    shares[i][0] = sharesX;
    
    shares[i][1] = sharesY;

    
 }
  secret <== shares;
}
component main = combine();

  /* INPUT = {
    "share":[["0","1"],["8","1"],["1","4"]]
} */