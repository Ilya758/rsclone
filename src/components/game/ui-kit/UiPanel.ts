import Phaser from 'phaser';
import sceneEvents from '../events/eventCenter';
import { WEAPONS_GRAPHICS_CHARS } from '../../../constants/weaponsGraphicsChars';

import { TWeaponsIcons } from './UiPanel.types';
import { WEAPONS } from '../../../constants/weapons';
export default class UIPanel {
  private scene: Phaser.Scene;

  private textZombiesCounter: Phaser.GameObjects.Text | null;

  private textAmmoQuantity: Phaser.GameObjects.Text | null;

  private zombieCounter: number;

  private currentAmmo: number;

  private weapons: TWeaponsIcons;

  private uiPanel: Phaser.GameObjects.Image | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.zombieCounter = this.currentAmmo = 0;
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
    this.uiPanel = this.scene.add.image(70, 40, 'uiPanel');
    this.textZombiesCounter = this.createCounter(this.zombieCounter, 22);
    this.textAmmoQuantity = this.createCounter(this.currentAmmo, 102);
    this.uiPanel.scale = 0.4;

    sceneEvents.on('killZombieEvent', () => {
      this.incrementZombieDeathCounter();
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

    this.setActiveWeapon('pistol');
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
    this.textZombiesCounter = this.createCounter(this.zombieCounter, 22);
    sceneEvents.emit(`killZombieCounter`, this.zombieCounter);
  }

  changeCurrentAmmoCounter() {
    UIPanel.currentAmmo =
      Weapon.currentAmmo[
        Weapon.currentWeapon as keyof typeof Weapon.currentAmmo
      ];
    this.textAmmoQuantity?.destroy();
    this.textAmmoQuantity = this.createCounter(UIPanel.currentAmmo, 102);
  }

  createCounter(elem: number, x: number) {
    const content = this.scene.add.text(
      0,
      0,
      elem.toString().padStart(3, '0'),
      {
        fontFamily: 'Arial',
        fontSize: '10px',
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
