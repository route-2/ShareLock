pragma circom 2.0.4;
template floor(v){
  
    var t;

    signal output outf;
    if(v<0){

       t=v +(-1);
       outf <== t;
    }
    else outf <== v;
}

template findSqrt(in){
   signal output out;
   for(var i=1;i<in;i++){
      if(i**2 == in){
         out<==i;
      }
   }
}

template divmod(){
   
}



template lagrangeBasis(data,i){

   
   

    signal output outa;
    signal output outb;

    var numerator =1 ;
    var denominator = 1;
    var flag = 0;
    

    for(var j=0;j<3;j++)

    {
           if (data[i][0]!=data[j][0]) 
           
        
      {
         denominator = denominator * (data[j][0] - (data[i][0]));
         
         
      }
    } 
     
    for(var j=0;j<3;j++)
    {
       for(var k = 0;k<2;k++)
       {
          
        if (data[i][0]!=data[j][0]) 
        {
       
        numerator = numerator * data[j][0];
        
      }

       }
       
    } 
   

    component numroot = findSqrt(numerator);
    
    outa<==numroot.out;
outb<==denominator; 
    
}

template lagrangeInterpolate(data, p) {
   
    signal output result;
    var div;


  var S = 0;
      component basis;

  for (var i = 0; i < 3; i++) {
      for(var j = 0;j<2;j++)
      {

     basis = lagrangeBasis(data,i);
     
    div = basis.outa/basis.outb;
    
    
   
    S = S + (data[i][1] * div);
      }
  }

   result <== S % p;

  
}
component main =lagrangeInterpolate([[0,1],[8,1],[1,4]], 112359660044372065484441951235030142983174398544812028832278623854666456186464981281697823747040681172063136960475741636194003267249065962847191134043977177417262658624760480296093854759559904100526625869529764632821631287622711509362461779393924996752542576696954857358708468038138799222651682182506375684408191658782769227044407810487694714277015787299453844741695021375314262764838976834848162882076763228291748292125837874583406862057369579625510012569201655610174114134029263009534578486068411031171352786822259404497621186788791903968435376767381008114860543432128110240912783033139679857313654570551752499974641212302584907725849855077192434062738240039467221776332833741216012069582907330324256506744580051771386054065087);


/* INPUT = {
    "data1":[["0","1"],["8","1"],["1","4"]],
    "p": 112359660044372065484441951235030142983174398544812028832278623854666456186464981281697823747040681172063136960475741636194003267249065962847191134043977177417262658624760480296093854759559904100526625869529764632821631287622711509362461779393924996752542576696954857358708468038138799222651682182506375684408191658782769227044407810487694714277015787299453844741695021375314262764838976834848162882076763228291748292125837874583406862057369579625510012569201655610174114134029263009534578486068411031171352786822259404497621186788791903968435376767381008114860543432128110240912783033139679857313654570551752499974641212302584907725849855077192434062738240039467221776332833741216012069582907330324256506744580051771386054065087
} */