import Phaser from 'phaser';

const debugGraphicsDraw = (
  layer: Phaser.Tilemaps.TilemapLayer,
  scene: Phaser.Scene
) => {
  const debugGraphics = scene.add.graphics().setAlpha(0.25);
  layer.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 47, 255),
  });
};

export default debugGraphicsDraw;
