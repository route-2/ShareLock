pragma circom 2.0.1;

include "circomlib/comparators.circom";
include "circomlib/sign.circom";
include "circomlib/bitify.circom";
template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   c <== a * b;  
}

template Numerator() {
  signal input data[3][2];
  signal input i;
  signal output num;
  var numerator = 1;
  var odd = 1;

  for(var j = 0;j<3;j++)

  {
    var temp1 = data[i][odd];
    var temp2 = data[j][odd];


     if(data[i][0])
       {
           odd = data[i][0];
       }
     

      numerator === (temp2!=temp1)?numerator * temp1:numerator;
  }

  num <== numerator;

  
}

template lagrangeBasis(){
    signal input data[3][2];
    signal input i;
    component numT = Numerator();
   
    signal output outa;
    signal output outb;
    
    for(var j=0;j<3;j++)
    {
        numT.data === data;
        numT.i === 2;
    } 

    outa <== numT.num;
   
    
}

template lagrangeInterpolate(){
   var S = 0;
   signal input share[3][2];

   signal output oute;
   component basis = lagrangeBasis();
   component divI;
   component datA;

   
             basis.data<==share;
             basis.i<==2;
             
            

  var rest = S % basis;

  oute <== rest;

}

component main = lagrangeBasis();