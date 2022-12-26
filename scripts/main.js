const canvas = document.getElementById('game');
const pen = canvas.getContext('2d');
const gameOptions = {
    height: 600,
    width: 800
}
console.log('setting up canvas')
canvas.height = gameOptions.height;
canvas.width = gameOptions.width;
canvas.style.backgroundImage = 'url(./assets/background.jpg)'
const gameObjects = [];

class dynamicObject{
    constructor(x=0, y=0, vx = 0, vy=0){
        this.x = 0;
        this.y = 0;
        this.vy = vy;
        this.vx = vx;
        gameObjects.push(this)
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
    constructor(x,){
        this.super();
    }

}
class astroid extends dynamicObject{
    constructor(){
        this.super();
        this.Size = Math.floor(Math.random() * 10)
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
    player.setSprite(load('./assets/ship.png'))
    for(let x = 0; x<= numberOfAstroids; x++){
        // gen random numbers
        new astroid();
    }
}

function game(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(obj=>{
        obj.draw();
    })

    requestAnimationFrame(game)
}

