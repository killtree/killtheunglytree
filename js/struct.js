/*
*This is for all src
*/
var bigCanvas = document.getElementById("bigCanvas");
var ctx = bigCanvas.getContext("2d");

var then = -1;
var bossImgReady1 = false;
var bossImg1 = new Image();
bossImg1.onload = function (){
    bossImgReady1 = true;
};
bossImg1.src = "img/boss1.jpg";

var bossImgReady2 = false;
var bossImg2 = new Image();
bossImg2.onload = function (){
    bossImgReady2 = true;
};
bossImg2.src = "img/boss2.jpg";

var bossImgReadyHeart = false;
var bossImgHeart = new Image();
bossImgHeart.onload = function (){
    bossImgReadyHeart = true;
};
bossImgHeart.src = "img/bossheart.jpg";

var leafImgReady1 = false;
var leafImg1 = new Image();
leafImg1.onload = function (){
    leafImgReady1 = true;
};
leafImg1.src = "img/leaf1.jpg";

var leafImgReady2 = false;
var leafImg2 = new Image();
leafImg2.onload = function (){
    leafImgReady2 = true;
};
leafImg2.src = "img/leaf2.jpg";


var criImgReady1 = false;
var criImg1 = new Image();
criImg1.onload = function (){
    leafImgReady1 = true;
};
criImg1.src = "img/cri1.jpg";

var criImgReady2 = false;
var criImg2 = new Image();
criImg2.onload = function (){
    leafImgReady2 = true;
};
criImg2.src = "img/cri2.jpg";


var heroImgReady = false;
var heroImg = new Image();
heroImg.onload = function (){
    heroImgReady = true;
};
heroImg.src = "img/hero.jpg";

var screenCanvas ={
	width: 300,
	height: 150
}

var bullitObj = {
	speed : -1,
	x: 150,
	y: 120,
	power:0,
	powerBuffer:0,
	horizontalSpeed:0
}

var bullitDyncModel = {
	lastDyncTime : -1,
	dyncLimit: 30,
	jumpSelfTop: 116.1,
	jumpSelfBottom: 126.1,
	pr:-1,
	powerLimitY: 106.1,
	power:8,
	jumpPowerBeginY:-1
}

var keysDown = {};  
var keysUp = {doubleLimit:200};  
var keysPress={};

addEventListener("keydown", function (e) {  
     keysDown[e.keyCode] = true;  
}, false);  
addEventListener("keyup", function (e) {  
     delete keysDown[e.keyCode];  
     keysUp[e.keyCode] = true;  
}, false); 

addEventListener("keypress", function (e) {  
     keysPress[e.keyCode] = true;  
}, false); 

// an array for bullit `s life:
bullitLife = 49;
killLife = [];

var boss = {
	life:{now:300,full:300},
	x:0,
	y:5,
	speed:{x:2.6,y:1},
	lastroal:0,
	roalTimeLimit:1888,
	lastCriTime:Date.now(),
	criTimeLimit:2000,
	power:8
}
var bossMoveModel ={
	topLimit :5,
	bottomLimit:100
}

var hero = {
	life:{now:49,full:49},
	x:150,
	y:136,
	rotate:0,
	inBoss:false
}

var leafModel = {
	 speed:2,
	 nomalLast:-1,
	 nomalLimit: 888
}


var leafArray = [];

var soundArray = {}
soundArray["bgm1"] = new Audio('media/bgm1.mp3');
soundArray["bgm1"].volume = 0.72;
soundArray["bgm1"].loop = true;
soundArray["bgm1"].preload = "auto";
 
soundArray["bgm2"] = new Audio('media/bgm2.mp3');
soundArray["bgm2"].volume = 0.6;
soundArray["bgm2"].preload = "auto";

soundArray["boss_heart_nomal"] = new Audio('media/boss_heart_nomal.wav');
soundArray["boss_heart_nomal"].volume = 0.7;
soundArray["boss_heart_nomal"].preload = "auto";

soundArray["boss_heart_top"] = new Audio('media/boss_heart_top.wav');
soundArray["boss_heart_top"].volume = 0.7;
soundArray["boss_heart_top"].preload = "auto";

soundArray["boss_heart_deep"] = new Audio('media/boss_heart_deep.wav');
soundArray["boss_heart_deep"].volume = 0.7;
soundArray["boss_heart_deep"].preload = "auto";

soundArray["boss_attack_nomal"] = new Audio('media/boss_attack_nomal.wav');
soundArray["boss_attack_nomal"].volume = 0.38;
soundArray["boss_attack_nomal"].preload = "auto";

soundArray["boss_dead"] = new Audio('media/boss_dead.wav');
soundArray["boss_dead"].volume = 0.7;
soundArray["boss_dead"].preload = "auto";

soundArray["boss_laugh"] = new Audio('media/boss_laugh.wav');
soundArray["boss_laugh"].volume = 0.7;
soundArray["boss_laugh"].preload = "auto";

soundArray["hero_heart_nomal1"] = new Audio('media/hero_heart_nomal1.wav');
soundArray["hero_heart_nomal1"].volume = 0.7;
soundArray["hero_heart_nomal1"].preload = "auto";

soundArray["hero_heart_nomal2"] = new Audio('media/hero_heart_nomal2.wav');
soundArray["hero_heart_nomal2"].volume = 0.7;
soundArray["hero_heart_nomal2"].preload = "auto";

soundArray["hero_power"] = new Audio('media/hero_power.wav');
soundArray["hero_power"].volume = 0.76;
soundArray["hero_power"].preload = "auto";

soundArray["hero_dead"] = new Audio('media/hero_dead.wav');
soundArray["hero_dead"].volume = 0.7;
soundArray["hero_dead"].preload = "auto";

soundArray["fail"] = new Audio('media/fail.mp3');
soundArray["fail"].volume = 0.7;
soundArray["fail"].preload = "auto";

soundArray["win"] = new Audio('media/win.mp3');
soundArray["win"].volume = 1.0;
soundArray["win"].preload = "auto";


var criCircleModel = {
	digit:36
}

var criLineModel = {
	digit:10,
	length:30
}


var beginImgReady = false;
var  beginImg = new Image();
beginImg.onload = function (){
    beginImgReady = true;
};
beginImg.src = "img/begin.jpg";
var beginModel = {
	state:false
};
var doneModel ={
	state: false,
	fail:false,
	win:false,
	first:{
		x:90,
		y:20
	},
	lastDrew:0,
	drewTimeLimit:888
}


var failImgs = [];
var failImgsModel ={
	state:false
}
var winImgs = [];
var winImgsModel ={
	state:false
}
function initImgs (){
	for(var i=0;i < 9;i++){
		var obj = {ready:false,img:new Image()}
		obj.img.onload = function (){
		    obj.ready = true;
		};
		obj.img.src = "img/fail"+(i + 1)+".jpg";
		failImgs.push(obj);
	}
	for(var i=0;i < 9; i++){
		var obj = {ready:false,img:new Image()}
		obj.img.onload = function (){
		    obj.ready = true;
		};
		obj.img.src = "img/win"+(i + 1)+".jpg";
		winImgs.push(obj);
	} 
}
initImgs();



var doneRef={
	last:0,
	limit:200
}






