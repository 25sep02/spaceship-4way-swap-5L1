// [scene:scene_A]
class scene_A extends Phaser.Scene {
  constructor() {
    super({ key: 'scene_A' });
  }


  init() {
    // [start-init]

    // [end-init]
  }

  preload() {
    // [start-preload]
    this.load.image('phaser', 'assets/visual/phaser.png');
    this.load.image('space', 'assets/visual/space.png');
    this.load.spritesheet('spaceship_rotate', 'assets/visual/spaceship_rotate.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });
    this.load.spritesheet('spaceship', 'assets/visual/spaceship.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });
    this.load.audio('background_audio', 'assets/audio/space bg loop 1 mono 128kps 44khz 6s.mp3');
    this.load.audio('audio_flyoff', 'assets/audio/rocket-launch fly-off mono 8khz 1s.mp3');
    this.load.spritesheet('spaceship_no-flare', 'assets/visual/spaceship; no-flare.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });
    this.load.spritesheet('spaceship_xwing', 'assets/visual/spaceship; xwing rxst.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });
    this.load.spritesheet('spaceship_rotate_xwing', 'assets/visual/spaceship_rotate; xwing.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });
    this.load.spritesheet('ss_xwing_no-flare', 'assets/visual/spaceship; xwing no-flare.png', { frameWidth: 176, frameHeight: 96, margin: 0, spacing: 0 });

    // [end-preload]
  }

  create() {
    // [start-create]
    this.cameras.main.setBackgroundColor('#0c34ac');

    this.phaser = this.add.image(974, 229, 'phaser');
    this.phaser.setName('phaser');
    this.phaser.setAlpha(1);
    this.phaser.setDepth(0);
    this.phaser.setScale(1, 1);
    this.phaser.setAngle(0);
    this.phaser.setVisible(true);
    this.phaser.setBlendMode(0);
    this.phaser.setScrollFactor(1, 1);
    this.phaser.setInteractive();
    this.phaser.setOrigin(0.5, 0.5);
    this.phaser.setFlipX(false);
    this.phaser.setFlipY(false);

    this.text_1 = this.add.text(610, 332, '            Click logo to start.\n\n-- In spaceship scene:\n> [G] - Change type of spaceship.\n> [D] = move ahead while held\n> [F,R] = rocket thrust Fwd,Rev\n> [T] = turn to face opposite way\n> [W,S] = spin left, right\n> [up,dn-arrow] = grow, shrink\n> [left,right-arrow] = rotate left, right\n> [spacebar] = rotate stop', {
    "fontFamily": "Arial, Helvetica, sans-serif",
    "fontSize": "48px",
    "color": "#ffffff",
    "backgroundColor": "#00000000",
    "stroke": "#ffffff",
    "strokeThickness": 0,
    "align": "left",
    "resolution": 1,
    "padding": {
        "x": 0,
        "y": 0
    },
    "shadow": {
        "color": "#000000",
        "blur": 5,
        "offsetX": 5,
        "offsetY": 5,
        "fill": false
    }
});
    this.text_1.setName('text_1');
    this.text_1.setAlpha(1);
    this.text_1.setDepth(0);
    this.text_1.setScale(1, 1);
    this.text_1.setAngle(0);
    this.text_1.setVisible(true);
    this.text_1.setBlendMode(0);
    this.text_1.setScrollFactor(1, 1);
    this.text_1.setInteractive();
    this.text_1.setOrigin(0, 0);
    this.text_1.setFlipX(false);
    this.text_1.setFlipY(false);
// create script for scene_A

this.phaser.on('pointerup', (pointer) => {
    this.scene.start('scene_B');
});



    // [end-create]
  }

  update(time, delta) {
    // [start-update]

    // [end-update]
  }
}
// [end-scene]

// [scene:scene_B]
class scene_B extends Phaser.Scene {
  constructor() {
    super({ key: 'scene_B' });
  }

// custom script for scene_B

    handleRotateComplete(animation, frame) {
        if (animation.key === this.sprite_ss_rotate.rotatekey) {   // new custom property for ship-type swapping
            //console.log("custom; handleR 1;  this.ss_front_angle = ", this.ss_front_angle);
            //console.log(`Stopped on frame ${frame.index}.`);
            this.sprite_spaceship.visible = true;
            this.sprite_ss_rotate.visible = false;
            // 'Spin' values for sprite facing right:
            //    = 0 to -180 counter-clockwise above X axis (ie 'pointed up').
            //    = 0 to 180 clockwise below X axis (ie 'pointed down').
            // 'Angle' value is always either 0 for right, or 180 for left.
            // NOTE: Rotate loops until stopped. On stop it completes loop to face right.
            //   If jet faces left and rotates it ends facing right but 'angle' value
            //   will still be set to 180. To correct, adjust 'spin' value by
            //   a half spin (ie +/1 180) and set 'angle' value to 0 (ie 'right').
           if (this.ss_front_angle === 180) {  // for spaceship facing left sprite
                if (this.ss_front_spin < 0) {   // for 'up' pointing spin
                    this.ss_front_spin += 180;
                } else {                        // for 'down' pointing spin
                    this.ss_front_spin -= 180;
                }
            }
           this.ss_front_angle = 0;
           //console.log("custom; handleR 2;  this.ss_front_angle = ", this.ss_front_angle);
            
        }
    }



  init() {
    // [start-init]
// init script for scene_B

// Adjust velocity in px/sec on each key press
// Apply adjustment to sprites in scene create + update methods.
// 'Move' tap: +/- 'thrust' (instead of 'hold to move')
// Thrust +/- keys listeners in create() set the speed.
// Update applies speed on every frame. Need speed = 0 to stop.
// Declare speed 'object-variables' in init() so both create() and update() methods can use them.

this.spaceship_speed = 0;
this.ss_left_speed = 0;
this.ss_rotate_speed = 0;
this.ss_turn_left_speed = 0;
this.ss_turn_right_speed = 0;



    // [end-init]
  }

  preload() {
    // [start-preload]

    // [end-preload]
  }

  create() {
    // [start-create]
    this.cameras.main.setBackgroundColor('#636018');
    if (!this.anims.exists('shipRotate')) {
        this.anims.create({
            key: 'shipRotate',
            frames: this.anims.generateFrameNumbers('spaceship_rotate', {
                start: 0,
                end: 11
            }),
            frameRate: 5,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipFly')) {
        this.anims.create({
            key: 'shipFly',
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipFlyLeft')) {
        this.anims.create({
            key: 'shipFlyLeft',
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipTurnLeft')) {
        this.anims.create({
            key: 'shipTurnLeft',
            frames: this.anims.generateFrameNumbers('spaceship_rotate', {
                start: 0,
                end: 6
            }),
            frameRate: 5,
            repeat: 0,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipTurnRight')) {
        this.anims.create({
            key: 'shipTurnRight',
            frames: this.anims.generateFrameNumbers('spaceship_rotate', {
                start: 6,
                end: 11
            }),
            frameRate: 5,
            repeat: 0,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipFly_no-flare')) {
        this.anims.create({
            key: 'shipFly_no-flare',
            frames: this.anims.generateFrameNumbers('spaceship_no-flare', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('shipFlyLeft_no-flare')) {
        this.anims.create({
            key: 'shipFlyLeft_no-flare',
            frames: this.anims.generateFrameNumbers('spaceship_no-flare', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingFly')) {
        this.anims.create({
            key: 'xwingFly',
            frames: this.anims.generateFrameNumbers('spaceship_xwing', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingFlyLeft')) {
        this.anims.create({
            key: 'xwingFlyLeft',
            frames: this.anims.generateFrameNumbers('spaceship_xwing', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingRotate')) {
        this.anims.create({
            key: 'xwingRotate',
            frames: this.anims.generateFrameNumbers('spaceship_rotate_xwing', {
                start: 0,
                end: 11
            }),
            frameRate: 5,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingTurnLeft')) {
        this.anims.create({
            key: 'xwingTurnLeft',
            frames: this.anims.generateFrameNumbers('spaceship_rotate_xwing', {
                start: 0,
                end: 6
            }),
            frameRate: 5,
            repeat: 0,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingTurnRight')) {
        this.anims.create({
            key: 'xwingTurnRight',
            frames: this.anims.generateFrameNumbers('spaceship_rotate_xwing', {
                start: 6,
                end: 11
            }),
            frameRate: 5,
            repeat: 0,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingFly_no-flare')) {
        this.anims.create({
            key: 'xwingFly_no-flare',
            frames: this.anims.generateFrameNumbers('ss_xwing_no-flare', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    if (!this.anims.exists('xwingFlyLeft_no-flare')) {
        this.anims.create({
            key: 'xwingFlyLeft_no-flare',
            frames: this.anims.generateFrameNumbers('ss_xwing_no-flare', {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1,
            delay: 0,
            repeatDelay: 0,
            yoyo: false
        });
    }

    this.bgMusic = this.sound.add('background_audio', { mute: false, loop: true, volume: 1 });
    this.flyoffSound = this.sound.add('audio_flyoff', { mute: false, loop: false, volume: 0.74 });
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.T = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.G = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

    this.sprite_ss_rotate = this.add.sprite(939, 466, 'spaceship_rotate');
    this.sprite_ss_rotate.setName('sprite_ss_rotate');
    this.sprite_ss_rotate.setAlpha(1);
    this.sprite_ss_rotate.setDepth(1);
    this.sprite_ss_rotate.setScale(1, 1);
    this.sprite_ss_rotate.setAngle(0);
    this.sprite_ss_rotate.setVisible(false);
    this.sprite_ss_rotate.setBlendMode(0);
    this.sprite_ss_rotate.setScrollFactor(1, 1);
    this.sprite_ss_rotate.setInteractive();
    this.sprite_ss_rotate.setOrigin(0.5, 0.5);
    this.sprite_ss_rotate.setFlipX(false);
    this.sprite_ss_rotate.setFlipY(false);

    this.sprite_spaceship = this.add.sprite(939, 466, 'spaceship');
    this.sprite_spaceship.setName('sprite_spaceship');
    this.sprite_spaceship.setAlpha(1);
    this.sprite_spaceship.setDepth(1);
    this.sprite_spaceship.setScale(1, 1);
    this.sprite_spaceship.setAngle(0);
    this.sprite_spaceship.setVisible(true);
    this.sprite_spaceship.setBlendMode(0);
    this.sprite_spaceship.setScrollFactor(1, 1);
    this.sprite_spaceship.setInteractive();
    this.sprite_spaceship.setOrigin(0.5, 0.5);
    this.sprite_spaceship.setFlipX(false);
    this.sprite_spaceship.setFlipY(false);

    this.tileSprite_space = this.add.tileSprite(952, 542, 1280, 720, 'space');
    this.tileSprite_space.setName('tileSprite_space');
    this.tileSprite_space.setAlpha(1);
    this.tileSprite_space.setDepth(0);
    this.tileSprite_space.setScale(1.5, 1.5);
    this.tileSprite_space.setAngle(0);
    this.tileSprite_space.setVisible(true);
    this.tileSprite_space.setBlendMode(0);
    this.tileSprite_space.setScrollFactor(1, 1);
    this.tileSprite_space.setInteractive();
    this.tileSprite_space.setOrigin(0.5, 0.5);
    this.tileSprite_space.setFlipX(false);
    this.tileSprite_space.setFlipY(false);
    this.tileSprite_space.tilePositionX = 0;
    this.tileSprite_space.tilePositionY = 0;
    this.tileSprite_space.tileScaleX = 1;
    this.tileSprite_space.tileScaleY = 1;

    this.sprite_ss_left = this.add.sprite(939, 466, 'spaceship');
    this.sprite_ss_left.setName('sprite_ss_left');
    this.sprite_ss_left.setAlpha(1);
    this.sprite_ss_left.setDepth(1);
    this.sprite_ss_left.setScale(1, 1);
    this.sprite_ss_left.setAngle(0);
    this.sprite_ss_left.setVisible(false);
    this.sprite_ss_left.setBlendMode(0);
    this.sprite_ss_left.setScrollFactor(1, 1);
    this.sprite_ss_left.setInteractive();
    this.sprite_ss_left.setOrigin(0.5, 0.5);
    this.sprite_ss_left.setFlipX(true);
    this.sprite_ss_left.setFlipY(false);

    this.sprite_ss_turn_left = this.add.sprite(939, 466, 'spaceship_rotate');
    this.sprite_ss_turn_left.setName('sprite_ss_turn_left');
    this.sprite_ss_turn_left.setAlpha(1);
    this.sprite_ss_turn_left.setDepth(1);
    this.sprite_ss_turn_left.setScale(1, 1);
    this.sprite_ss_turn_left.setAngle(0);
    this.sprite_ss_turn_left.setVisible(false);
    this.sprite_ss_turn_left.setBlendMode(0);
    this.sprite_ss_turn_left.setScrollFactor(1, 1);
    this.sprite_ss_turn_left.setInteractive();
    this.sprite_ss_turn_left.setOrigin(0.5, 0.5);
    this.sprite_ss_turn_left.setFlipX(false);
    this.sprite_ss_turn_left.setFlipY(false);

    this.sprite_ss_turn_right = this.add.sprite(939, 466, 'spaceship_rotate');
    this.sprite_ss_turn_right.setName('sprite_ss_turn_right');
    this.sprite_ss_turn_right.setAlpha(1);
    this.sprite_ss_turn_right.setDepth(1);
    this.sprite_ss_turn_right.setScale(1, 1);
    this.sprite_ss_turn_right.setAngle(0);
    this.sprite_ss_turn_right.setVisible(false);
    this.sprite_ss_turn_right.setBlendMode(0);
    this.sprite_ss_turn_right.setScrollFactor(1, 1);
    this.sprite_ss_turn_right.setInteractive();
    this.sprite_ss_turn_right.setOrigin(0.5, 0.5);
    this.sprite_ss_turn_right.setFlipX(false);
    this.sprite_ss_turn_right.setFlipY(false);

    this.sprite_spaceship_no_flare = this.add.sprite(939, 466, 'spaceship_no-flare');
    this.sprite_spaceship_no_flare.setName('sprite_spaceship_no_flare');
    this.sprite_spaceship_no_flare.setAlpha(1);
    this.sprite_spaceship_no_flare.setDepth(0);
    this.sprite_spaceship_no_flare.setScale(1, 1);
    this.sprite_spaceship_no_flare.setAngle(0);
    this.sprite_spaceship_no_flare.setVisible(false);
    this.sprite_spaceship_no_flare.setBlendMode(0);
    this.sprite_spaceship_no_flare.setScrollFactor(1, 1);
    this.sprite_spaceship_no_flare.setInteractive();
    this.sprite_spaceship_no_flare.setOrigin(0.5, 0.5);
    this.sprite_spaceship_no_flare.setFlipX(false);
    this.sprite_spaceship_no_flare.setFlipY(false);

    this.sprite_ss_left_no_flare = this.add.sprite(939, 466, 'spaceship_no-flare');
    this.sprite_ss_left_no_flare.setName('sprite_ss_left_no_flare');
    this.sprite_ss_left_no_flare.setAlpha(1);
    this.sprite_ss_left_no_flare.setDepth(0);
    this.sprite_ss_left_no_flare.setScale(1, 1);
    this.sprite_ss_left_no_flare.setAngle(0);
    this.sprite_ss_left_no_flare.setVisible(false);
    this.sprite_ss_left_no_flare.setBlendMode(0);
    this.sprite_ss_left_no_flare.setScrollFactor(1, 1);
    this.sprite_ss_left_no_flare.setInteractive();
    this.sprite_ss_left_no_flare.setOrigin(0.5, 0.5);
    this.sprite_ss_left_no_flare.setFlipX(true);
    this.sprite_ss_left_no_flare.setFlipY(false);

    this.sprite_xwing = this.add.sprite(939, 466, 'spaceship_xwing');
    this.sprite_xwing.setName('sprite_xwing');
    this.sprite_xwing.setAlpha(1);
    this.sprite_xwing.setDepth(0);
    this.sprite_xwing.setScale(1, 1);
    this.sprite_xwing.setAngle(0);
    this.sprite_xwing.setVisible(false);
    this.sprite_xwing.setBlendMode(0);
    this.sprite_xwing.setScrollFactor(1, 1);
    this.sprite_xwing.setInteractive();
    this.sprite_xwing.setOrigin(0.5, 0.5);
    this.sprite_xwing.setFlipX(false);
    this.sprite_xwing.setFlipY(false);

    this.sprite_xwing_left = this.add.sprite(939, 466, 'spaceship_xwing');
    this.sprite_xwing_left.setName('sprite_xwing_left');
    this.sprite_xwing_left.setAlpha(1);
    this.sprite_xwing_left.setDepth(0);
    this.sprite_xwing_left.setScale(1, 1);
    this.sprite_xwing_left.setAngle(0);
    this.sprite_xwing_left.setVisible(false);
    this.sprite_xwing_left.setBlendMode(0);
    this.sprite_xwing_left.setScrollFactor(1, 1);
    this.sprite_xwing_left.setInteractive();
    this.sprite_xwing_left.setOrigin(0.5, 0.5);
    this.sprite_xwing_left.setFlipX(true);
    this.sprite_xwing_left.setFlipY(false);

    this.sprite_xwing_rotate = this.add.sprite(939, 466, 'spaceship_rotate_xwing');
    this.sprite_xwing_rotate.setName('sprite_xwing_rotate');
    this.sprite_xwing_rotate.setAlpha(1);
    this.sprite_xwing_rotate.setDepth(0);
    this.sprite_xwing_rotate.setScale(1, 1);
    this.sprite_xwing_rotate.setAngle(0);
    this.sprite_xwing_rotate.setVisible(false);
    this.sprite_xwing_rotate.setBlendMode(0);
    this.sprite_xwing_rotate.setScrollFactor(1, 1);
    this.sprite_xwing_rotate.setInteractive();
    this.sprite_xwing_rotate.setOrigin(0.5, 0.5);
    this.sprite_xwing_rotate.setFlipX(false);
    this.sprite_xwing_rotate.setFlipY(false);

    this.sprite_xwing_turn_left = this.add.sprite(939, 466, 'spaceship_rotate_xwing');
    this.sprite_xwing_turn_left.setName('sprite_xwing_turn_left');
    this.sprite_xwing_turn_left.setAlpha(1);
    this.sprite_xwing_turn_left.setDepth(0);
    this.sprite_xwing_turn_left.setScale(1, 1);
    this.sprite_xwing_turn_left.setAngle(0);
    this.sprite_xwing_turn_left.setVisible(false);
    this.sprite_xwing_turn_left.setBlendMode(0);
    this.sprite_xwing_turn_left.setScrollFactor(1, 1);
    this.sprite_xwing_turn_left.setInteractive();
    this.sprite_xwing_turn_left.setOrigin(0.5, 0.5);
    this.sprite_xwing_turn_left.setFlipX(false);
    this.sprite_xwing_turn_left.setFlipY(false);

    this.sprite_xwing_turn_right = this.add.sprite(939, 466, 'spaceship_rotate_xwing');
    this.sprite_xwing_turn_right.setName('sprite_xwing_turn_right');
    this.sprite_xwing_turn_right.setAlpha(1);
    this.sprite_xwing_turn_right.setDepth(0);
    this.sprite_xwing_turn_right.setScale(1, 1);
    this.sprite_xwing_turn_right.setAngle(0);
    this.sprite_xwing_turn_right.setVisible(false);
    this.sprite_xwing_turn_right.setBlendMode(0);
    this.sprite_xwing_turn_right.setScrollFactor(1, 1);
    this.sprite_xwing_turn_right.setInteractive();
    this.sprite_xwing_turn_right.setOrigin(0.5, 0.5);
    this.sprite_xwing_turn_right.setFlipX(false);
    this.sprite_xwing_turn_right.setFlipY(false);

    this.sprite_xwing_no_flare = this.add.sprite(939, 466, 'ss_xwing_no-flare');
    this.sprite_xwing_no_flare.setName('sprite_xwing_no_flare');
    this.sprite_xwing_no_flare.setAlpha(1);
    this.sprite_xwing_no_flare.setDepth(0);
    this.sprite_xwing_no_flare.setScale(1, 1);
    this.sprite_xwing_no_flare.setAngle(0);
    this.sprite_xwing_no_flare.setVisible(false);
    this.sprite_xwing_no_flare.setBlendMode(0);
    this.sprite_xwing_no_flare.setScrollFactor(1, 1);
    this.sprite_xwing_no_flare.setInteractive();
    this.sprite_xwing_no_flare.setOrigin(0.5, 0.5);
    this.sprite_xwing_no_flare.setFlipX(false);
    this.sprite_xwing_no_flare.setFlipY(false);

    this.sprite_xwing_left_no_flare = this.add.sprite(939, 466, 'ss_xwing_no-flare');
    this.sprite_xwing_left_no_flare.setName('sprite_xwing_left_no_flare');
    this.sprite_xwing_left_no_flare.setAlpha(1);
    this.sprite_xwing_left_no_flare.setDepth(0);
    this.sprite_xwing_left_no_flare.setScale(1, 1);
    this.sprite_xwing_left_no_flare.setAngle(0);
    this.sprite_xwing_left_no_flare.setVisible(false);
    this.sprite_xwing_left_no_flare.setBlendMode(0);
    this.sprite_xwing_left_no_flare.setScrollFactor(1, 1);
    this.sprite_xwing_left_no_flare.setInteractive();
    this.sprite_xwing_left_no_flare.setOrigin(0.5, 0.5);
    this.sprite_xwing_left_no_flare.setFlipX(true);
    this.sprite_xwing_left_no_flare.setFlipY(false);




// create script for scene_B

    // *** NOTE *** There are the following 2 different orientation variables:
    // start with spaceship facing right = 0, vs left = 180
    this.ss_front_angle = 0;  // 'rotate' & 'turn' keys, right = 0, vs left = 180
    // console.log("create() top; this.ss_front_angle = ", this.ss_front_angle);
    this.ss_front_spin = 0;  // 'spin' key, ccw: R=+/-0, L=+/-180 , Up -90, Dn=90

    // Play looping background music (attempt immediately; if blocked, resume on first user gesture)
    //this.bgMusic = this.sound.add('background_audio', { loop: true, volume: 1.0 });
    //  5L22: Replace above ai-gen declaration with KPE scene audio-list.
    try {
      this.bgMusic.play();
    } catch (e) {
      // some browsers block autoplay until user interaction; we'll resume on first pointerdown
    }
    if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
      this.input.once('pointerdown', () => {
        this.sound.context.resume().then(() => {
          if (this.bgMusic && !this.bgMusic.isPlaying) {
            this.bgMusic.play();
          }
        }).catch(() => {
          if (this.bgMusic && !this.bgMusic.isPlaying) {
            this.bgMusic.play();
          }
        });
      });
    }

// 'flyoffSound' for 'D'-move feature coded in update().
// this.flyoffSound = this.sound.add('audio_flyoff', { loop: false, volume: 1.0 });
//  5L22: Replace above ai-gen declaration with KPE scene audio-list.
// Use an event listener to trigger sound here instead of in update loop.
// This event only triggers once per physical key press
    this.input.keyboard.on('keydown-D', () => {
        this.flyoffSound.play();
    });

// At start run default ship looping-animation constantly.
// User can swap ship types. The sprites below are reused for
//   all ship types by swapping their texture and animation settings.
this.sprite_spaceship.play("shipFly");
this.sprite_ss_left.play("shipFlyLeft");
this.sprite_spaceship.visible = true;
this.sprite_ss_left.visible = false;
this.currentShipType = 'spaceship';  // default start-up ship

this.sprite_ss_turn_right.turnkey = 'shipTurnRight';  // custom property for override turn animation
this.sprite_ss_turn_left.turnkey = 'shipTurnLeft';  // custom property for override rotate animation
this.sprite_ss_rotate.rotatekey = 'shipRotate';  // custom property for override rotate animation
// See listener for key 'G' for ship-swapping code and details.
// The currently available spaceship models are:
//    'spaceship' 'spaceship_no-flare' 'x-wing' 'xwing-noFlare'



// 'handleRotateComplete' function is coded in scene_B 'custom' script
// 'animationstop' is used in 'spacebar' listener to stop rotation
this.sprite_ss_rotate.on('animationstop', this.handleRotateComplete, this);


// SPIN-LEFT on 'W' key. Code is in update() method. G-ai: spriteGroup and spin code.
// 'spriteGroup' is actually an array. 'spriteResizeGroup' is an actual sprite-group.
// Prep 'spriteGroup' and 'spinTween' here
this.spriteGroup = [this.sprite_spaceship, this.sprite_ss_left, this.sprite_ss_rotate, this.sprite_ss_turn_left, this.sprite_ss_turn_right];

this.spinTween = null;

// SPIN-Right on 'W' key. Code in update() method.
//Prep 'spinTween' here and reuse 'spriteGroup' above.
this.spinTweenR = null;

// g-ai later version of spriteGroup declaration for 'resize' feature.
// This syntax was needed to fix resize runtime error 5L22.
// Not compatible with previous spriteGroup for 'W-spin' so make 'spriteResizeGroup'
// 'spriteGroup' is actually an array. 'spriteResizeGroup' is an actual sprite-group.
this.spriteResizeGroup = this.add.group();
this.spriteResizeGroup.addMultiple([
    this.sprite_spaceship, 
    this.sprite_ss_rotate, 
    this.sprite_ss_left,
    this.sprite_ss_turn_left,
    this.sprite_ss_turn_right
]);


// 'right' has new 'rotatekey' property, 'left' has original code
this.RIGHT.on('up', () => {  
   if (this.sprite_ss_rotate.anims.isPlaying) {
       //console.log("Rotation animation is active. Press spacebar to stop.");
   } else {
      if (this.ss_front_angle === 0) {  // spaceship facing right
          //console.log("rotatekey: ", this.sprite_ss_rotate.rotatekey);
          //console.log("texture key: ", this.sprite_ss_rotate.texture.key);
	      this.sprite_ss_rotate.play({
            key: this.sprite_ss_rotate.rotatekey,  // new custom property for ship-type swapping
            startFrame: 0
         });
    	 this.sprite_spaceship.visible = false;
      } else {                            // spaceship facing left
	      this.sprite_ss_rotate.play({
            key: this.sprite_ss_rotate.rotatekey,  // new custom property for ship-type swapping
            startFrame: 6                 // counting from 0 not 1
         });
    	 this.sprite_ss_left.visible = false;
      }
      this.sprite_ss_rotate.visible = true;
   }
 });


this.LEFT.on('up', () => {
   if (this.sprite_ss_rotate.anims.isPlaying) {
       //console.log("Rotation animation is active. Press spacebar to stop.");
   } else {
      if (this.ss_front_angle === 0) {  // spaceship facing right
	      this.sprite_ss_rotate.playReverse({
            key: this.sprite_ss_rotate.rotatekey,  // new custom property for ship-type swapping
            startFrame: 0
         });
    	 this.sprite_spaceship.visible = false;	
      } else {                            // spaceship facing left
	      this.sprite_ss_rotate.playReverse({
            key: this.sprite_ss_rotate.rotatekey,  // new custom property for ship-type swapping
            startFrame: 6                 // counting from 0 not 1
         });
    	 this.sprite_ss_left.visible = false;	
      }
      this.sprite_ss_rotate.visible = true;
   }
 });


this.SPACE.on('up', () => {
    const frameToStopOn = this.sprite_ss_rotate.anims.currentAnim.getFrameAt(0);
    if (frameToStopOn) {
        // This call will now trigger the 'animationstop' event immediately
        // when the target frame is hit.
        this.sprite_ss_rotate.anims.stopOnFrame(frameToStopOn);
        // See above: 'this.sprite_ss_rotate.on('animationstop', this.handleRotateComplete, this);'
        // Call back handler 'handleRotateComplete' coded in scene_B 'custom' script.
    }
});


this.UP.on('up', () => {
    const sprites = this.spriteResizeGroup.getChildren(); // array of all group sprites
    if (sprites.length > 0) {
        this.tweens.add({
            targets: sprites,
            scaleX: '*=1.1', // Multiplies current scale by 1.1 (10% increase)
            scaleY: '*=1.1',
            duration: 200,
            ease: 'Sine.inOut'
        });
    }
});

this.DOWN.on('up', () => {
    const sprites = this.spriteResizeGroup.getChildren(); // array of all group sprites
    if (sprites.length > 0) {
        this.tweens.add({
            targets: sprites,
            scaleX: '*=.9', // Multiplies current scale by .9 (10% decrease)
            scaleY: '*=.9',
            duration: 200,
            ease: 'Sine.inOut'
        });
    }
});


//Play 1shot sprite-1 animation, wait to end then hide sprite-1 and show sprite-2.
this.T.on('up', () => {
   if (this.sprite_ss_rotate.anims.isPlaying) {
       //Do nothing. Or do: console.log("Rotate animation active.");
   } else {     
    switch (this.ss_front_angle) {
        case 180:  // spaceship is facing left, so turn it to the right
           this.sprite_ss_turn_right.visible = true;
           this.sprite_ss_left.visible = false;
           //this.sprite_ss_turn_right.play("shipTurnRight");
           //console.log("turnkey R 1: ", this.sprite_ss_turn_right.turnkey);
           //console.log("texture key 1: ", this.sprite_ss_turn_right.texture.key);
           this.sprite_ss_turn_right.play(this.sprite_ss_turn_right.turnkey);
           this.sprite_ss_turn_right.on('animationcomplete', (animation) => {
              //if (animation.key === "shipTurnRight") {
              if (animation.key === this.sprite_ss_turn_right.turnkey) {
                  this.sprite_spaceship.visible = true;  // sprite facing right
                  this.sprite_ss_turn_right.visible = false;
              }
           }, this);
           //console.log("create; key-T 1a; _angle = ", this.ss_front_angle);
           // console.log("create; key-T 1a; _spin = ", this.ss_front_spin);
           this.ss_front_angle = 0;    // ie right=0, left=180
           this.ss_front_spin += 180;  // ie ccw: R=-/+0, Up=-90, L=-/+180, Dn=90
           // console.log("create; key-T 1b; _angle = ", this.ss_front_angle);
           // console.log("create; key-T 1b; _spin = ", this.ss_front_spin);
           break;
        case 0:  // spaceship is facing right, so turn it to the left
           this.sprite_ss_turn_left.visible = true;
           this.sprite_spaceship.visible = false;
           //this.sprite_ss_turn_left.play("shipTurnLeft");
           //console.log("turnkey 2: ", this.sprite_ss_turn_left.turnkey);
           //console.log("texture key 2: ", this.sprite_ss_turn_left.texture.key);
           this.sprite_ss_turn_left.play(this.sprite_ss_turn_left.turnkey);
           this.sprite_ss_turn_left.on('animationcomplete', (animation) => {
              //if (animation.key === "shipTurnLeft") {
              if (animation.key === this.sprite_ss_turn_left.turnkey) {
                  this.sprite_ss_left.visible = true;  // sprite facing left
                  this.sprite_ss_turn_left.visible = false;
              }
           }, this);
           // console.log("create; key-T 2a; _angle = ", this.ss_front_angle);
           // console.log("create; key-T 2a; _spin = ", this.ss_front_spin);
           this.ss_front_angle = 180;  // ie right=0, left=180
           this.ss_front_spin -= 180;  // ie ccw: R=-/+0, Up=-90, L=-/+180, Dn=90
           // console.log("create; key-T 2b; _angle = ", this.ss_front_angle);
           // console.log("create; key-T 2b; _spin = ", this.ss_front_spin);
           break;
        default:
            console.log("create; key-T 3 exception; _angle: ", this.ss_front_angle);
            console.log("create; key-T 3 exception; _spin: ", this.ss_front_spin);
            break;
    }
   }
 });


// Persistent speed, like a rocket in space.
// 'Move' tap: +/- 'thrust' (instead of 'hold to move')
// Thrust +/- F/R keys listeners in create() set the speed.
// Update applies speed on every frame. Need speed = 0 to stop.
// Declare speed 'object-variables' in init() so both create() and update() methods can use them.
// "thrust" - 'F'/'R': add/subtract. Use delta (ms) to convert.
this.F.on('up', () => {
    this.spaceship_speed += 50;
    this.ss_left_speed += 50;
    this.ss_rotate_speed += 50;
    this.ss_turn_left_speed += 50;
    this.ss_turn_right_speed += 50;
 });
this.R.on('up', () => {
    this.spaceship_speed -= 50;
    this.ss_left_speed -= 50;
    this.ss_rotate_speed -= 50;
    this.ss_turn_left_speed -= 50;
    this.ss_turn_right_speed -= 50;
 });


// User input for [G] - Change type of spaceship.
// Values used in code for currentShipType:
//    'spaceship' 'spaceship_no-flare' 'x-wing' 'xwing_no-flare'
this.G.on('up', () => {
    switch (this.currentShipType) {
    case 'spaceship':      // The previous ship type we were on.
        this.currentShipType = 'spaceship_no-flare'; // The ship type we are switching to.
        this.sprite_spaceship.setTexture('spaceship_no-flare');
        this.sprite_spaceship.play('shipFly_no-flare');
        this.sprite_ss_left.setTexture('spaceship_no-flare');
        this.sprite_ss_left.play('shipFlyLeft_no-flare');
        break;
    case 'spaceship_no-flare':      // The previous ship type we were on.
        this.currentShipType = 'x-wing'; // The ship type we are switching to.
        this.sprite_spaceship.setTexture('spaceship_xwing');
        this.sprite_spaceship.play('xwingFly');
        this.sprite_ss_left.setTexture('spaceship_xwing');
        this.sprite_ss_left.play('xwingFlyLeft');
        this.sprite_ss_rotate.setTexture('spaceship_rotate_xwing');
        this.sprite_ss_rotate.rotatekey = 'xwingRotate';  // custom property for override rotate animation
        this.sprite_ss_turn_left.setTexture('spaceship_rotate_xwing');
        this.sprite_ss_turn_left.turnkey = 'xwingTurnLeft';  // custom property for override turn animation
        this.sprite_ss_turn_right.setTexture('spaceship_rotate_xwing');
        this.sprite_ss_turn_right.turnkey = 'xwingTurnRight';  // custom property for override turn animation
        //console.log("rotatekey G: ", this.sprite_ss_rotate.rotatekey);
        //console.log("texture key G: ", this.sprite_ss_rotate.texture.key);
        //console.log("turnkey L G: ", this.sprite_ss_turn_left.turnkey);
        //console.log("texture key G: ", this.sprite_ss_turn_left.texture.key);
        //console.log("turnkey R G: ", this.sprite_ss_turn_right.turnkey);
        //console.log("texture key G: ", this.sprite_ss_turn_right.texture.key);
        break;
    case 'x-wing':      // The previous ship type we were on.
        this.currentShipType = 'xwing_no-flare'; // The ship type we are switching to.
        this.sprite_spaceship.setTexture('sss_xwing_no-flare');
        this.sprite_spaceship.play('xwingFly_no-flare');
        this.sprite_ss_left.setTexture('ss_xwing_no-flare');
        this.sprite_ss_left.play('xwingFlyLeft_no-flare');
        break;
    case 'xwing_no-flare':      // The previous ship type we were on.
        this.currentShipType = 'spaceship'; // The ship type we are switching to.
        this.sprite_spaceship.setTexture('spaceship');
        this.sprite_spaceship.play('shipFly');
        this.sprite_ss_left.setTexture('spaceship');
        this.sprite_ss_left.play('shipFlyLeft');
        this.sprite_ss_rotate.setTexture('spaceship_rotate');
        this.sprite_ss_rotate.rotatekey = 'shipRotate';  // custom property for override rotate animation
        this.sprite_ss_turn_left.setTexture('spaceship_rotate');
        this.sprite_ss_turn_left.turnkey = 'shipTurnLeft';  // custom property for override turn animation
        this.sprite_ss_turn_right.setTexture('spaceship_rotate');
        this.sprite_ss_turn_right.turnkey = 'shipTurnRight';  // custom property for override turn animation
        break;
    }
 });
// Values used in code for currentShipType:
//    'spaceship' 'spaceship_no-flare' 'x-wing' 'xwing-noFlare'



    // [end-create]
  }

  update(time, delta) {
    // [start-update]
// update script for scene_B


if (this.ss_front_spin > -90 && this.ss_front_spin < 90) {
    // Move starfield to left when spaceship spin points to right
    this.tileSprite_space.tilePositionX += 2;
} else {
    // Move starfield to right when spaceship spin points to left
    this.tileSprite_space.tilePositionX -= 2;
}

// Trigonometry functions used to calc incremental change in X and Y
// to move a given length of pixels (eg 'spaceship_speed' # px, or '10' px)
// at a given angle relative to the X & Y axes (ie 'ss_front_spin').
// The Phaser sin and cos functions require radians.
let radians = Phaser.Math.DegToRad(this.ss_front_spin);


// Persistent speed, like a rocket in space.
// 'Move' tap: +/- 'thrust' (instead of 'hold to move')
// Thrust +/- F/R keys listeners in create() set the speed.
// Update applies speed on every frame. Need speed = 0 to stop.
// Declare speed 'object-variables' in init() so both create() and update() methods can use them.
// "thrust" - 'F'/'R': add/subtract. Use delta (ms) to convert.
if (this.spaceship_speed) {  // Only do calc's and moves if speed is not 0.
    const moveDist = this.spaceship_speed * (delta / 1000);
    const moveX = moveDist * Math.cos(radians);
    const moveY = moveDist * Math.sin(radians);

    this.spriteGroup.forEach(sprite => {
        sprite.x += moveX;
        sprite.y += moveY;
    });
}


// On/off fixed speed, like an electric motor.
// Hold down to move in direction spaceship is facing. Release to stop.
if (this.D.isDown) {
    const moveX = 10 * Math.cos(radians);
    const moveY = 10 * Math.sin(radians);

    this.spriteGroup.forEach(sprite => {
        sprite.x += moveX;
        sprite.y += moveY;
    });
}



// 5L18: 'W' key spins sprite counter-clockwise ('spin left')
//   Uses 'spinTween' and 'spriteGroup' defined in create() method.
if (this.W.isDown){
    if (!this.spinTween || !this.spinTween.isPlaying()) {
        // console.log("_B update() 'W'-up 1; ss_front_spin: ", this.ss_front_spin);
        // console.log("_B update() 'W'-up 1; ss_front_angle: ", this.ss_front_angle);
        // Create a single tween targeting all sprites in the array
        this.spinTween = this.tweens.add({
            targets: this.spriteGroup,
            angle: '-=360',   // Use relative subtraction for counter-clockwise
            duration: 5000,   // 5000ms at 60 steps a spin at 60fps = 5s full spin
            repeat: -1,       // Repeat while held
            ease: 'Linear',
            onStop: (tween, targets) => {
                // targets is the array [sprite1, sprite2, etc.]
                // Access the angle from the first sprite in the array
                const currentAngle = targets[0].angle;  // ie -180 to +180 NOT 0 to 360
                //console.log("Spin stopped. Current angle:", currentAngle);
                //this.ss_front_angle = currentAngle;  // works but with decimals
                const integerAngle = Math.trunc(currentAngle);  // removes decimals
                this.ss_front_spin = integerAngle;
                // Spin = 0 to -180 counter-clock-wise above X axis (ie 'pointed up').
                // Spin = 0 to 180 clockwise below X axis (ie 'pointed down').
                // Spin for movement = +/- 1/2 spin on sprite right-to-left turn
                if (this.ss_front_angle === 180) {  // for spaceship facing left sprite
                    if (this.ss_front_spin < 0) {   // for 'up' pointing spin
                        this.ss_front_spin += 180;
                    } else {                        // for 'down' pointing spin
                        this.ss_front_spin -= 180;
                    }
                }
             }
        });
    } 
} else {      // Stop the tween when the 'W' key is released
    if (this.spinTween) {
        this.spinTween.stop();
        this.spinTween = null;
        // console.log("_B update() 'W'-up 2; ss_front_spin: ", this.ss_front_spin);
        // console.log("_B update() 'W'-up 2; ss_front_angle: ", this.ss_front_angle);
    }
};



// 5L19: 'S' key spins sprite clockwise ('spin right')
//   Uses 'spinTweenR' and 'spriteGroup' defined in create() method.
if (this.S.isDown){
    if (!this.spinTweenR || !this.spinTweenR.isPlaying()) {
        // console.log("_B update() 'S'-up 1; ss_front_spin: ", this.ss_front_spin);
        // console.log("_B update() 'S'-up 1; ss_front_angle: ", this.ss_front_angle);
        // Create a single tween targeting all sprites in the array
        this.spinTweenR = this.tweens.add({
            targets: this.spriteGroup,
            angle: '+=360',   // Use relative addition for clockwise
            duration: 5000,   // 5000ms at 60 steps a spin at 60fps = 5s full spin
            repeat: -1,       // Repeat while held
            ease: 'Linear',
            onStop: (tween, targets) => {
                // targets is the array [sprite1, sprite2, etc.]
                // Access the angle from the first sprite in the array
                const currentAngle = targets[0].angle;  // ie -180 to +180 NOT 0 to 360
                //console.log("Spin stopped. Current angle:", currentAngle);
                //this.ss_front_angle = currentAngle;  // works but with decimals
                const integerAngle = Math.trunc(currentAngle);  // removes decimals
                this.ss_front_spin = integerAngle;
                // Spin = 0 to -180 counter-clock-wise above X axis (ie 'pointed up').
                // Spin = 0 to 180 clockwise below X axis (ie 'pointed down').
                // Spin for movement = +/- 1/2 spin on sprite right-to-left turn
                if (this.ss_front_angle === 180) {  // for spaceship facing left sprite
                    if (this.ss_front_spin < 0) {   // for 'up' pointing spin
                        this.ss_front_spin += 180;
                    } else {                        // for 'down' pointing spin
                        this.ss_front_spin -= 180;
                    }
                }
             }
        });
    } 
} else {    // Stop the tween when the 'W' key is released
    if (this.spinTweenR) {
        this.spinTweenR.stop();
        this.spinTweenR = null;
        // console.log("_B update() 'S'-up 2; ss_front_spin: ", this.ss_front_spin);
        // console.log("_B update() 'S'-up 2; ss_front_angle: ", this.ss_front_angle);
    }
}


    // [end-update]
  }
}
// [end-scene]

const config = {
    "type": 0,
    "backgroundColor": "#777777",
    "transparent": false,
    "antialias": true,
    "disableContextMenu": true,
    "scale": {
        "mode": 3,
        "autoCenter": 1,
        "width": 1920,
        "height": 1080
    },
    "input": {
        "keyboard": true,
        "mouse": true,
        "touch": true,
        "gamepad": false,
        "activePointers": 1
    },
    "audio": {
        "noAudio": false,
        "disableWebAudio": false
    },
    "pixelArt": false,
    "physics": {
        "default": "matter",
        "matter": {
            "gravity": {
                "x": 0,
                "y": 1
            },
            "debug": false,
            "enableSleeping": false
        }
    },
    "scene": [scene_A, scene_B]
};

const game = new Phaser.Game(config);