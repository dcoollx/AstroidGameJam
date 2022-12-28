const maxspeed = 200
const level = 10

function randomSpeed(){
    return Phaser.Math.RND.between(-maxspeed, maxspeed)
}

function preload ()
    {
        //this.load.setBaseURL(window.location.href);
        this.load.image('ship', './assets/spaceship.svg');
        this.load.image('astroid', './assets/astroid512x711.png');
    }
function create(){
    console.log()
    for(let x = 0; x <=level;x++){
        test = this.physics.add.image(10,10, 'astroid')
        test.setCollideWorldBounds(true).setBounce(1);
        test.setVelocityX(randomSpeed())
        test.setVelocityY(randomSpeed())
        const scale = Math.random()/10
        test.scaleX = scale
        test.scaleY = scale
    }
    //test.setVelocityX(.random.realInRang(0,maxspeed))
    console.log(Phaser.Math)
    window.player = this.physics.add.image(113,150, 'ship')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //controls
    
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
           
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: function(){
            cursors = this.input.keyboard.createCursorKeys();
            if (cursors.left.isDown){
                player.rotation += -0.07
            }
            else if (cursors.right.isDown){
                player.rotation += 0.07  
            } else {
                player.setVelocityX(0);
            }
            if (cursors.up.isDown ){
                const rotation = Phaser.Math.DegToRad
                    (player.rotation)
                const x = Math.cos(rotation)
                const y = Math.tan(rotation);
                console.log(x,y);
                player.setVelocityX( maxspeed * x);
                player.setVelocityY( maxspeed * -y);

            }
        }
    }
};

var game = new Phaser.Game(config);









