//大鱼
var momObj=function()
{
this.x;//大鱼的坐标
this.y;
this.angle;//大鱼的角度


this.bigTailTimer=0;//（大鱼尾巴）计时器
this.bigTailCount=0;//（大鱼尾巴）记录当前图片序号的变量

this.bigEyeTimer=0;//（大鱼眼睛）计时器
this.bigEyeCount=0;//（大鱼眼睛）记录当前图片序号的变量
this.bigEyeInterval=1000;//（大鱼眼睛）当前这张图片持续多长时间

this.bigBodyCount=0;//（大鱼身体）记录当前图片序号的变量

}

momObj.prototype={
	init:function(){
		this.x=canWidth*0.5;
	    this.y=canHeight*0.5;
	    this.angle=0;

	},
	draw:function(){
		//大鱼随鼠标移动，lerp x,y(lerp使得一个值趋向一个目标值)
		this.x=lerpDistance(mx, this.x, 0.98);
		this.y=lerpDistance(my, this.y, 0.98);
		
		//delta angle
		//Math.atan2(y,x)
		var deltaY=my-this.y;//大鱼跟鼠标的坐标差
		var deltaX=mx-this.x;
		var beta=Math.atan2(deltaY,deltaX)+Math.PI;//大鱼和鼠标之间的角度差,取值在-pi，pi
		
		//大鱼的角度不断趋向鼠标的角度，lerp angle
		this.angle=lerpAngle(beta,this.angle,0.6);
		
		//大鱼尾巴变化计数
		this.bigTailTimer+=deltaTime;
		if(this.bigTailTimer>50)
		{
			this.bigTailCount=(this.bigTailCount+1)%7;
			this.bigTailTimer%=50;
		}
		
		//大鱼眼睛变化计数
		this.bigEyeTimer+=deltaTime;
		if(this.bigEyeTimer>this.bigEyeInterval)
		{
			this.bigEyeCount=(this.bigEyeCount+1)%2;
			this.bigEyeTimer%=this.bigEyeInterval;
			
			if(this.bigEyeCount==0)
			{
				this.bigEyeInterval=Math.random()*1500+2000;
			}else
			{
				this.bigEyeInterval=200;
			}
		}
		
		ctx1.save();
	    ctx1.translate(this.x,this.y);//canvas1在画布上的原点坐标本来为（0,0），现在在偏移后的新原点为（x,y），即画布从此处开始画
	    ctx1.rotate(this.angle);
	    	    
	    var bigBodyCount=this.bigBodyCount;
	    if(data.double==1)//吃到的果实为橘色
        {
	    	ctx1.drawImage(bigBodyOrg[bigBodyCount],-bigBodyOrg[bigBodyCount].width*0.5,-bigBodyOrg[bigBodyCount].height*0.5);
	    }else{
	    	ctx1.drawImage(bigBodyBlu[bigBodyCount],-bigBodyBlu[bigBodyCount].width*0.5,-bigBodyBlu[bigBodyCount].height*0.5);
	    }
	    
	    var bigEyeCount=this.bigEyeCount;
	    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);
	    
	    var bigTailCount=this.bigTailCount;
	    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);
	    ctx1.restore();
	}
};
//momObj.prototype.init=function()
//{
//	this.x=canWidth*0.5;
//	this.y=canHeight*0.5;
//	this.bigEye.src="img/bigEye0.png";
//	this.bigBody.src="img/bigSwim0.png";
//	this.bigTail.src="img/bigTail0.png";
//
//}
//
//momObj.prototype.draw=function()
//{
//	ctx1.save();
//	ctx1.translate(this.x,this.y);//canvas1在画布上的原点坐标本来为（0,0），现在在偏移后的新原点为（x,y），即画布从此处开始画
//	ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
//	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
//	ctx1.drawImage(this.bigTail,-this.bigTail.width*0.5+30,-this.bigTail.height*0.5);
//	ctx1.restore();
//}