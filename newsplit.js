function split(secret,n){
    
    x_1 = 0;
    y_1 = Number(secret);
    x_2 = Math.ceil(Math.abs(Math.random())*1e3);
    y_2 = Math.ceil(Math.abs(Math.random())*1e3);
    x_3 = Math.ceil(Math.abs(Math.random())*1e3);
    y_3 = Math.ceil(Math.abs(Math.random())*1e3);

    a = y_1/((x_1-x_2)*(x_1-x_3)) + y_2/((x_2-x_1)*(x_2-x_3)) + y_3/((x_3-x_1)*(x_3-x_2))

    b = -y_1*(x_2+x_3)/((x_1-x_2)*(x_1-x_3)) -y_2*(x_1+x_3)/((x_2-x_1)*(x_2-x_3)) -y_3*(x_1+x_2)/((x_3-x_1)*(x_3-x_2))

    c = y_1*x_2*x_3/((x_1-x_2)*(x_1-x_3)) + y_2*x_1*x_3/((x_2-x_1)*(x_2-x_3)) + y_3*x_1*x_2/((x_3-x_1)*(x_3-x_2))

    sharex1 = 1;
    sharex2 = 2;
    sharex3 = 3;
    sharey1 = (a*sharex1*sharex1 + b*sharex1 + c)%1613;
    sharey2 = (a*sharex2*sharex2 + b*sharex2 + c)%1613;
    sharey3 = (a*sharex3*sharex3 + b*sharex3 + c)%1613;

    console.log("Share 1: " + sharey1);
    console.log("Share 2: " + sharey2);
    console.log("Share 3: " + sharey3);

    return [sharey1, sharey2, sharey3];

}

function combine(y_1, y_2, y_3, prime){
    x_1 = 1
    x_2 = 2
    x_3 = 3

    c = y_1*x_2*x_3/((x_1-x_2)*(x_1-x_3)) + y_2*x_1*x_3/((x_2-x_1)*(x_2-x_3)) + y_3*x_1*x_2/((x_3-x_1)*(x_3-x_2))

    console.log(c);

    return c;
}

function main(){
    let shares = split("0x6a17a7d15ace9582eee61573e9c646c2f206c707261077668e24a7802cedbe16", 3);
    let secret = combine(shares[0], shares[1], shares[2]);
    console.log("Secret: " + secret);
}

main();