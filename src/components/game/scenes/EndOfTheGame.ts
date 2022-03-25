import Phaser from 'phaser';

export default class EndOfTheGame extends Phaser.Scene {
  private video: Phaser.GameObjects.Video | null;

  constructor() {
    super({ key: 'endOfTheGame' });
    this.video = null;
  }

  create() {
    this.video = this.add.video(0, 0, 'endOfTheGame');

    this.video.setScrollFactor(0);

    Phaser.Display.Align.In.Center(
      this.video,
      this.add.zone(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height
      )
    );

    this.video.play();

    this.time.addEvent({
      delay: 86000,
      callback: () => {
        window.location.replace('/');
      },
    });
  }
}
