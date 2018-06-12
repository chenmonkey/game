var fruitObj=function(){
	  this.alive=[];//bool型,是否活着
	  this.x=[];
	  this.y=[];
	  this.aneNO=[];//记录当前对应的海葵的id号
	  this.l=[];//果实尺寸
	  this.spd=[];//速度（成长速度、向上漂浮速度）
	  this.fruitType=[];//果实类型
	  this.orange=new Image();//橙色果实
	  this.blue=new Image();//蓝色果实
}
fruitObj.prototype.num=30;//定义果实的数量
fruitObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;//所有果实都活着
		this.x[i]=0;
		this.y[i]=0;
		this.aneNO[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.002]
		this.fruitType[i]="";
		this.born(i);//初始化时所有果实出生
		
	}
	this.orange.src="img/fruit.png";
	this.blue.src="img/blue.png";
}
fruitObj.prototype.draw=function()
{
	for(var i=0;i<this.num;i++)
	{
		//draw
		//find an ane,grow,fly up
		//drawImage从(0,0)开始画
		
		if(this.alive[i]==true)
		{
			     if(this.fruitType[i]=="blue")
		       {
			       var pic=this.blue;
		       }
		       else
		       {
		   	     var pic=this.orange;
		        }
		       if(this.l[i]<=14){
		       	var NO=this.aneNO[i];
		       	this.x[i]=ane.headx[NO];
		       	this.y[i]=ane.heady[NO];
		        this.l[i]+=this.spd[i]*deltaTime;//果实增长（随时间逐渐增长）
		        ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		       }else
		      {
			      this.y[i]-=this.spd[i]*7*deltaTime;//果实向上漂浮
		       }
		       ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
	         if(this.y[i]<10)
	         {
	 	         this.alive[i]=false;
	         }
	 }
	}
}
fruitObj.prototype.born=function(i)//果实生长
{
	var aneID=Math.floor(Math.random()*ane.num);//海葵的坐标(在所有海葵中随机找一个)
	//找到一个位置让果实出生
	this.aneNO[i]=aneID;
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.2)//随机确定果实的属性（橙色或蓝色）
	{
	this.fruitType[i]="blue"; //orange,blue
}
	else
	{
		this.fruitType[i]="orange";
	}
}
fruitObj.prototype.dead=function(i)
{
	this.alive[i]=false;
}
function fruitMonitor()//监视果实的状态
{
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{
		 if(fruit.alive[i])
		    num++;
	}
	if(num<15)
	 {
	 	  sendFruit();
	   //send fruit
	   	 return;
	   	
	 }
}
function sendFruit()//判断哪些果实处于闲置状态，哪些果实活着
{
	for(var i=0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}
//fruitObj.prototype.update=function()
//{
//	var num=0;
//	for(var i=0;i<this.num;i++)
//	{
//		if(this.alive=[i])//如果果实为活跃状态
//		  num++;
//	} 
//}
