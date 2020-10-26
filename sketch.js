//Create variables here
var dog, happyDog, database, FoodS, foodStock;
var dogImg, happydogImg;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj, addFoods;

function preload()
{
  //load images here
   dogImg= loadImage("images/dogImg.png");
   happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database()

  createCanvas(500, 500);
  
  dog = createSprite(250,400,20,20);
  dog.scale = 0.2;
  dog.addImage(dogImg);
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  foodObject = new Food();
  feedButton = createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addFoodButton=createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);
   
  foodObject.display();
  drawSprites();
  fill("red");
  text("food remaining = " + FoodS,50,50);
  text("to feed the dog, press up arrow",130,300);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){

   lastFed= data.val();
  
  });

 fill(255,255,254);
 textSize(15);
 if(lastfed>=12){
   text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
 }
 else if(lastFed==0){
   text("Last Feed : 12 AM", 350,30);
 }
 else{
   text("Last Feed :"+ lastFed + "AM", 350,30);
 }
}


function readStock(data){

FoodS = data.val();


}

function feedDog(){
  dog.addImage(happydogImg);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({

  food: foodObj.getFoodStock(),
  FeedTime:hour()
  })
}

function addFood(){

  foodS++ ;

  database.ref('/').update({

     food: foodS
    
  });


}