
pragma circom 2.1.4;

template lagrangeBasis(data,i){
    signal input data1[4][2];
    signal output outa;
    signal output outb;
    var numerator = 1;
    var denominator = 1;
    var odd;

    for(var j=0;j<4;j++){
        if(data[i][0])
       {
           odd = data[i][0];
       }
       if (data[j][odd]!=data[i][odd]) {
       
         denominator =
          denominator * (data[j][odd] - data[i][odd]);
      }
        if (data[j][odd]!=data[i][odd]) {
       
        numerator = numerator * (data[i][odd] - 0);
        
      }
    } 
    outa<==numerator; 
    outb<==denominator;



    
}
component main = lagrangeBasis([[0,1],[8,1],[1,4],[4,3]],2);

/* INPUT = {
    "data1":[["0","1"],["8","1"],["1","4"],["4","3"]]

} */