const string= {}
string.rep= function(s, n= 1, rep="") {
    let str="";
    for (let i= 1;i<= n;i++) {
        str+= s.toString() + (i< n?rep.toString():"");
    };
    return str;
};
string.sub= function(str, s= 1, f) {
    let reply="";
    str= str.toString().split("");
    f= f || str.length;
    for (let i= s - 1;i< f;i++) {
        reply+= str[i];
    };
    return reply;
};
string.reverse= function(s) {
    let reply=""
    s= s.toString().split("");
    for (let i= s.length - 1;i>= 0;i--) {
        reply+= s[i];
    };
    return reply;
};