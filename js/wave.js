//大鱼吃果实所产生的白色的圈
var waveObj=function()
{
	this.x=[];
	this.y=[];
	this.alive=[];//wave是否活着
	this.r=[];//半径
	
}
waveObj.prototype.num=10;
waveObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;//wave初始状态是死的，是可以使用的
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function()
{
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	for(var i=0;i<this.num;i++)
	{
		if(this.alive[i])//活着的wave才需要绘制
		{
			//draw
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>50)
			{
				this.alive[i]=false;
				break;//跳出本次循环
			}
			    
			var alpha=1-this.r[i]/50;//取值在1到0之间
			
			//绘制圆圈API
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);//绘制圆圈
		    ctx1.closePath();
		    ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
		    ctx1.stroke();
		    
		  
		}
	}
	ctx1.restore();
}
waveObj.prototype.born=function(x,y)
{
	for(var i=0;i<this.num;i++)
	{
		//born(大鱼和果实碰撞的时候)
		if(!this.alive[i])
		{
		this.alive[i]=true;
		this.r[i]=10;
		this.x[i]=x;
		this.y[i]=y;
	    return;//吃到一个果实，只产生一个wave
	   }
	}
}
