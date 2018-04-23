
window.onload = function () {

  var snd = new Audio("click.wav");

  var canvas = document.getElementById("myCanvas");    // Reference the canvas from our html
  var context = canvas.getContext("2d");               // Obtain the "painting" object and all its abilities

  var xcoordRed = 20;     // red square          coords initialized
  var ycoordRed = 20;     // red square

  var widthRed = 50;      // Used to draw but also for collision checking on both squares
  var heightRed = 50;    
                               
  var nModRedX = 10;           //    THE SQUARES
  var nModRedY = 10;           //    & INCREMENTING

  var left = false;            // Set  
  var right = false;           // keys
  var up = false;              // to false
  var down = false;            // initially

  var hp = 100;

  var gravity = 0.2;
  var friction = 0.8;
  //var im  = document.getElementById("ty" );
  var pee = document.getElementById("pee");

  var width = 1200;
  var height = 600;

  var p = {
    x : width/2,
    y : 400,
    width : 30,
    height : 50,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    }
  

  var e = new enemy(30, 30, "p.gif", p.x, p.y, "image");
 // var ob = new obstacle(50, 50, red, 550, 550)

  //_______________________C o n t r o l s______________________________________

  window.addEventListener('keyup', function (key) {            //   IS
                                                               //   KEY
    if (key.which == 37) { left = false; }                     //   UP
    if (key.which == 39) { right = false; }                    //   ?
    if (key.which == 38 || key.which == 32) { up = false; }
    if (key.which == 40) { down = false; }
  });

  window.addEventListener('keydown', function (key) {          //   IS
                                                               //   KEY
    if (key.which == 37) { left = true; }                      //   PRESSED
    if (key.which == 39) { right = true; }                     //   ?
    if (key.which == 38 || key.which == 32) { up = true; }
    if (key.which == 40) { down = true; }
  });

  //_______________________F u n c t i o n s____________________________________

  function enemy(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
      context.drawImage(this.image, p.x, p.y);
    }
  }

  function obstacle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
      context.fillStyle = color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  // function animateRed() {
  //   xcoordRed += nModRedX;        //  Moves the red square by 10 horizontally
  //   ycoordRed += nModRedY;        //  Moves the red square by 10 vertically 

  //   if (xcoordRed > 790) {        //  right wall reverse increment indefinitely
  //     nModRedX = -10;
  //   }
  //   if (xcoordRed < 0) {          //  left wall reverse increment indefinitely
  //     nModRedX = 10;
  //   }
  //   if (ycoordRed > 370) {        //  floor reverse increment indefinitely
  //     nModRedY = -10;
  //   }
  //   if (ycoordRed < 0) {          //  ceiling reverse increment indefinitely
  //     nModRedY = 10;
  //   }
  //   checkCollision();
  // }

  // function checkCollision() {
  //   //V green   //V red    //V lookLikeTheyAreTouching//
  //   if (xcoord > (xcoordRed - widthRed) &&
  //     xcoord < (xcoordRed + widthRed) &&
  //     ycoord > (ycoordRed - heightRed) &&
  //     ycoord < (ycoordRed + heightRed)) {
  //     snd.play();

  //     hp -= 3;

  //     return true;

  //   }
  //   else { return false }
  // }

  //______________________G a m e   l o o p_____________________________________

  function draw() {           // Entry point // Draws the game as you press keys
    setTimeout(function () {

console.log(p.x, p.y);

      if (left) {
//        p.image.src = "runleft.png";
        p.velX --;
        if (p.x < 0) { p.x = 0; }
      }

      if (up) {
//        p.image.src = "jump.png";
      if(!p.jumping) {
        p.jumping = true;
        p.velY = -5;
        if (p.y < 0 ) { p.y = 0; }
      }

      }
      if (right) {
//        p.image.src = "ty.png";
        p.velX ++;
        if (p.x > 1195) { p.x = 1195; }
      }

       if (down) {
//         p.image.src = "land.png";
         p.y  ++;
         if (p.y > 500) { p.y = 500; }
       }



      p.velX *= friction;
   
      p.velY += gravity;
    
      p.x += p.velX;
      p.y += p.velY;
      


      if (p.x >= width-p.width) {
          p.x = width-p.width;
      } else if (p.x <= 0) {
          p.x = 0;
      }
    
      if (p.y >= height - p.height) {
          p.y = height - p.height;
          p.jumping = false;
      }

      // if (p.y = 550) {
      //   p.y = 550;
      // }


      //IF DEAD, GAME OVER
      if (hp < 100) { document.getElementById('doo').style.color = 'red';}
      if (hp <= 0 ) {document.location.reload();}

   //   if (p.crashWith(myObstacle)) {
 //         hp -= 50;
  //    }

      requestAnimationFrame(draw);
      context.clearRect(0, 0, canvas.width, canvas.height);     // clear paint
    //  context.fillRect(xcoordRed, ycoordRed, widthRed, heightRed);
      //      context.fillRect(xcoord, ycoord, 50, 50);        //  green square drawn
            context.fillStyle = "Red";
      //      context.fillRect(xcoord + 30, ycoord + 30, 25, 25);
      //      context.drawImage(im, xcoord, ycoord);
      context.font = "30px Arial";
      context.fillText(hp, 10, 50);
      e.update();
   //   obj.update();
  //    animateRed();
   //   context.fillRect(p.x, p.y, 50, 50);        //  green square drawn
      context.fillRect(600, 575, 100, 5);      
      context.stroke;                                            // paint


    }, 1000 / 60);
  }

  draw();
}