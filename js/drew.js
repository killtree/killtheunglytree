/*
*	负责绘画逻辑
*/

/*
*清屏
*/
function clearAct(p) {
	p.fillStyle = "black";
	p.fillRect(0, 0, 888, 588);
}

/*
* 怪物血条
*/
function drewBossLife(){
 	ctx.fillStyle = "red";//"red";//
    ctx.fillRect( 0, 0, boss.life.now, 1.8);
}

/*
* 怪物血条
*/
function drewBoss(){
	bossMove();
	if(bossImgReady1 && bossImgReady2 && bossImgReadyHeart){
		if(hero.inBoss){
    		ctx.drawImage(bossImgHeart, boss.x+5, boss.y+5 + 5,72,72);//->>
		}else{
    		ctx.drawImage(((Math.random()>0.5)?bossImg1:bossImg2), boss.x, boss.y + 5);//->>
		}
    }
}

/*
*	负责绘画逻辑
* 	专门绘画 子弹
*/
function drewBullit(delta){
	bullitjump(delta);//->dync
	horizontalMove();//?
    ctx.fillStyle = "yellow";//"white";//
    ctx.fillRect(bullitObj.x,bullitObj.y ,2,2);
}


function drewHeroLife(){
	for(var i=0; i < hero.life.now;i++){
		ctx.fillStyle = "white";//"red";//
 		ctx.fillRect(4 + i * 6 ,131.5,5,1);
	}
}


function drewHero(){
    heroFlow();
	if(heroImgReady){
 		ctx.drawImage(heroImg, hero.x, hero.y);//->>
		// ctx.rotate(hero.rotate * Math.PI/180);
	}
}

function drewLeaf (){
	leafMove();
	for(var i=0;i<leafArray.length;i++){
		if(leafArray[i] !== -1){
 			ctx.drawImage(leafArray[i].img, leafArray[i].x, leafArray[i].y);//->>
		}
	}
}

function drewWelcome (){
 	ctx.drawImage(beginImg, 80, 70);//->>
}


function drewDone (imgs,indexs){
	clearAct(ctx); 
	if(doneModel.win){
	  	ctx.font = "8px Courier New";
	    ctx.fillStyle = "blue";
	    ctx.fillText("Congratulations, you have kill", 50, 9);
	  	ctx.font = "6px Courier New";
	    ctx.fillText("the ungly Tree!", 100, 17);
	}else{
		ctx.font = "10px Courier New";
	    //设置字体填充颜色
	    ctx.fillStyle = "blue";
	    ctx.fillText("sorry,you can refresh the browser!", 50, 10);
	}

	for(var i=0;i < 3;i++ ){
		for(var j=0;j < 3;j++ ){
 			ctx.drawImage(imgs[indexs[i * 3 + j ] - 1].img, doneModel.first.x + i * 40, doneModel.first.y + j * 40);//->>
		}
	}
}
