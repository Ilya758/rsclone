import Phaser from 'phaser';
import Person from '../person/Person';
import PersonHealthBar from './health-bars/PersonHealthBar';
import SettingsMenu from './SettingsMenu';
import UIPanel from './UiPanel';

export default class PersonUI extends Phaser.Scene {
  public static soundsAreMuted = false;

  public static musicIsMuted = false;

  public parentScene: Phaser.Scene;

  public hpBar: PersonHealthBar | null;

  public items: number;

  private person: Person;

  private settingsMenu: SettingsMenu | null;

  private menuIsOpened = false;

  public uiPanel: UIPanel | null;

  public timer: number;

  constructor(scene: Phaser.Scene, person: Person) {
    super({ key: 'person-ui' });
    this.parentScene = scene;
    this.person = person;
    this.items = 0;
    this.hpBar = null;
    this.settingsMenu = null;
    this.uiPanel = null;
    this.timer = 30;
  }

  create() {
    this.uiPanel = new UIPanel(this);
    this.hpBar = new PersonHealthBar(this, 0, 0, this.person);
  }

  toggleSettingsMenu() {
    if (!this.menuIsOpened) {
      this.menuIsOpened = true;
      this.settingsMenu = new SettingsMenu(this);
      this.parentScene.scene.pause();
    } else {
      this.menuIsOpened = false;
      this.settingsMenu?.destroy();
      this.parentScene.scene.resume();
    }
  }

  update(): void {
    const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    if (Phaser.Input.Keyboard.JustDown(esc)) {
      this.toggleSettingsMenu();
    }
  }
}
