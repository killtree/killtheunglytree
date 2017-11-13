/*
*	负责 运算 各个物体的 位置
*/


/*
*	dync for bullit
*	first try: every 20 ms jump
*/
function bullitjump(delta){
	//then is now time
		if(bullitObj.powerBuffer > 0){
			bullitjumpPowerful();
		}else{
			bullitjumpSelf();
		}
		bullitObj.y += bullitObj.speed;
}

function  bullitjumpSelf (){
	if(bullitObj.y > bullitDyncModel.jumpSelfBottom || bullitObj.y < bullitDyncModel.jumpSelfTop){
		bullitObj.speed *= -1;
	}
}

function  bullitjumpPowerful (){
	bullitObj.speed = bullitDyncModel.pr * (bullitObj.power--);
	if(bullitObj.power == 0){//|| bullitObj.y ){
		if(bullitDyncModel.pr == 1){
			bullitDyncModel.pr = -1;
			bullitObj.speed = 1;
			bullitObj.powerBuffer = 0;
			// bullitObj.y = bullitDyncModel.jumpPowerBeginY;
			// bullitDyncModel.jumpPowerBeginY = -1;
		}else{
			bullitDyncModel.pr = 1;
			bullitObj.power = bullitObj.powerBuffer;
		}
	}else{
		if(bullitObj.y > bullitDyncModel.jumpSelfTop && bullitObj.powerBuffer != 0 &&  bullitDyncModel.pr != -1){
			bullitDyncModel.pr = -1;
			bullitObj.speed = 1;
			bullitObj.powerBuffer = 0;
		}
	}
}

/*
*	水平移动
*
*/
function horizontalMove(){
	bullitObj.x += bullitObj.horizontalSpeed;
}

function  heroFlow(){
	var lex = Math.abs(bullitObj.x - hero.x);
	var per = (lex / (bullitObj.x - hero.x)) * 10;
	if(lex > 1){
		var temp = per * (lex / screenCanvas.width); 
		hero.x += temp;
		hero.rotate = temp;
	}
}

function bossMove(){
	switch(Math.round(88 * Math.random())){
		case 1:
			bossMovePath_Jump();
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
		case 22:
		case 23:
		case 24:
		case 25:
		case 26:
		case 32:
		case 33:
		case 34:
		case 35:
		case 36:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
			bossMovePath_Flow();
			break;
		default:
			bossMovePath_Random();
			break;
	}

	if(boss.y > 20 ){
		boss.y -= 5;
		boss.speed.y *= -1; 
	}
	if(boss.y < 5){
		boss.y +=5;
		boss.speed.y *= -1; 
	}
	if(boss.x > 200 ){
		boss.x -=10;
		boss.speed.x *= -1; 
	}
	if(boss.x < 5){
		boss.x +=10;
		boss.speed.x *= -1; 
	}

	bossMovePath_Attack();

}


function bossMovePath_Random(){
	var R = {
			x: Math.random(),
			y: Math.random()
		};
	boss.x += boss.speed.x * R.x * ((Math.random() >= 0.8)?-1:1);
	boss.y += boss.speed.y * R.y * ((Math.random() >= 0.8)?-1:1);
}

function bossMovePath_Flow(){
	var lex = Math.abs(hero.x - boss.x);
	var per = (lex / (hero.x - boss.x)) * 10;
	if(lex > 1){
		var temp = per * (lex / screenCanvas.width); 
		boss.x += temp;
	}
}

function bossMovePath_Jump(){
	var R = {
			x: 200 - boss.x,
			y: 5 + 30 - boss.y 
		};
	boss.x = R.x;
	boss.y = R.y;
}

function bossMovePath_Attack(){
	if(leafImgReady1 && leafImgReady2){
		var type = Math.round(Math.random() * 6.1);
		if(then - boss.lastroal > boss.roalTimeLimit){
			soundArray["boss_attack_nomal"].play();
			boss.lastroal = then;
		}
		
		if(then - boss.lastCriTime > boss.criTimeLimit){
			criAttack();
			boss.lastCriTime = then;
		}

		if( Math.random() > 0.5 && (then - leafModel.nomalLast > leafModel.nomalLimit * (1 - (1 - Math.pow(boss.life.now/boss.life.full,2)) * Math.random()))){
			for(var i=0;i<leafArray.length;i++){
				if(leafArray[i] === -1){
					leafArray[i] = {
						type: type,
						lestRef:0,
						refLimit: 888,
						lestImgFlag:1,
						img:leafImg1,
						x:boss.x + 40,
						y:boss.y,
						initDirection:(hero.x - boss.x - 40) / Math.abs(hero.x - boss.x - 40)
					}
					leafModel.nomalLast = then;
					return;
				}
			}
			leafArray.push({
				type: type,
				lestRef:0,
				refLimit: 888,
				lestImgFlag:1,
				img:leafImg1,
				x:boss.x + 40,
				y:boss.y,
				initDirection:(hero.x - boss.x - 40) / Math.abs(hero.x - boss.x - 40)
			});
			leafModel.nomalLast = then;
		}
	}
}


function leafMove(index){
	for(var i=0;i < leafArray.length;i++){
		if(leafArray[i] !== -1){
			//旋转
			if(then - leafArray[i].lestRef > leafArray[i].refLimit){
				if(leafArray[i].lestImgFlag == 1){
					leafArray[i].img = leafImg2;
					leafArray[i].lestImgFlag = 2;
				}else{
				 	leafArray[i].lestImgFlag = leafImg1;
					leafArray[i].lestImgFlag = 1;
				}
				leafArray[i].lestRef = then;
			}
			if(leafArray[i].cri == true){
				if(leafArray[i].type == 7){
					leafArray[i].x = leafArray[i].core.x + leafArray[i].criSpeed.r * Math.sin(leafArray[i].criSpeed.a) * 3.5;
					leafArray[i].y = leafArray[i].core.y + leafArray[i].criSpeed.r * Math.cos(leafArray[i].criSpeed.a) * 1.5;
					leafArray[i].criSpeed.r++;
				}else{
					leafArray[i].y += 5// leafArray[i].criSpeed;
				}
			}else{
				//飞行
				leafArray[i].x += (leafArray[i].type == 6)?(hero.x - leafArray[i].x) / Math.abs(hero.x - leafArray[i].x) * leafModel.speed : leafArray[i].initDirection * leafModel.speed;
				leafArray[i].y += leafModel.speed;
			}
			
		}

	}
	
}


function criAttack(){
	var criType = Math.round((Math.random() + Math.random()*(2) + Math.random()*3 + Math.random()*4 + Math.random()*5 + Math.random()*6));
	switch(criType){
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
			criLine(1);
			break;
		case 16:
		case 18:
			criLine(3);
		default:
			criCircle();
			break;
	}
}


function criCircle(){
	var core = {
		x:boss.x + 40,
		y:boss.y + 40
	}
	//轨迹 + 必杀技: 36个
	for(var i=0;i < criCircleModel.digit;i++){
		leafArray.push({
			cri:true,
			type: 7,//8 暂定两种大招
			lestRef: Date.now(),
			refLimit: Date.now(),
			lestImgFlag:-1,
			img:criImg1,//criImg2
			x:core.x ,
			y:core.y ,
			core:core,
			initDirection:-1,
			criSpeed:{
				r:1,
				a:(( i / criCircleModel.digit) * 360) * 0.017453293 // 0.017453293  2PI/360
			}
		});
	}
	if(Math.random() > Math.random() ){
		soundArray["boss_heart_nomal"].play();
	}
}

function criLine(type){
	for(var i=0;i < criLineModel.digit * type;i++){
		leafArray.push({
			cri:true,
			type: 8,// 暂定两种大招
			lestRef: Date.now(),
			refLimit: Date.now(),
			lestImgFlag:-1,
			img:criImg2,
			x: i * criLineModel.length / type,
			y: boss.y + 20,
			initDirection: -1,
			criSpeed: 1 + 1.05 * Math.random()  
		});
	}
	if(Math.random() > Math.random() ){
		soundArray["boss_laugh"].play();
	}
}







