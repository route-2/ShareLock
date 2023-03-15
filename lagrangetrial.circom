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
           if (data[j][0]!=data[i][0]) {
       
         denominator = denominator * (data[i][0] - data[j][0]);
      }
        
       }
       
    } 
    for(var j=0;j<4;j++)
    {
       for(var k = 0;k<2;k++)
       {
          
        if (data[j][0]!=data[i][0]) {
       
        numerator = numerator * (data[i][0] - 0);
        
      }

       }
       
    } 
    outa<==numerator; 
    outb<==denominator;



    
}
component main = lagrangeBasis([
  [ 
     1,
     0x6299f01a0dc39c8a4245b8648bf380a9a58bfeb5232f3d5163d7c492818087612c99ebbbb7f4a4179c813bf4a3f5ec669aa580761abec338cc2ab5858c0a8264f45264e4bdd38369372030180b31ab9c39d37a38ca4dee6492b96c674ba0ffd575cc8d503d0ac1a4b9fc653cdc57c81dcd95aa81774ef43a706a4380d84cc7f14b00c70d7e433fe279fbb2
  ],
  [
     2,
     0x2d4f9903d74f575d143d7ffa7428afbe4ed0fe761b601bba9ebd03131deee13131c202c431d67ff3cb88dbcb6e6dffe623157b9706428756b83fd3507001b74d17eb80948b00433e227fa462faab756113c7ec8a2e4634f951a2a48a9d61d32523eecae6f5c08177477003b23c30dfe601cdfc47c21d91cd921ee8c96459ba516e9086240e5dd7cc5ee21d
  ],
  [
     3,
     0x6020fabd5ca3307875e756c1b89f8d3dfbceff42e8929b3bb0afbb81d54b0d700f7845196da593948d16df845f683a7e994ff162c28b4c59c43f5960abe59eb86acb530f67863f7ec21e5ce0ce6d5d4e8ddd56f42be8d3be3cbba869f54279ef0a66b8c42a213f77a85adbca373318b36b3e7841c6814ca32b64b2cbaaedde467b26a3d1d4f747ea9c7155
  ],
  [
     4,
     0x7b0e15469dbf27dc67433cba59581928ac86011b8ac6bbd499afeddea7950c1dc5bcb2bb6b61def9e12b471f76e49c2ffd54e1d94f991241f02947b63fb638a6ecf1dc555365782b15fc599186776364a813b976c335cab3540478055342f433293456e7da2cfba5dcbced84cd5e728609e71e6f847a24bb3c3ba187ac0933d070c32016d20f903d32a95b
  ]
],1);

/* INPUT = {
    "data1":[
  [ 
     "1",
     "0x6299f01a0dc39c8a4245b8648bf380a9a58bfeb5232f3d5163d7c492818087612c99ebbbb7f4a4179c813bf4a3f5ec669aa580761abec338cc2ab5858c0a8264f45264e4bdd38369372030180b31ab9c39d37a38ca4dee6492b96c674ba0ffd575cc8d503d0ac1a4b9fc653cdc57c81dcd95aa81774ef43a706a4380d84cc7f14b00c70d7e433fe279fbb2"
  ],
  [
     "2",
     "0x2d4f9903d74f575d143d7ffa7428afbe4ed0fe761b601bba9ebd03131deee13131c202c431d67ff3cb88dbcb6e6dffe623157b9706428756b83fd3507001b74d17eb80948b00433e227fa462faab756113c7ec8a2e4634f951a2a48a9d61d32523eecae6f5c08177477003b23c30dfe601cdfc47c21d91cd921ee8c96459ba516e9086240e5dd7cc5ee21d"
  ],
  [
     "3",
     "0x6020fabd5ca3307875e756c1b89f8d3dfbceff42e8929b3bb0afbb81d54b0d700f7845196da593948d16df845f683a7e994ff162c28b4c59c43f5960abe59eb86acb530f67863f7ec21e5ce0ce6d5d4e8ddd56f42be8d3be3cbba869f54279ef0a66b8c42a213f77a85adbca373318b36b3e7841c6814ca32b64b2cbaaedde467b26a3d1d4f747ea9c7155"
  ],
  [
     "4",
     "0x7b0e15469dbf27dc67433cba59581928ac86011b8ac6bbd499afeddea7950c1dc5bcb2bb6b61def9e12b471f76e49c2ffd54e1d94f991241f02947b63fb638a6ecf1dc555365782b15fc599186776364a813b976c335cab3540478055342f433293456e7da2cfba5dcbced84cd5e728609e71e6f847a24bb3c3ba187ac0933d070c32016d20f903d32a95b"
  ]
]

} */