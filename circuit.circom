pragma circom 2.1.4;

template lagrangeBasis(data, i) {
   var numerator = 1;
   var denominator = 1;

   for (var j=0; j<data.length; j++) {
      if (i != j) {
         numerator = numerator * (-data[j].x);
         denominator = denominator * (data[j].x - data[i].x);
      }
   }

   return numerator && denominator;
}

template divmod(numerator,denominator){
   var quotient = 0;
   var remainder = numerator;

   while (remainder >= denominator) {
      remainder = remainder - denominator;
      quotient = quotient + 1;
   }

   return quotient && remainder;
}



// Lagrange interpolation

template lagrangeInterpolate(data,p){
   var S = 0;

   for (var i=0; i<data.length; i++) {
       var basis = lagrangeBasis(data, i);
    S = S + (data[i].y * (divmod(basis.numerator, basis.denominator, p)));
  }

  var rest = S % (p);

  return rest;
}
template combine () {  

   // Declaration of signals. 
   signal input prime; 
   signal input share[3];
  return lagrangeInterpolate(share, prime);
}

component main{public[share,prime]} = combine();