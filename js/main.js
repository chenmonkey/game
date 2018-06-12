//画布
var can1;
var can2;

//画布的画笔
var ctx1;
var ctx2;

//画布的宽高度
var canWidth;
var canHeight;

var lastTime;//上一帧被执行时间
var deltaTime;//两帧间隔时间差

var bgPic=new Image();//定义一张背景图片

var ane;//海葵

var fruit;//果实

var mom;//大鱼

//鼠标的位置
var mx;
var my;

var baby;//小鱼

var babyTail=[];//小鱼尾巴
var babyEye=[];//小鱼眼睛
var babyBody=[];//小鱼身体

var bigTail=[];//大鱼尾巴
var bigEye=[];//大鱼眼睛
var bigBodyOrg=[];//大鱼身体为橘色
var bigBodyBlu=[];//大鱼身体为蓝色
var bigMouthOrg=[];//大鱼嘴巴张开并且身体为橘色
var bigMouthBlu=[];//大鱼嘴巴张开并且身体为蓝色
	

var data;//分值计算

var wave;//大鱼吃到果实所产生的白色的圈

var halo;//大鱼喂小鱼所产生的橘色的圈

var dust;//漂浮物
var dustPic=[];//漂浮物图片

window.onload=game;
function game()
{
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}


function init()
{
	//获得canvas context	
	can1=document.getElementById('canvas1');//fishes,dust,UI,wave
	ctx1=can1.getContext('2d');
	can2=document.getElementById('canvas2');//background,ane,fruits
	ctx2=can2.getContext('2d');
	
	can1.addEventListener('mousemove',onMouseMove,false)//canvas1上添加检测鼠标的事件,获得鼠标移动时的坐标值
	
	bgPic.src="img/background.jpg";
	
	canWidth=can1.width;//画布的宽度
	canHeight=can1.height;
	
	ane=new aneObj();//海葵的类的对象
	ane.init();
	
	fruit=new fruitObj();//果实的类的对象
	fruit.init();
	
	mom=new momObj();//大鱼的类的对象
	mom.init();
	
	mx=canWidth*0.5;
	my=canHeight*0.5;
	
	baby=new babyObj();
	baby.init();
	
	
	
	//小鱼尾巴摆动
	for(var i=0;i<8;i++)
	{
		babyTail[i]=new Image();
		babyTail[i].src="img/babyTail"+i+".png";
	}
	
	//小鱼眨眼睛
	for(var i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src="img/babyEye"+i+".png";
	}
	
	//小鱼身体变白
	for(var i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src="img/babyFade"+i+".png";
	}


    //大鱼摇尾巴
    for(var i=0;i<8;i++)
    {
	   bigTail[i]=new Image();
	   bigTail[i].src="img/bigTail"+i+".png";
    }

    //大鱼眨眼睛
    for(var i=0;i<2;i++)
    {
    	bigEye[i]=new Image();
    	bigEye[i].src="img/bigEye"+i+".png";
    }
    
    data=new dataObj();
    
    //大鱼身体变化
    for(var i=0;i<8;i++)
    {
    	bigBodyOrg[i]=new Image();
    	bigBodyBlu[i]=new Image();
        bigBodyOrg[i].src="img/bigSwim"+i+".png";
        bigBodyBlu[i].src="img/bigSwimBlue"+i+".png";
    }
    
    //大鱼嘴巴变化
    for(var i=0;i<8;i++)
    {
    	bigMouthOrg[i]=new Image();
    	bigMouthBlu[i]=new Image();
        bigMouthOrg[i].src="img/bigEat"+i+".png";
        bigMouthBlu[i].src="img/bigEatBlue"+i+".png";
    }
       
    
    ctx1.font="40px Times New Roman";
	ctx1.textAlign="center";
	
	wave=new waveObj();
	wave.init();
	
	halo=new haloObj();
	halo.init();
	
	//漂浮物
	for(var i=0;i<7;i++)
	{
		dustPic[i]=new Image();
		dustPic[i].src="img/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();

}

//游戏循环
function gameloop()
{
	window.requestAnimationFrame(gameloop);//当前绘制完成之后，会根据机器的性能来决定间隔多长时间来绘制下一帧
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40)//避免在浏览器中，切换页面后，一段时间后，果实变得特别大
	  deltaTime=40;
	
	drawBackground();
	
    ane.draw();
   
    fruitMonitor();
    fruit.draw();

    
    ctx1.clearRect(0,0,canWidth,canHeight);//canvas1是部分透明的，覆盖在canvas2上，绘制新的之前把前一帧的内容清空，从（0,0）到canvas的对角线清除掉，在干净的画布上绘制
    mom.draw();
    
    momFruitCollision();
    momBabyCollision();
    
    baby.draw();
    
    data.draw();
    
    wave.draw();
    
    halo.draw();
    
    dust.draw();
 

}

//鼠标移动
function onMouseMove(e)
{
	//offSetX：鼠标指针位置相对于触发事件的对象的X坐标，以元素盒子模型的内容区域的左上角为参考点，如果有border，可能出现负值
	//layerX:鼠标相对于当前坐标系的X坐标，即如果触发元素没有设置绝对定位或相对定位，以页面为参考点；如果有，将改变参考系坐标，从触发元素盒子模型的border区域的左上角为参考点
	//当触发元素设置1了绝对定位或者相对定位后，offSetX和layerX几乎相等，唯一不同的是，一个从border为参考点，一个以内容为参考点
	if(!data.gameOver){//只有当gameOver是false状态下，玩家才能控制鼠标
	  if(e.offSetX||e.layerX)
	  {
		mx=e.offSetX==undefined?e.layerX:e.offSetX;
		my=e.offSetY==undefined?e.layerY:e.offSetY;
	
	  }
	}
}
