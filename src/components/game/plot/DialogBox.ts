export default class DialogBox {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private quote: string;
  private scene: Phaser.Scene;
  private bubble: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private timer: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    quote: string,
    timer: number,
    scene: Phaser.Scene
  ) {
    this.x = x;
    this.y = y;
    this.timer = timer;
    this.width = width;
    this.height = height;
    this.quote = quote;
    this.scene = scene;
    this.bubble = this.createBubble();
    this.text = this.createText();
    this.destroy(this.scene);
  }

  createBubble() {
    const bubble = this.scene.add.graphics({ x: this.x, y: this.y });

    const arrowHeight = this.height / 4;

    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, this.width, this.height, 16);
    bubble.fillStyle(0xffffff, 1);
    bubble.lineStyle(4, 0x565656, 1);
    bubble.strokeRoundedRect(0, 0, this.width, this.height, 16);
    bubble.fillRoundedRect(0, 0, this.width, this.height, 16);
    bubble.depth = 18;

    const point1X = Math.floor(this.width / 7);
    const point1Y = this.height;
    const point2X = Math.floor((this.width / 7) * 2);
    const point2Y = this.height;
    const point3X = Math.floor(this.width / 7);
    const point3Y = Math.floor(this.height + arrowHeight);

    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    return bubble;
  }

  createText() {
    const bubblePadding = 10;
    const content = this.scene.add.text(0, 0, this.quote, {
      font: '13px Orbitron, monospace',
      color: '#000000',
      align: 'left',
      wordWrap: { width: this.width - bubblePadding * 2 },
    });
    content.depth = 19;
    const b = content.getBounds();

    content.setPosition(
      this.bubble.x + this.width / 2 - b.width / 2,
      this.bubble.y + this.height / 2 - b.height / 2
    );
    return content;
  }

  destroy(scene: Phaser.Scene) {
    scene.time.addEvent({
      delay: this.timer,
      callback: () => {
        this.bubble.destroy();
        this.text.destroy();
      },
    });
  }
}
