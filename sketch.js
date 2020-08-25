//Create variables here
var dog, happyDog, database, foodStock;
var happyDogImg,dogImg;
var foodS=0;


function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,14);
  dog.addImage("image1",happyDogImg);
  dog.scale = 0.5;
  dog.addImage("dog1",dogImg);

  database = firebase.database();

  foodStock = database.ref("/food/milk");
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46, 139, 87);
  if(keyWentDown(UP_ARROW) && foodStock>0){
   dog.changeImage("dog1");
    writeStocks(foodS);
  }
  if(keyWentUp(UP_ARROW) && foodStock<0){
  dog.changeImage("image1");
  }
  
  drawSprites();
  //add styles here

 textSize(26);
 fill("red");
  text("Press UP_ARROW to feed Drago with milk ",0,50);
  text("food remaining = "+foodS,100,450);

}

function readStock(data){
     foodS = data.val();
     console.log(foodS);
}
function writeStocks(x){
     if(x>0){
       x=x-1
     }else{
       x=0
     }
    database.ref('food').update({
      milk:x
    })

}



