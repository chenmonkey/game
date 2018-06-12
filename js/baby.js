var babyObj=function()
{
	this.x;
	this.y;
	this.angle;
	
	this.babyBody=new Image();
	
	this.babyTailTimer=0;//（小鱼尾巴）计时器
	this.babyTailCount=0;//（小鱼尾巴）记录当前图片序号的变量
	
	this.babyEyeTimer=0;//（小鱼眼睛）计时器
	this.babyEyeCount=0;//（小鱼眼睛）记录当前图片序号的变量
	this.babyEyeInterval=1000;//（小鱼眼睛）当前这张图片持续多长时间
	
	this.babyBodyTimer=0;//（小鱼身体）计时器
	this.babyBodyCount=0;//（小鱼身体）记录当前图片序号的变量
}
babyObj.prototype.init=function()
{
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	this.babyBody.src="img/babyFade0.png";
}
babyObj.prototype.draw=function()
{
	//lerp x,y
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	
	//delta angle
	//Math.atan2(y,x)
	var deltaY=mom.y-this.y;//小鱼跟大鱼的坐标差
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//大鱼和鼠标之间的角度差,取值在-pi，pi
	
	//小鱼的角度不断趋向大鱼的角度，lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);
	
	//baby tail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50)
	{
		this.babyTailCount=(this.babyTailCount+1)%8;//0到7之间的循环
		this.babyTailTimer%=50;//计时器复原
	}
	
	//baby eye count
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval)
	{
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
		
		if(this.babyEyeCount==0)//如果小鱼睁着眼睛
		{
			this.babyEyeInterval=Math.random()*1500+2000;//睁眼睛时间为1500到3500毫秒之间
		}else
		{
			this.babyEyeInterval=200;//眯眼睛时间为200毫秒
		}
	}

    //baby body count
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300)
    {
    	this.babyBodyCount=this.babyBodyCount+1;
    	this.babyBodyTimer%=300;
    	if(this.babyBodyCount>19)
    	{
    		this.babyBodyCount=19;//当小鱼身体完全变白后，游戏结束
    	    data.gameOver=true;//游戏结束
    	}
    }
    
		
	//ctx1
	ctx1.save();
	//translate
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);
	
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	
    var babyEyeCount=this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();
}
