template Add() {

    //y1/(x1-x2)/(x1-x3)/(x2-x3) + y2/(x2-x1)/(x2-x3)/(x1-x3) + y3/(x3-x1)/(x3-x2)/(x1-x2);
    //denom = (x1 - x2) * (x1 - x3) * (x2 - x3)


    signal input x1;
    signal input y1;
    signal input x2;
    signal input y2;
    signal input x3;
    signal input y3;
    signal output yout;

    signal alpha;
    signal beta;
    signal gamma;

    signal inv_alpha;
    signal inv_beta;
    signal inv_gamma;

    signal denom;

    alpha <== x1-x2;
    beta <== x1-x3;
    gamma <== x2-x3;

    denom <-- alpha * gamma * beta;
    
    inv_alpha <== alpha*(-1);
    inv_beta <== beta*(-1);
    inv_gamma <== gamma*(-1);


    yout <-- (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom;
}

component main = Add();

/* INPUT = {
    "x1":"-4",
    "x2":"0",
    "x3":"2",
    "y1":"4",
    "y2":"2",
    "y3":"2"
} */