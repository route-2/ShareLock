pragma circom 2.1.4;

template Gaus() {
    signal input x1;
    signal input x2;
    signal input x3;
    signal input y1;
    signal input y2;
    signal input y3;

    signal output outx1;
    signal output outy1;
    signal output outx2;
    signal output outy2;


    var m1 = 0;
    var m2 = 0;

    signal output res;

    m1 = (y2-y1)/(x2-x1);
    m2 = (y3-y2)/(x3-x2);

    if(m1==m2){
        outx1 <-- x1;
        outx2 <-- x2;
        outy1 <-- y1;
        outy2 <-- y2;
    }


}

component main = Gaus();

/*
INPUT={
    "x1":"1",
    "x2":"2",
    "x3":"3",
    "y1":"16241961137592804136592688288472680631438566022962401345728929050782336497123002166703571609228246673",
    "y2":"14985916476921512878205310773046722192054320287993817627456745798676440190856829418928968240658202381",
    "y3":"13729871816250221619817933257620763752670074553025233909184562546570543884590656671154364872088158089"
}
*/