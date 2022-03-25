import Phaser from 'phaser';
import { PHRASES, PHRASES_COUNTER } from '../../../constants/sounds';
import { WEAPON_ANIMATION_CHARS } from '../../../constants/weaponsAnimationChars';
import { IUserInteractiveButtons, TWeapon } from '../../../types/globals';
import MegaBoss from '../enemies/MegaBoss';
import Zombie from '../enemies/Zombie';
import Weapon from '../entities/Weapon';
import sceneEvents from '../events/eventCenter';
import Dungeon from '../scenes/Dungeon';
import { IPersonSounds, ISound, TWeaponSounds } from '../scenes/dungeon.types';
import PersonUI from '../ui-kit/PersonUi';
import { IMouseCoords } from './person.types';
import Pointer = Phaser.Input.Pointer;

export default class Person extends Phaser.Physics.Arcade.Sprite {
  public hit = false;

  private maxHealth: number;

  public isDead = false;

  private _speed = 100;

  private _hp: number;

  private mouseX = 0;

  private mouseY = 0;

  private lastFired = 0;

  public static pointerIsDown = false;

  private isMoved = false;

  private isShooting = false;

  public playerId: string | undefined;

  public isHealing = false;

  private timeHealingTimer: Phaser.Time.TimerEvent;

  private soundTimer: Phaser.Time.TimerEvent;

  private animTimer: Phaser.Time.TimerEvent;

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
    this.soundTimer = scene.time.addEvent({});
    this.animTimer = scene.time.addEvent({});
    this.scene = scene;
    this.userInterface = new PersonUI(this.scene, this);
    this.anims.play('idle_pistol');
  }

  heal(scene: Phaser.Scene, amount: number) {
    if (!this.hit && !this.isDead) {
      if (this.hp !== this.maxHealth && this.isHealing) {
        this.isHealing = false;

        this.timeHealingTimer = scene.time.addEvent({
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
      this.timeHealingTimer.remove();
    }
  }

  get speed() {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
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

  createRotationAndAttacking(scene: Phaser.Scene, attackSounds: TWeaponSounds) {
    scene.input.on('pointerdown', (e: Pointer) => {
      if (e.buttons !== 1) {
        e.event.preventDefault();
      } else {
        const currentWeapon = this.getCurrentWeaponChars(attackSounds);
        const weaponChars = currentWeapon.weaponChars;

        if (!this.isDead && this.scene && !Weapon.isRealoaded) {
          Person.pointerIsDown = true;

          if (!this.isShooting && this.anims) {
            this.handleCurrentAnimation(currentWeapon.currentAttackSound);
          } else {
            this.animTimer = scene.time.addEvent({
              delay:
                weaponChars.duration +
                  weaponChars.delay -
                  currentWeapon.currentTime -
                  currentWeapon.POSSIBLE_DELAY || 0,
              callback: () => {
                if (!this.isDead && this.anims) {
                  this.handleCurrentAnimation(currentWeapon.currentAttackSound);
                }
              },
            });
          }
        }
        this.soundTimer.remove();
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
      const currentWeapon = this.getCurrentWeaponChars(attackSounds);
      const weaponChars = currentWeapon.weaponChars;
      Person.pointerIsDown = false;

      this.soundTimer = scene.time.addEvent({
        delay:
          weaponChars.duration +
            weaponChars.delay -
            currentWeapon.currentTime -
            currentWeapon.POSSIBLE_DELAY || 0,
        callback: () => {
          this.isShooting = false;
          this.animTimer.remove();

          if (currentWeapon.currentAttackSound) {
            currentWeapon.currentAttackSound?.stop();
          }
        },
      });
    });
  }

  handleChangeWeaponsAndReload(
    personControlKeys: IUserInteractiveButtons,
    personUI: PersonUI,
    shotSounds: TWeaponSounds
  ) {
    const switchWeapon = (currentWeapon: string) => {
      Object.values(shotSounds).forEach(sound => {
        sound?.stop();
      });

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

      case personControlKeys.reload.isDown: {
        if (!Weapon.isRealoaded) {
          Weapon.isRealoaded = true;
          Weapon.reload(Weapon.currentWeapon as TWeapon, this.scene);
          sceneEvents.emit('changeCurrentAmmo');
        }
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
          this.setVelocity(0, 0);
        }
        if (!Person.pointerIsDown) {
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
        !Person.pointerIsDown &&
        this.anims.currentAnim &&
        this.anims.currentAnim.getTotalFrames() ===
          this.anims.currentFrame.index
      ) {
        this.anims.play(`${type}_${weapon}`);
      }
    }
  }

  handleShooting(time: number, bullets: Phaser.GameObjects.Group) {
    if (Person.pointerIsDown && time > this.lastFired) {
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
      let index = 3;

      if (zombie instanceof MegaBoss) {
        index = 5;
      }

      if (zombie.anims.currentFrame.index >= index) {
        personSounds.hit.play();
        person.hit = true;
        person.setTint(0xff0000);

        const dx = person.x - zombie.x;
        const dy = person.y - zombie.y;
        const vector = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);
        person.hp -= zombie.damage;
        person.setVelocity(vector.x, vector.y);

        scene.time.addEvent({
          delay: 500,
          callback: () => {
            person.hit = false;
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

    const sounds = {
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

    if (scene instanceof Dungeon) {
      for (let i = 0; i < PHRASES_COUNTER; i += 1) {
        const name = PHRASES[i].name as keyof typeof sounds.phrases;
        sounds.phrases[name] = scene.sound.add(name, {
          volume: 0.7,
        });
      }
    }

    return sounds;
  }

  static sayPhrase(scene: Phaser.Scene) {
    const phrases = (scene as Dungeon).personSounds?.phrases;

    if (!phrases) {
      throw new Error("There're no any phrases");
    }

    Object.values(phrases).forEach(phrase => {
      phrase.stop();
    });

    const randomNumber = Math.floor(Math.random() * 22) + 1;
    phrases[`phrase-${randomNumber}`].play();
  }

  update(
    personControlKeys: IUserInteractiveButtons,
    time: number,
    bullets: Phaser.GameObjects.Group | null,
    personSounds: IPersonSounds,
    personUi: PersonUI,
    shotSounds: TWeaponSounds
  ): void {
    if (!bullets) {
      throw new Error('Cannot find bullets');
    }

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
      if (!this.anims.currentAnim || this.anims.currentAnim.key !== 'death') {
        this.anims.play('death');
      }

      this.setVelocity(0, 0);
      return;
    }

    this.handleShooting(time, bullets);
    this.handleMoving(personControlKeys, personSounds.walk);
    this.handleChangeWeaponsAndReload(personControlKeys, personUi, shotSounds);
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
      person.hp -= Weapon.damage;
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
