const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

if(innerWidth>=innerHeight){
    document.body.style.backgroundSize=innerWidth+"px";
}
else{
    document.body.style.backgroundSize=innerHeight+"px";
}

let i;
let arr=[];
let score=0;
let mousex=0,mousey=0;

let fish=new Image();
fish.src="images/icon2.png";

const audio1=document.createElement("audio");
audio1.src="audio/bubblePop.ogg";

let color=["#33ffff","#4799eb","#0073e6","#0000cc","#000080"];
/*
let size=[3,4,5,6,7,8];
let speed=[0.015,0.02,0.023,0.025,0.03];
let radius=[250,260,270,280,290];
*/

window.addEventListener("resize",function(){
	canvas.width=innerWidth;
	canvas.height=innerHeight;
});

document.addEventListener("mousemove",function(event){
    if(event.clientX<=mousex){
        fish.src="images/icon1.png";
    }
    else{
        fish.src="images/icon2.png";
    }
    mousex=event.clientX;
    mousey=event.clientY;
});

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
/* no need to spawn them every second. just send the ones that left the screen or which were bursted by player back down
setInterval(keepBubbling,1000);
function keepBubbling(){
    for(i=0;i<5;i++){
        arr.push({x:randomInt(0,innerWidth),y:randomInt(innerHeight,innerHeight*2),color:color[randomInt(-1,5)]});
    }
}
*/

for(i=0;i<100;i++){
    arr.push({x:randomInt(0,innerWidth),y:randomInt(innerHeight,innerHeight*10),color:color[randomInt(-1,5)]});
}

requestAnimationFrame(animate);
function animate(){
//    ctx.fillStyle='rgb(225,225,225,0.1)'; //white color with last parameter as opacity between 0 and 1
//    ctx.fillRect(0,0,innerWidth,innerHeight);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    ctx.drawImage(fish,mousex,mousey);

    ctx.textAlign="start";
    ctx.font="50px georgia";
    ctx.fillStyle="black";
    ctx.fillText("score: "+score,40,40);

    for(i=0;i<arr.length;i++){
        ctx.beginPath();
        arr[i].y-=3;
        ctx.arc(arr[i].x,arr[i].y,30,0,Math.PI*2,true);
        ctx.strokeStyle=arr[i].color;
//        ctx.shadowColor="#000000";
        ctx.lineWidth=3;
        ctx.stroke();
        if(arr[i].y<=-30){
            //arr.splice(i,1);
            //delete arr[i];
            arr[i].y=randomInt(innerHeight,innerHeight*10); /*i didn't needed to delete the bubbles from array, i just needed to send them back down*/
        }
        else if(mousex>=arr[i].x-30 && mousex<=arr[i].x+30 && mousey>=arr[i].y-30 && mousey<=arr[i].y+30){
            //arr.splice(i,1); /*this works too. delete this bubble and then add new at end*/
            //delete arr[i];
            arr[i].y=randomInt(innerHeight,innerHeight*10);
            audio1.play();
            score++;
        }
    }
    requestAnimationFrame(animate);
}