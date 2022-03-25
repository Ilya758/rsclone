import Phaser from 'phaser';
import { COLORS } from '../../../constants/colors';
import getSettingsMenuButtonsParams from '../../../utils/getSettingsMenuButtonsParams';
import PersonUI from './PersonUi';
import { ISounds } from './settings-menu.types';

export interface ISize {
  width: number;
  height: number;
}

export default class SettingsMenu {
  private settingsMenu: Phaser.GameObjects.Image;

  private scene: Phaser.Scene;

  private size: ISize;

  private soundsButton: Phaser.GameObjects.Text | null;

  private musicButton: Phaser.GameObjects.Text | null;

  private backToMenuButton: Phaser.GameObjects.Text | null;

  private soundsAreMuted = false;

  private musicIsMuted = false;

  private settingsMenuButtons: ReturnType<typeof getSettingsMenuButtonsParams>;

  private overlay: Phaser.GameObjects.Graphics | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.size = {
      width: this.scene.scale.width,
      height: this.scene.scale.height,
    };
    this.soundsButton = this.musicButton = this.backToMenuButton = null;
    this.overlay = null;
    this.settingsMenu = this.createMenu();
    this.settingsMenuButtons = getSettingsMenuButtonsParams(this.settingsMenu);
    this.createButtons();
  }

  createMenu() {
    const settingsMenu = this.scene.add.image(0, 0, 'settings-menu');

    settingsMenu.scale = 0.85;
    settingsMenu.depth = 999;
    settingsMenu.setScrollFactor(0);

    Phaser.Display.Align.In.Center(
      settingsMenu,
      this.scene.add.zone(
        this.scene.scale.width / 2,
        this.scene.scale.height / 2,
        this.scene.scale.width,
        this.scene.scale.height
      )
    );

    this.overlay = this.createOverlay();

    return settingsMenu;
  }

  createOverlay() {
    const overlay = this.scene.add.graphics();

    overlay.fillStyle(0x000000);
    overlay.setAlpha(0.45);
    overlay.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);

    return overlay;
  }

  createButtons() {
    const fontTitle = {
      font: '20px',
      fill: COLORS.yellow,
      stroke: COLORS.black,
      strokeThickness: 7,
      align: 'center',
    };

    ['soundsButton', 'musicButton', 'backToMenuButton'].forEach(
      (btn: string, ndx: number) => {
        const { name, y } =
          this.settingsMenuButtons[
            ndx as keyof typeof this.settingsMenuButtons
          ];
        const button = this.scene.add
          .text(this.settingsMenu.x, y, name, fontTitle)
          .setScrollFactor(0)
          .setOrigin(0.5);

        const setCurrentColor = (param: boolean) => {
          button.setColor(param ? COLORS.red : COLORS.yellow);
        };

        switch (btn) {
          case 'soundsButton': {
            setCurrentColor(PersonUI.soundsAreMuted);
            break;
          }
          case 'musicButton': {
            setCurrentColor(PersonUI.musicIsMuted);
            break;
          }
        }

        button.setFontFamily('Orbitron');
        button.alpha = 0.7;
        button.depth = 1000;
        button
          .setInteractive()
          .on('pointerover', () => {
            button.alpha = 1;
          })
          .on('pointerout', () => {
            button.alpha = 0.7;
          });

        const setStateToButton = (param: boolean) => {
          if (param) {
            button.setColor(COLORS.red);
          } else {
            button.setColor(COLORS.yellow);
          }
        };
        const sounds = (this.scene.sound as ISounds).sounds;

        switch (btn) {
          case 'soundsButton': {
            button.setInteractive().on('pointerdown', () => {
              this.toggleSoundsMute(sounds);
              PersonUI.soundsAreMuted = !PersonUI.soundsAreMuted;
              setStateToButton(PersonUI.soundsAreMuted);
            });
            break;
          }
          case 'musicButton': {
            button.setInteractive().on('pointerdown', () => {
              this.toggleSoundsMute(sounds, 'tracks');
              PersonUI.musicIsMuted = !PersonUI.musicIsMuted;
              setStateToButton(PersonUI.musicIsMuted);
            });
            break;
          }
          case 'backToMenuButton': {
            button.setInteractive().on('pointerdown', () => {
              window.location.replace('/');
            });

            break;
          }
        }

        (this[
          btn as keyof SettingsMenu
        ] as unknown as Phaser.GameObjects.Text) = button as Phaser.GameObjects.Text;
      }
    );
  }

  toggleSoundsMute(sounds: ISounds['sounds'], param = 'sounds') {
    sounds.forEach(sound => {
      const predicate =
        param === 'sounds'
          ? !sound.key.includes('track')
          : sound.key.includes('track');

      if (predicate) {
        sound.mute = !sound.mute;
      }
    });
  }

  destroy() {
    this.settingsMenu.destroy();
    this.overlay?.destroy();

    ['soundsButton', 'musicButton', 'backToMenuButton'].forEach(
      (btn: string) => {
        const button = this[
          btn as keyof SettingsMenu
        ] as unknown as Phaser.GameObjects.Text;

        button.destroy();
      }
    );
  }
}
