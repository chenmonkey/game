//判断大鱼跟每一个果实的距离
function momFruitCollision()
{
  if(!data.gameOver)
  {
    for(var i=0;i<fruit.num;i++)
    {
   	   if(fruit.alive[i])
   	  {
   		//calculate length
   		var l=calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
   		if(l<900&&fruit.l[i]>=14)//果实成熟
   		{
   			//fruit eaten
   			fruit.dead(i);
   			data.fruitNum++;
   			mom.bigBodyCount++;//大鱼身体变化计数
 
   			if(mom.bigBodyCount>7)
   			{
   				mom.bigBodyCount=7;
   			}
   			
   			if(fruit.fruitType[i]=="blue")
   			{   				
   				data.double=2;  				
   			}
   			wave.born(fruit.x[i],fruit.y[i]);
   		}
   	 }	   		
    }
  }
}

//判断大鱼和小鱼的距离
function momBabyCollision()
{
	if(data.fruitNum>0 && !data.gameOver)
	{
	   var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	   if(l<900)
	   {
		   //小鱼恢复满血状态
	       baby.babyBodyCount=0;
	       //大鱼自身吃到的果实数量归零
	       mom.bigBodyCount=0;
	       //分值更新
	       data.addScore();
	       halo.born(baby.x,baby.y);
	   }
	   
	}
}
