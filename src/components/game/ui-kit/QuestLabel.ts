import Phaser from 'phaser';

export default class QuestLabel {
  public x: number;
  public y: number;
  protected scene: Phaser.Scene;
  private text: Phaser.GameObjects.Text;
  private content: string;
  public number: number;

  constructor(
    scene: Phaser.Scene,
    content: string,
    number: number,
    x?: number,
    y?: number
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.scene = scene;
    this.content = content;
    this.number = number;
    this.text = this.createText();
    this.appendToScene();
  }

  createText() {
    const content = this.scene.add.text(0, 0, this.content, {
      fontFamily: 'Orbitron',
      fontSize: '18px',
      color: '#ffffff',
      align: 'left',
      wordWrap: { width: 280 },
    });

    content.setShadow(0, 0, '#ff0000', 5);

    content.depth = 19;

    content.setPosition(this.x, this.y);
    return content;
  }

  appendToScene() {
    this.scene.add.existing(this.text);
  }

  crossLine() {
    this.scene.tweens.add({
      targets: this.text,
      x: -350,
      duration: 800,
    });
  }

  destroyText() {
    this.text.destroy(true);
  }
}
