function vector() {

let ax= document.getElementById("puntoAX").value;
let ay= document.getElementById("puntoAY").value;
let az= document.getElementById("puntoAZ").value;

let bx= document.getElementById("puntoBX").value;
let by= document.getElementById("puntoBY").value;
let bz= document.getElementById("puntoBZ").value;

//alert("("+ax+","+ay+","+az+")");
//alert("("+bx+","+by+","+bz+")");

let vx=bx-ax,
    vy=by-ay,
    vz=bz-az;

let vectorFinal=`(${vx},${vy},${vz})`
    alert(vx+"  ,  "+vy+"  ,  "+vz);

    document.getElementById("result").innerHTML=vectorFinal;
}   

function vector2() {


let ax= document.getElementById("puntoAX").value;
let ay= document.getElementById("puntoAY").value;
let az= document.getElementById("puntoAZ").value;

let bx= document.getElementById("puntoBX").value;
let by= document.getElementById("puntoBY").value;
let bz= document.getElementById("puntoBZ").value;

let vectorx2= parseInt(bx) + parseInt(ax),
    vectory2= parseInt(by) + parseInt(ay),
    vectorz2= parseInt(bz) + parseInt(az);

let vectorFinalSuma = `(${vectorx2}, ${vectory2}, ${vectorz2})`
document.getElementById("result2").innerHTML= vectorFinalSuma;
   alert(vector2);

}

function vector3() {

    
    let ax = document.getElementById("puntoAX3").value;
    let ay = document.getElementById("puntoAY3").value;
    let az = document.getElementById("puntoAZ3").value;
 
    let bx = document.getElementById("puntoBX3").value;
    let by = document.getElementById("puntoBY3").value;
    let bz = document.getElementById("puntoBZ3").value;

     
 let vx3 = bx * ax,
 vy3 = by * ay,
 vz3 = bz * az;
 vr = (vx3 + vy3 + vz3);


 let vectorFinalPE = `(${vr})`;
 document.getElementById("result3").innerHTML = vectorFinalPE;
   alert(vector3)
}

function vector4(){
     let ax = document.getElementById("puntoAX4").value;
     let bx = document.getElementById("puntoBX4").value;
     let vx4 = Math.sqrt(Math.pow(ax,2) + Math.pow(bx,2));

     let vectorFinalMagnitud = `(${vx4})`;

document.getElementById("result4").innerHTML = vectorFinalMagnitud;
   alert(vectorFinal4)
}
