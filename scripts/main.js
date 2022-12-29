const maxspeed = 200
const level = 10

function randomSpeed(){
    return Phaser.Math.RND.between(-maxspeed, maxspeed)
}

function preload ()
    {
        //this.load.setBaseURL(window.location.href);
        this.load.image('ship', './assets/spaceship.svg');
        this.load.image('space', './assets/background.jpg')
        this.load.image('astroid', './assets/astroid512x711.png');
        this.load.audio('theme', './assets/am_i_nzxtinst.mp3')
    }
      var astroids =[];
function create(){
    this.add.image(config.width/2, config.width/2, 'space')

    for(let x = 0; x <=level;x++){
        astroids[x] = this.physics.add.image(10,10, 'astroid')
        astroids[x].setCollideWorldBounds(true).setBounce(1);
        astroids[x].setVelocityX(randomSpeed())
        astroids[x].setVelocityY(randomSpeed())
        const scale = Math.random()/10 + 0.05
        astroids[x].scaleX = scale
        astroids[x].scaleY = scale
    }
   
    console.log(Phaser.Math)
    window.player = this.physics.add.image(113,150, 'ship')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //controls
    
}


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
           
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: function(){
            for(astroid of astroids){
                astroid.rotation += 0.005
            }
            cursors = this.input.keyboard.createCursorKeys();
            if (cursors.left.isDown){
                player.rotation += -0.07
            }
            else if (cursors.right.isDown){
                player.rotation += 0.07  
            } 
            if (cursors.up.isDown ){
                const { rotation} = player
                const x = Math.sin(rotation)
                const y = Math.cos(rotation);
                player.setVelocityY(-y * maxspeed);
                player.setVelocityX(x * maxspeed);

            }
        }
    }
};

var game = new Phaser.Game(config);









