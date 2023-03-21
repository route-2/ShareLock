pragma circom 2.1.4;
template divmod(a1,b1,n1) {
  signal input a;
  signal input b;
  signal input n;
  var t = 0;
  var nt = 1;
  var r = n;
  var nr = b % n;
  var tmp;
  var div;
   var quot;
  signal output ans; 
  while (nr!=0) {
    div = r/nr;
    if(div<0){
       t=div +(-1);
       quot = t;
    }
    else quot = div;

  



    
    tmp = nt;  nt = t - (quot * nt);  t = tmp;
    tmp = nr;  nr = r - (quot * nr);  r = tmp;
  }
  
  if (r>1) {ans <== 0;}
  if (t<0){ t = t + n;
  ans <== a * (t%n);}}

component main = divmod(8,2,27817953874931422193200157252797783625799553985162128378849682836025612139606873061796642986409084093027488282529479441356879309912545136580926563006055687622422043646784287399491305767249266136610482504757705065498211196461322151021271625793951908619828755931791767521474322440333549820076334848895352132541368625047123052020050690047);

/* INPUT = {
    "a":8,
    "b"=2,
     "n"=27817953874931422193200157252797783625799553985162128378849682836025612139606873061796642986409084093027488282529479441356879309912545136580926563006055687622422043646784287399491305767249266136610482504757705065498211196461322151021271625793951908619828755931791767521474322440333549820076334848895352132541368625047123052020050690047

} */