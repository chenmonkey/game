var dustObj=function()
{
	this.x=[];
	this.y=[];
	this.amp=[];//振幅
	this.NO=[];//dust使用那张图片
	this.alpha;//摆动角度
}
dustObj.prototype.num=30;
dustObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=20+Math.random()*25;
		this.NO[i]=Math.floor(Math.random()*7);//取值[0,7)
	}
	this.alpha=0;//与海葵保持一致
}
dustObj.prototype.draw=function()
{
	this.alpha+=deltaTime*0.001;
	var l=Math.sin(this.alpha);//取值在-1到1之间
	for(var i=0;i<this.num;i++)
	{
		var no=this.NO[i];
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
		
	}
}
