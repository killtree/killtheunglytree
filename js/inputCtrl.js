var update = function (modifier) {
    if (keysUp["13"]) { // Player holding up  
        if(bullitObj.y > bullitDyncModel.powerLimitY){
        	bullitObj.power += bullitDyncModel.power;//* (bullitDyncModel.power / (bullitObj.power + bullitDyncModel.power));
        	bullitObj.powerBuffer = bullitObj.power;
        	if(bullitObj.y > bullitDyncModel.jumpSelfTop){
                soundArray["hero_power"].play()
        		bullitDyncModel.jumpPowerBeginY = bullitObj.y;
        	}
        }
       
        keysUp["13"] = false;
    }

	if (keysUp["65"] || keysUp["68"]) { // Player holding up  
    	bullitObj.horizontalSpeed = 0;
    	if( keysUp["65"]){
    		keysUp["65"] = false;
    		keysUp["lastA"] = then;
    	}else{
    		keysUp["68"] = false;
    		keysUp["lastD"] = then;
    	}
    }

    if(keysDown["65"]) {
    	if(bullitObj.x >= 6.1){
    		if(then - keysUp["lastA"] <= keysUp.doubleLimit){
	    		keysUp["lastA"] = then;
	    		bullitObj.horizontalSpeed = -5;
	    	}else{
	    		bullitObj.horizontalSpeed = -1;
	    	}
    	}else{
    		bullitObj.horizontalSpeed = 0;
    	}
    }
  	if(keysDown["68"]) {
 		if(bullitObj.x <= 288.9  ){
	  		if(then - keysUp["lastD"] <= keysUp.doubleLimit){
	  			keysUp["lastD"] = then;
	    		bullitObj.horizontalSpeed = 5;
	    	}else{
	    		bullitObj.horizontalSpeed = 1;
	    	}
		}else{
	    	bullitObj.horizontalSpeed = 0;
	    }
    }
    inBossRoundCheck();
	attackHeroCheck();
    for(var i=0;i < leafArray.length;i++){
    	if(leafArray[i] !== -1){
    		if(leafArray[i].y > screenCanvas.height || leafArray[i].y < 5 || leafArray[i].x < 0 || leafArray[i].x > 300){
    			leafArray[i] = -1;
    		} 
    	} 
    }
};


function attackHeroCheck(){
	for(var i=0;i < leafArray.length;i++){
    	if(leafArray[i] !== -1){
    		if(leafArray[i].x + 6 >= hero.x && leafArray[i].x  <= hero.x + 15 && leafArray[i].y + 4 >= hero.y){
    			leafArray[i] = -1;
    			hero.life.now -= 1 + boss.power * Math.random();
    			if(hero.life.now <= 0){
                    soundArray["hero_dead"].play();
                    doneModel.fail = true;
                    doneModel.state = true;
    				// alert("sorry, you are dead!")
    			}else{
                    (Math.random() > 0.5)?soundArray["hero_heart_nomal1"].play():soundArray["hero_heart_nomal2"].play();
                }
    		}
    	}
    }
}

/**
*boss: boss.x +80 ;boss.y + 100
***///

function inBossRoundCheck (){
	if(!hero.inBoss){
		if(bullitObj.x + 2 >= boss.x && bullitObj.x <= boss.x + 80 && bullitObj.y + 2 >= boss.y && bullitObj.y <= boss.y + 80 ){
            var heart_deep = 30 * (1 - bullitObj.y / screenCanvas.height) ;
			boss.life.now -= heart_deep 
            switch(Math.round(heart_deep)){
                case 1:
                case 2:
                case 3:
                case 4:
                    soundArray["boss_heart_nomal"].play()
                    break;
                case 5:
                case 6:
                case 7:
                    soundArray["boss_heart_top"].play();
                    break;
                case 8:
                case 9:
                    soundArray["boss_heart_deep"].play();
                    break;
            }
			if(boss.life.now <= 0){
                soundArray["boss_dead"].play();
                doneModel.win = true;
                doneModel.state = true;
				// alert("well done, you kill the ungly Tree Boss! 233~~~");
			}else{
				hero.inBoss = true;
			}
		}
	}else{
		if(bullitObj.x + 2 < boss.x || bullitObj.x > boss.x + 80 || bullitObj.y + 2 < boss.y || bullitObj.y > boss.y + 80 ){
			hero.inBoss = false;
		}
	}
}


function begin(percent){
    if(beginImgReady){
        if( keysUp["13"] == true){
            soundArray["bgm1"].play();
            beginModel.state = true;
        }else{
            drewWelcome(percent);
        }
    }
}

function done(){
    var imageArray = [];
    var imageArrayIndex = [];
    if(doneModel.fail){
        soundArray["fail"].play();
        imageArray = failImgs;
    }else if(doneModel.win){
        soundArray["win"].play();
        imageArray = winImgs;
    }
    while(imageArrayIndex.length < imageArray.length){
        //isReady???
        var temp = 1 + Math.floor(Math.random() * imageArray.length);
        if(imageArrayIndex.indexOf(temp) == -1){
            imageArrayIndex.push(temp);
        }
    }
    drewDone(imageArray,imageArrayIndex);

}
