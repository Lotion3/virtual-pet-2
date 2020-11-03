//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImage,happyDogImage,fedTime,lastFed,feed,feedDog,addFoods,object
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(700, 700);
  database=firebase.database();
  dog=createSprite(250,350,10,10)
  dog.addImage(dogImage)
  dog.scale=0.3
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
  feed=createButton("Feed the dog")
  feed.position(700,120)
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food")
  addFood.position(800,120);
  addFood.mousePressed(addFoods)
  object=new Food
}


function draw() {  
  background(46,139,87)
  drawSprites();
  textSize(20)
  fill("white")
  stroke(strokeWeight=0.1)
  text("Press up arrow to feed Timmy",120,50)
  text("Food Remaining : "+foodS,150,100)
  //add styles here
  //if(keyWentDown(UP_ARROW)){
    //writeStock(foodS);
    //dog.addImage(happyDogImage)
    //if(foodS>0){
    //foodS=foodS-1
   // }else{
    //  foodS=foodS
    //  dog.addImage(dogImage)
   // }
 // }
  object.display()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();

    fill(255,255,254)
    textSize(15)
    if(lastFed>=12){
      text("Last Fed "+ lastFed%12 +" P.M.", 350,30)
    }else if(lastFed==0){
      text("Last Fed 12 A.M.",350,30)
    }else{
      text("Last Fed "+lastFed+" A.M.",350,30)
    }
  })
}

function addFoods(){
  dog.addImage(dogImage);
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImage);
  object.updateFoodStock(object.getFoodStock()-1)
  foodS=foodS-1
  database.ref('/').update({
    Food:object.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
