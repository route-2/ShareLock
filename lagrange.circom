pragma circom 2.0.4;

include "circomlib/comparators.circom";
include "circomlib/sign.circom";
include "circomlib/bitify.circom";

template lagrangeBasis(){
    signal input data[3][2];
    signal input i;
    var numerator = 1;
    var denominator = 1;
  var odd = 0;
    signal output outa;
    signal output outb;


    for(var j=0;j<3;j++){
        if(data[i][0] )
       {
           odd = data[i][0];
       }
       if (data[j][odd]!=data[i][odd]) {
        
         denominator = denominator * (data[j][odd] - data[i][odd]);
      }
        if (data[j][odd]!=data[i][odd]) {
        
        numerator = numerator * (data[i][odd]);
        
      }
    }  

    outa<== numerator;
    outb<==denominator;  
    
}

component main = lagrangeBasis();


 {
    "data":[["0","1"],["8","1"],["1","4"]],
   "i" : 2
}