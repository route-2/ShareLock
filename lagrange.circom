pragma circom 2.0.4;

include "circomlib/comparators.circom";
include "circomlib/sign.circom";
include "circomlib/bitify.circom";

template lagrangeBasis(){
    signal input data[3][2];
    signal input i;
    var numerator = 1;
    var denominator = 1 ;
    


  var odd = 0;

    signal output outa;
    signal output outb;


    for(var j=0;j<3;j++){
        if(data[i][0])
       {
           odd = data[i][0];
       }
       if (data[j][odd]!=data[i][odd]) {
        var temp1 = data[j][odd];
        var temp2 = data[i][odd];
         denominator =
          denominator * (temp1 - temp2);
      }
        if (data[j][odd]!=data[i][odd]) {
        var temp3 = data[i][odd];
        numerator = numerator * (temp3 - 0);
        
      }
    }  

    outa <== numerator;
    outb <== denominator;  
    
}

component main = lagrangeBasis();