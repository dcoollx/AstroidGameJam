const canvas = document.getElementById('game');
const pen = canvas.getContext('2d');
const gameOptions = {
    height: 600,
    width: 800,
    maxSpeed: 50
}
console.log('setting up canvas')
canvas.height = gameOptions.height;
canvas.width = gameOptions.width;
document.body.style.backgroundImage = 'url(./assets/background.jpg)'
const gameObjects = [];


class dynamicObject{
    constructor(x=0, y=0, vx = 0, vy=0){
        this.maxSpeed = gameOptions.maxSpeed
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.vx = vx;
        gameObjects.push(this)
    }
    setMaxSpeed(newSpeed){
        this.maxSpeed = newSpeed
    }
    isOffScreen(){
        return this.x > gameOptions.width || this.x < 0 || this.y > gameOptions.height || this.y < 0
    }
    update(){
        // if(Math.abs(this.vx) > this.maxSpeed)
        //     this.vx
        this.x += this.vx;
        this.y += this.vy;
    }
    setSprite(sprite){
        this.sprite = sprite
    }
    draw(){
        if(!this.sprite){
            console.log('no sprite set')
            return;
        }
        pen.drawImage(this.sprite, this.x, this.y)

    }
    destroy(){
        delete this
    }
}
class ship extends dynamicObject{
    constructor(x=0, y=0, vx = 0, vy=0){
        super(x,y,vx,vy);
        this.rotation = 0;
        this.rv = 0
        console.log('player ready')
        window.addEventListener('keydown',(e)=>{
            if(e.code === 'a')
                this.rv += -10
            else if(e.code === 'd')
                this.rv += 10
            if(e.code === 'w'){
                //move foward relative to rotation
            }else if( e.code ==='d'){
                //move backwards
            }
            if(e.code === 'space'){
                this.fire();
            }
        });
    }
    fire(){
        console.log('pew');
    }
    draw(){
        pen.drawImage(this.sprite, this.x, this.y, gameOptions.width/10, gameOptions.height/10)
    }

}
class astroid extends dynamicObject{
    constructor(x=0, y=0, vx = 0, vy=0){
        super(x,y,vx,vy);
        this.Size = Math.floor(Math.random() * 10)
    }
    draw(){
        pen.drawImage(this.sprite, this.x, this.y, 100,100)
    }

    hit(){
        if(this.Size <= 1){
            return this.destroy();
        }
    }

}

function load(img){
    const sprite = document.createElement('img');
    sprite.src = img;
    return sprite;

}

function setup(numberOfAstroids = 5){
    const player = new ship(gameOptions.width/2, gameOptions.height/2);
    console.log('player', player)
    player.setSprite(load('./assets/spaceship.svg'))
    const astroidSprite = load('./assets/astroid512x711.png')
    for(let x = 0; x<= numberOfAstroids; x++){
        // gen random numbers
        let A = new astroid();
        A.setSprite(astroidSprite)
        A.x = Math.random() * gameOptions.width
        A.y = Math.random() * gameOptions.height
        A.vx = A.vy = Math.random()         
    }
}

function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(obj=>{
        obj.update();
        obj.draw();
    })


    
}

console.log('starting game')
console.time('first frame')
setup();
const continueGame = setInterval(game, 30/6000)