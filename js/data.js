//游戏分值计算
var dataObj=function()
{
	this.fruitNum=0;//大鱼吃果实数量
	this.double=1;//是否吃到蓝色果实(吃一个蓝色果实分值增倍)
	this.score=0;//分值
	this.gameOver=false;//游戏的初始状态
	this.alpha=0;//字体透明度
}

//在画布1上画出：大鱼吃果实数量（未喂小鱼之前），大鱼游戏分值
dataObj.prototype.draw=function()
{
  ctx1.save();
	ctx1.shadowBlur=10;//设置阴影
	ctx1.shadowColor="#fff";
	ctx1.fillStyle="white";
    ctx1.fillText("score:"+this.score,canWidth*0.5,canHeight-20);

    if(this.gameOver)//游戏结束，屏幕上出现GMAEOVER
    {
    	this.alpha+=deltaTime*0.0005;
    	if(this.alpha>1)
    	   this.alpha=1;
    	ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";//设置字体颜色及透明度
    	ctx1.fillText("game over",canWidth*0.5,canHeight*0.5);
    }
   ctx1.restore();
}
dataObj.prototype.addScore=function()
{
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}
