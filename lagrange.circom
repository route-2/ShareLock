
pragma circom 2.1.4;

template lagrangeBasis(data,i){

    signal input data1[4][2];

    signal output outa;
    signal output outb;

    var numerator =1 ;
    var denominator = 1;
    

    for(var j=0;j<4;j++)
    {
       for(var k = 0;k<2;k++)
       {
           if (data[i][0]!=data[j][0]) 
      {
       
         denominator = denominator * (data[j][0] - (data[i][0]));
      }
        
       }
       
    } 
    for(var j=0;j<4;j++)
    {
       for(var k = 0;k<2;k++)
       {
          
        if (data[i][0]!=data[j][0]) 
        {
       
        numerator = numerator * data[j][0];
        
      }

       }
       
    } 
    outa<==numerator;
    outb<==denominator; 



    
}


component main = lagrangeBasis([
  [ 
     1,
    0x66f4f0b4acef26ceb9007cfaec6bdb0e9b83d7d7c4e2139ca0a0c64591f0844527502823c284423813a82a8f05514639aced063bb1072591b3027a59c2b617b313d4ee79c90beac3a0d0dbddbbd9b5ea4c0adfa2d7fc95b36bc137f42d3fdff2c994d8e66cd0418d03f1d51d441b62093a15c325270fa76ce449182546be7af4a12e406c9d4902a158adbc
     
  ],
  [
     2,
     0x9343a9c84f0da857785260b6e8d3bc51f68da0223fe2b31aa793ccf3903f1a4455a3278e844b43429ae70a06365f91e59c295ab5adb9cd471ba0ccad51bbd93d991cacebbd12d400951660ac6d991efcd3ad021a7df441bbeeb97d85f1411ce3a4642c22966b550509b1e4a51f7489f2a5df420cad43487f39afce324473f249e718f3ec6a673708389fd
  ],
  [
     3,
     0x66bdddb788051b243b8dfb31866422238baf067f1d5446bf1d89639cf53a481d5a1e1eff714155f44212d2341a3e18ae0680ae4efd7d65c83c26b7533730f1a2513694fed84fc77539819e8720ff9410838fd17c6fa80b38f97f1fac957c959252143d9335c35b49e5fbdbf1413b851c9f6e15e1d1631b3af43c712b9f6153b608415304a0bfd29a6e52d6
  ],
  [
     4,
     0x7f91da05b62be8ab051afc6d33f08e29e0565d4eb0e46644f9d13aaec69387b0659bedb75d7a27785cd54f4a29d9a4e8b327502698ec806d124879f2e8f5b3de7ac34d0a1e87b96331618552ca4bbc4c6f09e3b32f56eb0b1b7bcf70d0796b3f10fec95991e63379c4140e1211e81781994628683abc5b85e62d74feb80cb8a8de9d8bbe2b95201f190849
     
  ]
],2);

/* INPUT = {
    "data1":[
  [ 
     "1",
     "0x66f4f0b4acef26ceb9007cfaec6bdb0e9b83d7d7c4e2139ca0a0c64591f0844527502823c284423813a82a8f05514639aced063bb1072591b3027a59c2b617b313d4ee79c90beac3a0d0dbddbbd9b5ea4c0adfa2d7fc95b36bc137f42d3fdff2c994d8e66cd0418d03f1d51d441b62093a15c325270fa76ce449182546be7af4a12e406c9d4902a158adbc"
  ],
  [
     "2",
     "0x9343a9c84f0da857785260b6e8d3bc51f68da0223fe2b31aa793ccf3903f1a4455a3278e844b43429ae70a06365f91e59c295ab5adb9cd471ba0ccad51bbd93d991cacebbd12d400951660ac6d991efcd3ad021a7df441bbeeb97d85f1411ce3a4642c22966b550509b1e4a51f7489f2a5df420cad43487f39afce324473f249e718f3ec6a673708389fd"
  ],
  [
     "3",
     "0x66bdddb788051b243b8dfb31866422238baf067f1d5446bf1d89639cf53a481d5a1e1eff714155f44212d2341a3e18ae0680ae4efd7d65c83c26b7533730f1a2513694fed84fc77539819e8720ff9410838fd17c6fa80b38f97f1fac957c959252143d9335c35b49e5fbdbf1413b851c9f6e15e1d1631b3af43c712b9f6153b608415304a0bfd29a6e52d6"
  ],
  [
     "4",
     "0x7f91da05b62be8ab051afc6d33f08e29e0565d4eb0e46644f9d13aaec69387b0659bedb75d7a27785cd54f4a29d9a4e8b327502698ec806d124879f2e8f5b3de7ac34d0a1e87b96331618552ca4bbc4c6f09e3b32f56eb0b1b7bcf70d0796b3f10fec95991e63379c4140e1211e81781994628683abc5b85e62d74feb80cb8a8de9d8bbe2b95201f190849"
  ]
]

} */