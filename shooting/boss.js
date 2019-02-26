window.addEventListener("load",init);

function init() {
    hp = 300;//ボスのHP
    color = 255; //色調整用
    bossbulletList = [];
    speed = 15;
    angle = 0;
    bosscount = 0;

    // ボス
    boss = new createjs.Shape();
    // boss.graphics.beginFill("red")
    boss.graphics.beginFill(createjs.Graphics.getRGB(255, color, color))
        .moveTo(100,75)
        .lineTo(0,50)
        .lineTo(-50,50)
        .lineTo(-100,0)
        .lineTo(-50,-50)
        .lineTo(0,-50)
        .lineTo(100,-75)
        .lineTo(70,-30)
        .lineTo(70,30)
        .closePath();
    boss.x = 850;
    boss.y = 270;
    boss.alpha = 0.0;


    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
    let once = true;

    console.log(scene);

        function handleTick() {
            if (scene === 1 && once) {
                createjs.Tween.get(boss)
                    .to({alpha: 1.0}, 5000);
                console.log(boss.alpha);
                once = false;
                console.log(scene);
            }

            for (let i = 0; i < bossbulletList.length; i++) {
                let bulletLocal = bossbulletList[i].localToLocal(0, 0, player);
                if (player.hitTest(bulletLocal.x, bulletLocal.y)) {
                    GameOver();
                }


            else if(scene === 1 && !once)
                if (boss.alpha === 1.0) {
                    bosscount = bosscount + 1;
                    if (bosscount % 10 === 0) {
                        bossbullet = new createjs.Shape();
                        bossbullet.graphics.beginFill("yellow").drawCircle(0, 0, 3);
                        bossbullet.x = boss.x;
                        bossbullet.y = boss.y;

                        bossbulletList.push(bossbullet);
                        stage.addChild(bossbullet);
                        //let targetY = player.y;
                    }
                    for (let i = 0; i < bossbulletList.length; i++) {
                        bossbulletList[i].x -= Math.cos(angle) * speed;
                        bossbulletList[i].y -= Math.sin(angle) * speed;
                    }
                    for (let i = 0; i < bossbulletList.length; i++) {
                        let BBLocal = bossbulletList[i].localToLocal(0, 0, player);
                        if (player.hitTest(BBLocal.x, BBLocal.y)) {
                            console.log("boss bullet hit!");
                            GameOver();
                        }
                    }
                    let bossLocal = boss.localToLocal(0, 0, player);
                    if (player.hitTest(bossLocal.x, bossLocal.y)) {
                        console.log("boss hit!");
                        GameOver();
                    }


                }
                stage.update();
            }

            let bossLocal = boss.localToLocal(0,0,player);
            if(player.hitTest(bossLocal.x, bossLocal.y)) GameOver();
        }
        stage.update();
    }


