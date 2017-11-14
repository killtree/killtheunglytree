var render = function (delta) {
    //清屏
    clearAct(ctx); 
    drewBossLife();
    drewBoss();
    drewBullit(delta);
    drewLeaf();
    drewHero();
    drewHeroLife();
};  

var main = function () {
    if(!doneModel.state){
        if(bossImgReady1 && bossImgReady2 && leafImgReady1 && leafImgReady2 && heroImgReady ){
            var now = Date.now();
            var delta = now - then;

            update(delta / 200);
            if(then - bullitDyncModel.lastDyncTime > bullitDyncModel.dyncLimit){
                render(delta);//->drew
                bullitDyncModel.lastDyncTime = then;
            }
            then = now;
        }
    }else{
        soundArray["bgm1"].pause();
        if(then - doneRef.last >= doneRef.limit){
            done();
            doneRef.last = then;
        }
        then = Date.now();
    }
};

then = Date.now();
var b = setInterval(function(){
    var soundOk = true;
    for (var sound in soundArray) {//canplay
        if(!sound.readyState || sound.readyState != HAVE_ENOUGH_DATA){
            soundOk = false;
            break;
        }
    }

    if(beginModel.state == true && !soundOk){
        //加载 load 动画
        setInterval(main, 0);
        clearInterval(b);
    }else{
        begin();
    }
},0);

