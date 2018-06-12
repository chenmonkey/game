//海葵对象的类
var aneObj=function()
{
	//有很多海葵
	//起始点，控制点，结束点(sin)
	this.rootx=[];//起始点的x坐标,y坐标不需要设，即画布底部
	this.headx=[];//结束点的x坐标
	this.heady=[];//结束点的y坐标
	this.amp=[];//海葵摆动的幅度
	this.alpha=0;//正弦函数的角度
	
}
aneObj.prototype.num=50;//设置海葵数量为50
//确定海葵的初始位置
aneObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;//radom()返回[0,1)，隔一段距离随机长一株海葵
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+60;
	}
}

//绘制海葵
aneObj.prototype.draw=function()
{
	this.alpha+=deltaTime*0.001;
	var l=Math.sin(this.alpha);//取值在-1到1之间
	//for只在save和restore这两个API之间起作用
	 ctx2.save();
	 ctx2.globalAlpha = 0.6;//透明度
	 ctx2.lineWidth=20;
	 ctx2.lineCap="round";//线段结束的样式
	 ctx2.strokeStyle="#3b154e";//定义在stroke之前
	for(var i=0;i<this.num;i++){
		ctx2.beginPath();
		//二次贝塞尔曲线
		ctx2.moveTo(this.rootx[i],canHeight);//起始点
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);//控制点和结束点
		
		ctx2.stroke();//刷样式
	}
	ctx2.restore();
}
