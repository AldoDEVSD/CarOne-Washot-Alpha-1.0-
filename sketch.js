var car, carImg, carObstaculoGROUP, CarCrashedObtacle, CarroDescompuesto;
var carriles,backgroundImg,gameOver,gameOverIMG, FondoScoreImg, FondoScore, RestartImg, Restart, RestartPressedImg;
var randomX;
var score = 0;

var gameState = "PLAY";
//var borde1,borde2;

function preload(){
    carImg = loadImage("Car.png");
    backgroundImg = loadImage("Backgrond.png");
    CarCrashedObtacle = loadImage("Car_CrashedObstacle.png");
    CarroDescompuesto = loadImage("CarOFF.png");
    gameOverIMG = loadImage("gameOver.png");
    FondoScoreImg = loadImage("FondoPuntuacion.png");
    RestartImg = loadImage("RestartButton.png");
   // RestartPressedImg = loadAnimation("restartButtonPressed.png")
}

function setup(){
    createCanvas(400,400);

    carriles = createSprite(200, 200, 400, 400);
    carriles.addImage(backgroundImg);

    car = createSprite(200,350,50,50);
    car.addImage(carImg);
    car.scale = 5;

    gameOver = createSprite(200,150,50,50);
    gameOver.addImage(gameOverIMG);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    Restart = createSprite(200,190,50,50)
    Restart.addImage(RestartImg)
    Restart.scale = 0.1;
    Restart.visible = false;
    car.setCollider("circle",0,0,5);
    car.debug = true;

    //borde1 = createSprite(40,200,2,400);
    //borde1.visible = false

    randomX = Math.round(random(1,400)) + car.position.x - 100
    carObstaculoGROUP = createGroup();
}

function draw(){
    background(1);

    if(carriles.y > 280){
        carriles.y = 200
        }
    if(gameState == "PLAY"){ 
        if(World.frameCount %1 == 0){
            score = score+ 1
        }
        if(score>0 && score%100 === 0){
            if(World.frameCount %50 == 0){
                createCar(randomX);
                randomX = Math.round(random(1,400))
            }
         }
        textSize(10);
        carriles.velocityY = 8;
        text("Puntuacion:"+ score, 30, 100);

       // FondoScore = createSprite(80,100);
//        FondoScore.addImage(FondoScoreImg);
  //      FondoScore.scale = 0.2;
        
        car.position.x = mouseX;
        if(car.isTouching(carObstaculoGROUP)){
            gameState = "END";
        }
    if(score >=0 && score < 100){
        if(World.frameCount %100 == 0){
            createCar(randomX);
            randomX = Math.round(random(1,400))
        }
    }
 }
    drawSprites();

    if(gameState == "END"){
        carriles.velocityY = 0;
        gameOver.visible = true;
        carObstaculoGROUP.setVelocityYEach(0);
        text("Puntuacion:"+ score, 200, 120);
        Restart.visible = true;
        if(mousePressedOver(Restart)){
            reset();
            Restart.changeAnimation("Presionado", RestartPressedImg);
        }
    }
}

function createCar(x){

        var carObstaculo;
        carObstaculo = createSprite(x,-50,50,50);

        var ImagesRandom = Math.round(random(1,3))
        switch(ImagesRandom) {
            case 1: carObstaculo.addImage(CarCrashedObtacle)
                    carObstaculo.setCollider("circle",0,0,10)
                break;
            
            case 2: carObstaculo.addImage(carImg)
                break;
            
            case 3: carObstaculo.addImage(CarroDescompuesto)
                break;

            default: break;
        }
        carObstaculo.scale = 5;
        carObstaculoGROUP.setVelocityYEach(Math.round(random(1,20)))
        carObstaculoGROUP.add(carObstaculo)

        carObstaculo.debug=true;
        carObstaculo.setCollider("circle",0,0,5);

    }


    function reset(){
        gameState = "PLAY";

        score = 0;

        carObstaculoGROUP.destroyEach();

        gameOver.visible = false;
        Restart.visible = false;
    }
