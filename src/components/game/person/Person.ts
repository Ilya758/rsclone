import Phaser from 'phaser';
import { IUserInteractiveButtons } from '../../../types/globals';
import Zombie from '../enemies/Zombie';
import Bullet from '../entities/bullet';
import PersonHealthBar from '../ui-kit/health-bars/PersonHealthBar';
import PersonUI from '../ui-kit/PersonUi';

export default class Person extends Phaser.Physics.Arcade.Sprite {
  public hit = false;

  public isDead = false;

  private _speed = 100;

  private _hp: number;

  public mouseX = 0;
  
  public mouseY = 0;

  private lastFired = 0;

  private isDown = false;

  public hpBar: PersonHealthBar;
  
  public playerId: string | undefined;

  public currentWeapon = 'knife';

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this._hp = 100;
    this.hpBar = new PersonHealthBar(scene, 0, 0, this);
  }

  selfHealing(scene: Phaser.Scene) {
    this.hpBar.heal(scene, 5);
  }
  get speed() {
    return this._speed;
  }

  get hp() {
    return this._hp;
  }

  create() {
    this.setTexture('person');
  }

  getMouseCoords() {
    this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
    const pointer = this.scene.input.activePointer;
    return {
      mouseX: pointer.worldX,
      mouseY: pointer.worldY,
    };
  }

  createRotationAndAttacking(
    scene: Phaser.Scene,
    attackSound: Phaser.Sound.BaseSound
  ) {
    // if the person is dead, he cannot rotate/shoot

    scene.input.on('pointerdown', () => {
      if (!this.isDead) {
        this.isDown = true;
        this.handleFiring('rifle');

        if (!attackSound.isPlaying) {
          attackSound.play();
        }
      }
    });

    scene.input.on('pointermove', () => {
      if (!this.isDead) {
        this.mouseX = this.getMouseCoords().mouseX;
        this.mouseY = this.getMouseCoords().mouseY;
      }
    });

    scene.input.on('pointerup', () => {
      this.isDown = false;
      attackSound.stop();
    });
  }

  handleChangeWeapons(
    personControlKeys: IUserInteractiveButtons,
    personUI: PersonUI
  ) {
    if (personControlKeys.one.isDown) {
      this.currentWeapon = 'knife';
      personUI.changeWeapon(this.currentWeapon);
    }
    if (personControlKeys.two.isDown) {
      this.currentWeapon = 'bat';
      personUI.changeWeapon(this.currentWeapon);
    }
    if (personControlKeys.three.isDown) {
      this.currentWeapon = 'gun';
      personUI.changeWeapon(this.currentWeapon);
    }
    if (personControlKeys.four.isDown) {
      this.currentWeapon = 'rifle';
      personUI.changeWeapon(this.currentWeapon);
    }
    if (personControlKeys.five.isDown) {
      this.currentWeapon = 'firethrower';
      personUI.changeWeapon(this.currentWeapon);
    }
  }

  handleMoving(
    personControlKeys: IUserInteractiveButtons,
    personWalkSound: Phaser.Sound.BaseSound
  ) {
    // checking pressing buttons
    if (personControlKeys.right.isDown && personControlKeys.up.isDown) {
      this.setVelocity(this.speed, -this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (
      personControlKeys.right.isDown &&
      personControlKeys.down.isDown
    ) {
      this.setVelocity(this.speed, this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.left.isDown && personControlKeys.down.isDown) {
      this.setVelocity(-this.speed, this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.left.isDown && personControlKeys.up.isDown) {
      this.setVelocity(-this.speed, -this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.left.isDown) {
      this.setVelocity(-this.speed, 0);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.right.isDown) {
      this.setVelocity(+this.speed, 0);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.up.isDown) {
      this.setVelocity(0, -this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else if (personControlKeys.down.isDown) {
      this.setVelocity(0, +this.speed);
      this.handleAnims(this.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    } else {
      if (!this.hit) {
        // is the person isn't in kick-immune state
        this.setVelocity(0, 0);
      }
      if (!this.isDown) {
        this.handleAnims(this.currentWeapon, 'idle');
        personWalkSound.stop();
      }
    }
  }

  handleAnims(weapon: string, type: string) {
    if (
      !this.anims.currentAnim ||
      this.anims.currentAnim.key !== `${type}_${weapon}`
    ) {
      if (!this.isDown) {
        this.anims.play(`${type}_${weapon}`);
      } else {
        this.handleFiring(this.currentWeapon);
      }
    }
  }

  handleFiring(weaponType: string) {
    if (!this.anims.currentAnim || this.anims.currentAnim.key !== weaponType) {
      this.anims.play(weaponType);
    }
  }

  handleShooting(time: number, bullets: Phaser.GameObjects.Group) {
    // when the person is shooting, need to consider a delay

    if (this.isDown && time > this.lastFired) {
      const bullet = bullets?.get() as Bullet;

      if (bullet) {
        bullet.callFireMethod(this.mouseX, this.mouseY, this.x, this.y);
        this.lastFired = time + 100;
      }

      if (
        !this.anims.currentAnim ||
        this.anims.currentAnim.key !== this.currentWeapon
      ) {
        this.anims.play(this.currentWeapon);
      }
    }
  }

  handleEnemyDamage(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
    scene: Phaser.Scene,
    personUi: PersonUI
  ) {
    if (!this) {
      throw new Error("Person isn't created or found");
    }

    const zombie = obj1 as Zombie;
    const person = obj2 as Person;

    if (!person.hit) {
      if (zombie.anims.currentFrame.index >= 3) {
        person.hit = true; // after kicking from one enemy, the person gets a bit of kick-immune
        person.setTint(0xff0000);

        const dx = person.x - zombie.x;
        const dy = person.y - zombie.y;
        const vector = new Phaser.Math.Vector2(dx, dy).normalize().scale(100); // calculating estimate delta-debouncing after collision
        personUi.hpBar.decrease(zombie.damage);
        person.setVelocity(vector.x, vector.y); // and sets the debounce to the person

        scene.time.addEvent({
          delay: 500,
          callback: () => {
            person.hit = false; // removing the kick-immune
            personUi.hpBar.isHealing = true; // activating self-healing
            person.clearTint();
          },
        });
      }

      if (personUi.hpBar.value === 0) {
        person.isDead = true;
      }
    }
  }

  update(
    personControlKeys: IUserInteractiveButtons,
    time: number,
    bullets: Phaser.GameObjects.Group | null,
    personWalkSound: Phaser.Sound.BaseSound,
    personUi: PersonUI
  ): void {
    if (!bullets) {
      throw new Error('Cannot find bullets');
    }
    // set rotation to the person
    this.mouseX = this.getMouseCoords().mouseX;
    this.mouseY = this.getMouseCoords().mouseY;
    if (!this.isDead) {
      this.setRotation(
        Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.x, this.y) +
          Math.PI / 2
      );
    }

    if (this.isDead) {
      // if person is dead, he can't walk
      if (!this.anims.currentAnim || this.anims.currentAnim.key !== 'death') {
        this.anims.play('death');
      }

      this.setVelocity(0, 0);
      return;
    }

    this.handleShooting(time, bullets);

    this.handleMoving(personControlKeys, personWalkSound);
    this.handleChangeWeapons(personControlKeys, personUi);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'person',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Person(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );
    sprite.setOrigin(0.55, 0.25);
    sprite.body.setSize(30, 30);
    sprite.setOffset(55, 15);
    return sprite;
  }
);
