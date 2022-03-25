import Phaser from 'phaser';
import sceneEvents from '../events/eventCenter';
import { WEAPONS_GRAPHICS_CHARS } from '../../../constants/weaponsGraphicsChars';

import { TWeaponsIcons } from './UiPanel.types';
import { WEAPONS } from '../../../constants/weapons';
import Weapon from '../entities/Weapon';
import PersonUI from './PersonUi';
import Person from '../person/Person';
import Arena from '../scenes/Arena';
import Dungeon from '../scenes/Dungeon';
export default class UIPanel {
  private scene: Phaser.Scene;

  private textZombiesCounter: Phaser.GameObjects.Text | null;

  private textAmmoQuantity: Phaser.GameObjects.Text | null;

  public zombieCounter: number;

  public static currentAmmo: number;

  private weapons: TWeaponsIcons;

  private uiPanel: Phaser.GameObjects.Image | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.zombieCounter = 0;
    UIPanel.currentAmmo =
      Weapon.currentAmmo[
        Weapon.currentWeapon as keyof typeof Weapon.currentAmmo
      ];
    this.textZombiesCounter = this.textAmmoQuantity = this.uiPanel = null;
    this.weapons = {
      pistol: null,
      rifle: null,
      shotgun: null,
      sniper: null,
      flamethrower: null,
    };
    this.create();
  }

  create() {
    const texture =
      (this.scene as PersonUI).parentScene instanceof Arena
        ? 'uiPanel-light'
        : 'uiPanel';

    this.uiPanel = this.scene.add.image(70, 40, texture);
    this.textZombiesCounter = this.createCounter(
      this.zombieCounter,
      20
    ) as Phaser.GameObjects.Text;
    this.textAmmoQuantity = this.createCounter(
      UIPanel.currentAmmo,
      100
    ) as Phaser.GameObjects.Text;
    this.uiPanel.scale = 0.4;

    sceneEvents.on('killZombieEvent', () => {
      this.incrementZombieDeathCounter();

      if (this.zombieCounter % 5 === 0) {
        Person.sayPhrase((this.scene as PersonUI).parentScene);
      }
    });

    sceneEvents.on('changeCurrentAmmo', () => {
      this.changeCurrentAmmoCounter();
    });

    sceneEvents.on('switch-weapon', () => {
      this.changeCurrentAmmoCounter();
    });

    this.createIcons();
  }

  createIcons() {
    WEAPONS.forEach((texture, ndx) => {
      const weapon = WEAPONS_GRAPHICS_CHARS[ndx];
      const weaponTexture = this.scene.add
        .image(70, 40, weapon.type)
        .setRotation(weapon.rotation)
        .setScale(weapon.scale)
        .setVisible(false);

      this.weapons[texture as keyof TWeaponsIcons] = weaponTexture;
    });

    this.setActiveWeapon(Weapon.currentWeapon);
  }

  setActiveWeapon(key: string) {
    WEAPONS.forEach(texture => {
      key === texture
        ? this.weapons[texture as keyof TWeaponsIcons]?.setVisible(true)
        : this.weapons[texture as keyof TWeaponsIcons]?.setVisible(false);
    });
  }

  incrementZombieDeathCounter() {
    this.zombieCounter += 1;
    this.textZombiesCounter?.destroy();
    this.textZombiesCounter = this.createCounter(
      this.zombieCounter,
      20
    ) as Phaser.GameObjects.Text;
    sceneEvents.emit(`killZombieCounter`, this.zombieCounter);
  }

  changeCurrentAmmoCounter() {
    UIPanel.currentAmmo =
      Weapon.currentAmmo[
        Weapon.currentWeapon as keyof typeof Weapon.currentAmmo
      ];

    if ((this.scene as PersonUI).parentScene instanceof Dungeon) {
      this.textAmmoQuantity?.destroy();
      this.textAmmoQuantity = this.createCounter(
        UIPanel.currentAmmo,
        100
      ) as Phaser.GameObjects.Text;
    }
  }

  createCounter(elem: number, x: number) {
    if ((this.scene as PersonUI).parentScene instanceof Dungeon) {
      const content = this.scene.add.text(
        0,
        0,
        elem.toString().padStart(3, '0'),
        {
          fontFamily: 'Orbitron',
          fontSize: '9px',
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: 20 },
        }
      );
      content.depth = 19;
      content.setPosition(x, 32);
      return content;
    }
  }
}
