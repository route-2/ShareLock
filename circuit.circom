pragma circom 2.0.0;
import("ff").Decimal




template lagrangeBasis(data, i) {
   var numerator = Decimal.fromFloat(1);
   var denominator = Decimal.fromFloat(1);

   for (var j=0; j<data.length; j++) {
      if (i != j) {
         numerator = numerator.times(data[j].x.neg());
         denominator = denominator.times(data[j].x.minus(data[i].x));
      }
   }

   return {numerator: numerator, denominator: denominator};
}



// Lagrange interpolation

template lagrangeInterpolate(data,p){
   S = Decimal.fromFloat(0);

   for (var i=0; i<data.length; i++) {
      var basis = lagrangeBasis(data, i);
    S = S.add(data[i].y.times(divmod(basis.numerator, basis.denominator, p)));
  }

  var rest = S.mod(p);

  return rest;
}
template combine (shares,prime) {  

   // Declaration of signals.  
    p = Decimal.fromFloat(parseFloat(prime));
   component share = [0,0];
   for (var j=0; j<shares; j++) {

      share[j] === Decimal.fromFloat(parseFloat(shares[j]));
           
        }



   

  return lagrangeInterpolate(share, p);
}