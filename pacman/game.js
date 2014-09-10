var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


canvas.width=800;
canvas.height=600;
canvas.left=0;
canvas.right=canvas.width;
canvas.top=0;
canvas.bottom=canvas.height;

var pacmanTiles = {
    loaded: false,
    image: new Image(),
    tileWidth: 64,
    tileHeight: 64
};
pacmanTiles.image.onload = function() {
   pacmanTiles.loaded = true;
}
pacmanTiles.image.src = 'pacman.png';	

var mySprite = {
    x: 200,
    y: 200,
    width: 64,
    height: 64,
    speed: 200,
    state: 0
};


var time=Date.now();

var keysDown={};


var wallWidth = 5;

var wall = new Array();

    // HINT20131223
wall[0] = {
  x:400,
  y:200,
  width:wallWidth,
  height:100,
　color:'#999'
}
  // HINT20131223
wall[1] = {
  x:300,
  y:200,
  width:wallWidth,
  height:100,
　color:'#999'
}
  // HINT20131223
wall[2] = {
  x:200,
  y:200,
  width:100,
  height:wallWidth,
　color:'#999'
}

wall[3] = {
  x:405,
  y:200,
  width:100,
  height:wallWidth,
　color:'#999'
}
var item = new Array();

var itemNum = 20;

function generateItems(n) {

  for (var i = 0; i < n; i++) {
      item[i] = {
      x:Math.random() * canvas.width,
      y:Math.random() * canvas.height,
      width:10,
      height:10,
      color:'#fff'
      }
  }
 
}

generateItems(itemNum);

/*
function wall(x,y,width,height,color){
  this.x = x;
  this.y = y;
  this.width=width;
  this.height=height;
  this.color=color;
}

var walls = new Array();

function buildWalls(wallNumber) {  
  ctx.fillStyle='#999';
  for (var i = 1; i <= wallNumber; i++){
    walls[i] = new wall(i*100,200,wallWidth,100,'#999');
    ctx.fillRect(walls[i].x,walls[i].y,walls[i].width,walls[i].height);
  }
}
*/

function mySpriteRight(){
    return mySprite.x + mySprite.width;
}

function mySpriteBotton(){
    return mySprite.y + mySprite.height;
}

function render(){
  ctx.fillStyle='#000';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if (pacmanTiles.loaded) {
    ctx.drawImage(
        pacmanTiles.image,
        mySprite.state * pacmanTiles.tileWidth,
        0, 
        mySprite.width,
        mySprite.height,
        Math.round(mySprite.x),
        Math.round(mySprite.y),
        mySprite.width,
        mySprite.height
    );
    }

   if (mySpriteRight() > canvas.right) {
    ctx.drawImage(
        pacmanTiles.image,
        mySprite.state * pacmanTiles.tileWidth,
        0, 
        mySprite.width,
        mySprite.height,
        Math.round(mySprite.x - canvas.width),
        Math.round(mySprite.y),
        mySprite.width,
        mySprite.height
    );
    }

  // Render the item
  for (var i = 0;i < itemNum;i++) {
      ctx.fillStyle=item[i].color;
      ctx.fillRect(item[i].x,item[i].y,item[i].width,item[i].height);
  }
  // Render the walls
  // HINT20131223
  for (var i=0; i < wall.length;i++) {
    ctx.fillStyle=wall[i].color;
    ctx.fillRect(wall[i].x,wall[i].y,wall[i].width,wall[i].height);
  }

  // Render the score
  ctx.font = '24pt Arial';
  ctx.fillStyle = '#f96';
  ctx.textBaseline = 'top';
  ctx.fillText(itemCounter + '項目', 10, 10);

}

var itemCounter = 0;


function update(mod){

  var collision = false;

  for (var i = 0; i < itemNum;i++) {
    // Check if the sprite is over the item.
    if (mySprite.x < item[i].x + item[i].width &&
        mySprite.x + mySprite.width > item[i].x &&
        mySprite.y < item[i].y + item[i].height &&
        mySprite.y + mySprite.height > item[i].y

        ) {
        // If sprite is over item, then move to random location and add 1 to itemCounter
        item[i].x = Math.random() * canvas.width;
        item[i].y = Math.random() * canvas.height;
        itemCounter ++; //itemCounter = itemCounter + 1;
    }
  }

  // Check if the sprite is about to collide with a wall.
  // HINT20131223
  
  for (var i = 0; i < wall.length; i++) {
    if (mySprite.x < wall[i].x + wall[i].width &&
        mySprite.x + mySprite.width > wall[i].x &&
        mySprite.y < wall[i].y + wall[i].height&&
        mySprite.y + mySprite.height > wall[i].y
        ) {
      // If sprite is over wall, then move to random location and add 1 to itemCounter
        collision = true;
      
    }
  }

  if (collision == false) {

  	if (37 in keysDown) {
      		mySprite.state = 2; //left
      		mySprite.x -= mySprite.speed * mod;
  	}
  	if (38 in keysDown) {
      		mySprite.state = 3; //up
      		mySprite.y -= mySprite.speed * mod;
  	}
  	if (39 in keysDown) {
      		mySprite.state = 0; //right
      		mySprite.x += mySprite.speed * mod;
  	}
  	if (40 in keysDown) {
      		mySprite.state = 1; //down
      		mySprite.y += mySprite.speed * mod;
  	}
   }
 
   if (collision == true) {
   	if (mySprite.state == 2) mySprite.x +=  mySprite.speed * mod;
  	if (mySprite.state == 3) mySprite.y +=  mySprite.speed * mod;
  	if (mySprite.state == 0) mySprite.x -=  mySprite.speed * mod;
  	if (mySprite.state == 1) mySprite.y -=  mySprite.speed * mod;
  	collision = false;
   }
  

  if(mySprite.x > canvas.right) {//sprite is on right edge
    mySprite.x -= canvas.width;
    //mySprite.x = mySprite.x - canvas.width;
  }

  if(mySprite.x < canvas.left) {//sprite is on left edge
    mySprite.x += canvas.width;
  }

  if(mySprite.y > canvas.bottom) {//sprite is on top edge
    mySprite.y -= canvas.height;
  }

  if(mySprite.y < canvas.top) {//sprite is on botton edge
    mySprite.y += canvas.height;
  }


}

window.addEventListener('keydown',function(e){
  keysDown[e.keyCode]=true;
  e.preventDefault();
});

window.addEventListener('keyup',function(e){
  delete keysDown[e.keyCode];
  		
});


function run(){

   update((Date.now() - time)/1000);
   render();
   time=Date.now();
}


setInterval(run,10);

for (n = 1; n <= 20; n++) {
  document.writeln('<br />');
  document.writeln( n);
}

