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
    var sumLoadStatesOK = 0;
    var audios = 14;
    for (var sound in soundArray) {
        if(!soundArray[sound].readyState || soundArray[sound].readyState != 4){//HAVE_ENOUGH_DATA
            soundOk = false;
        }else{
            sumLoadStatesOK++;
        }
    }

    if(beginModel.state == true && soundOk){
        setInterval(main, 0);
        clearInterval(b);
    }else{
        begin(sumLoadStatesOK/audios);
    }
},0);

