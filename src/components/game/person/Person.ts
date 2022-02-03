import Phaser from 'phaser';
import { IUserInteractiveButtons } from '../../../types/globals';
import Zombie from '../enemies/Zombie';
import Weapon from '../entities/Weapon';
import sceneEvents from '../events/eventCenter';
import { IPersonSounds, TWeaponSounds } from '../scenes/dungeon.types';
import PersonUI from '../ui-kit/PersonUi';
import { IMouseCoords } from './person.types';

export default class Person extends Phaser.Physics.Arcade.Sprite {
  public hit = false;

  private maxHealth: number;

  public isDead = false;

  private _speed = 100;

  private _hp: number;

  private mouseX = 0;

  private mouseY = 0;

  private lastFired = 0;

  private isDown = false;

  public playerId: string | undefined;

  public isHealing = false;

  private timeHealingTimer: Phaser.Time.TimerEvent;

  public userInterface: PersonUI;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this._hp = this.maxHealth = 100;
    this.timeHealingTimer = scene.time.addEvent({});
    this.scene = scene;
    this.userInterface = new PersonUI(this.scene, this);
    this.anims.play('idle_pistol');
  }

  heal(scene: Phaser.Scene, amount: number) {
    if (!this.hit && !this.isDead) {
      // when the person is in the cooldown

      if (this.hp !== this.maxHealth && this.isHealing) {
        // he starts to healing
        this.isHealing = false;

        this.timeHealingTimer = scene.time.addEvent({
          // after 30 seconds, health increases for 10 pts
          delay: 30000,
          callback: () => {
            this.hp += amount;

            if (this.hp > this.maxHealth) {
              this.hp = this.maxHealth;
            }

            this.userInterface.hpBar?.draw(this.hp);

            this.isHealing = true;

            return this.hp === this.maxHealth;
          },
        });

        this.isHealing = false;
      }
    } else {
      // otherwise time-healing-timer is removing

      this.timeHealingTimer.remove();
    }
  }

  get speed() {
    return this._speed;
  }

  get hp() {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = value;
    this.userInterface.hpBar?.draw(this.hp);
  }

  create() {
    this.setTexture('person');
  }

  getMouseCoords(): IMouseCoords | undefined {
    if (this.scene) {
      this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
      const pointer = this.scene.input.activePointer;
      return {
        mouseX: pointer.worldX,
        mouseY: pointer.worldY,
      };
    }
  }

  handleCurrentAnimation(currentAttackSound: ISound) {
    if (
      !this.anims.currentAnim ||
      this.anims.currentAnim.key !== Weapon.currentWeapon
    ) {
      this.anims.play(Weapon.currentWeapon);
    }

    this.isShooting = true;

    if (currentAttackSound && !currentAttackSound?.isPlaying) {
      currentAttackSound?.play();
    }
  }

  getCurrentWeaponChars(attackSounds: TWeaponSounds) {
    const MS_COEFFICIENT = 1000;
    const POSSIBLE_DELAY = 100;
    const currentWeapon = Weapon.currentWeapon as keyof TWeaponSounds;
    const currentAttackSound = attackSounds[currentWeapon];
    const weaponChars = WEAPON_ANIMATION_CHARS[currentWeapon];
    const currentTime =
      (currentAttackSound as unknown as Phaser.Sound.WebAudioSound).seek *
      MS_COEFFICIENT;

    return {
      MS_COEFFICIENT,
      POSSIBLE_DELAY,
      currentAttackSound,
      weaponChars,
      currentTime,
    };
  }

    // if the person is dead, he cannot rotate/shoot

    scene.input.on('pointerdown', () => {
      if (!this.isDead && this.scene) {
        this.isDown = true;
        this.handleFiring('rifle');

        if (attackSound && !attackSound.isPlaying) {
          attackSound.play();
        }
      }
    });

    scene.input.on('pointermove', () => {
      if (!this.isDead && this.scene) {
        const mouseCoords = this.getMouseCoords() as IMouseCoords;
        this.mouseX = mouseCoords.mouseX;
        this.mouseY = mouseCoords.mouseY;
      }
    });

    scene.input.on('pointerup', () => {
      this.isDown = false;
      if (attackSound) attackSound.stop();
    });
  }

  handleChangeWeapons(
    personControlKeys: IUserInteractiveButtons,
    personUI: PersonUI
  ) {
    const switchWeapon = (currentWeapon: string) => {
      Weapon.currentWeapon = currentWeapon;
      personUI.uiPanel?.setActiveWeapon(Weapon.currentWeapon);
    };

    switch (true) {
      case personControlKeys.one.isDown: {
        switchWeapon('pistol');
        break;
      }

      case personControlKeys.two.isDown: {
        switchWeapon('rifle');
        break;
      }

      case personControlKeys.three.isDown: {
        switchWeapon('shotgun');
        break;
      }

      case personControlKeys.four.isDown: {
        switchWeapon('sniper');
        break;
      }

      case personControlKeys.five.isDown: {
        switchWeapon('flamethrower');
        break;
      }
    }
  }

  handleMoving(
    personControlKeys: IUserInteractiveButtons,
    personWalkSound: Phaser.Sound.BaseSound
  ) {
    const setWalkAnimationAndVelocity = (
      personWalkSound: Phaser.Sound.BaseSound,
      x: number,
      y: number
    ) => {
      this.setVelocity(x, y);
      this.isMoved = true;
      this.handleAnims(Weapon.currentWeapon, 'walk');

      if (!personWalkSound.isPlaying) {
        personWalkSound.play();
      }
    };

    switch (true) {
      case personControlKeys.right.isDown && personControlKeys.up.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, this.speed, -this.speed);
        break;
      }
      case personControlKeys.right.isDown && personControlKeys.down.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, this.speed, this.speed);
        break;
      }
      case personControlKeys.left.isDown && personControlKeys.down.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, -this.speed, this.speed);
        break;
      }
      case personControlKeys.left.isDown && personControlKeys.up.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, -this.speed, -this.speed);
        break;
      }
      case personControlKeys.left.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, -this.speed, 0);
        break;
      }
      case personControlKeys.right.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, this.speed, 0);
        break;
      }
      case personControlKeys.up.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, 0, -this.speed);
        break;
      }
      case personControlKeys.down.isDown: {
        setWalkAnimationAndVelocity(personWalkSound, 0, this.speed);
        break;
      }
      default: {
        this.isMoved = false;

        if (!this.hit) {
          // is the person isn't in kick-immune state
          this.setVelocity(0, 0);
        }
        if (!this.isDown) {
          this.handleAnims(Weapon.currentWeapon, 'idle');
          personWalkSound.stop();
        }
      }
    }
  }

  handleAnims(weapon: string, type: string) {
    if (
      !this.anims.currentAnim ||
      this.anims.currentAnim.key !== `${type}_${weapon}`
    ) {
      if (
        !this.isDown &&
        this.anims.currentAnim &&
        this.anims.currentAnim.getTotalFrames() ===
          this.anims.currentFrame.index
      ) {
        this.anims.play(`${type}_${weapon}`);
      }
    }
  }

  handleShooting(time: number, bullets: Phaser.GameObjects.Group) {
    // when the person is shooting, need to consider a delay

    if (this.isDown && time > this.lastFired) {
      const bullet = bullets?.get() as Weapon;

      if (bullet) {
        bullet.callFireMethod(this.mouseX, this.mouseY, this.x, this.y);

        this.lastFired = time + Weapon.fireRate;
      }
    }
  }

  handleEnemyDamage(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
    scene: Phaser.Scene,
    personSounds: IPersonSounds
  ) {
    if (!this) {
      throw new Error("Person isn't created or found");
    }

    const zombie = obj1 as Zombie;
    const person = obj2 as Person;

    if (!person.hit && !person.isDead) {
      if (zombie.anims.currentFrame.index >= 3) {
        personSounds.hit.play();
        person.hit = true; // after kicking from one enemy, the person gets a bit of kick-immune
        person.setTint(0xff0000);

        const dx = person.x - zombie.x;
        const dy = person.y - zombie.y;
        const vector = new Phaser.Math.Vector2(dx, dy).normalize().scale(100); // calculating estimate delta-debouncing after collision
        person.hp -= zombie.damage;
        person.setVelocity(vector.x, vector.y); // and sets the debounce to the person

        scene.time.addEvent({
          delay: 500,
          callback: () => {
            person.hit = false; // removing the kick-immune
            person.isHealing = true;
            person.clearTint();
          },
        });
      }

      if (person.hp <= 0) {
        personSounds.hit.stop();
        personSounds.dead.play();
        person.hp = 0;
        person.isDead = true;
        sceneEvents.emit('person-death');
      }
    }
  }

  static createPersonSounds(scene: Phaser.Scene): IPersonSounds {
    const phrases = ['first-phrase'];

    return {
      walk: scene.sound.add('person-walk', {
        volume: 0.3,
      }),
      hit: scene.sound.add('person-hit', {
        volume: 0.3,
      }),
      dead: scene.sound.add('person-dead', {
        volume: 0.5,
      }),
      phrases: {
        'first-phrase': scene.sound.add(phrases[0]),
      },
    };
  }

  update(
    personControlKeys: IUserInteractiveButtons,
    time: number,
    bullets: Phaser.GameObjects.Group | null,
    personSounds: IPersonSounds,
    personUi: PersonUI
  ): void {
    if (!bullets) {
      throw new Error('Cannot find bullets');
    }
    // set rotation to the person

    if (!this.isDead) {
      const mouseCoords = this.getMouseCoords() as IMouseCoords;
      this.mouseX = mouseCoords.mouseX;
      this.mouseY = mouseCoords.mouseY;

      if (this._hp !== this.maxHealth) {
        this.heal(this.scene, 5);
      }

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
    this.handleMoving(personControlKeys, personSounds.walk);
    this.handleChangeWeapons(personControlKeys, personUi);
  }

  static handleBulletDamage(
    _: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    arg2: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    scene: Phaser.Scene,
    personUi: PersonUI | null
  ) {
    const person = arg2 as Person;

    if (personUi) {
      person.setTint(0xff0000);
      person.hp -= bullet.damage;
      person.setVelocity(0, 0);

      scene.time.addEvent({
        delay: 500,
        callback: () => {
          person.isHealing = true;
          person.clearTint();
        },
      });

      if (person.hp <= 0) {
        person.hp = 0;
        person.isDead = true;
      }

      return person.hp;
    }
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
