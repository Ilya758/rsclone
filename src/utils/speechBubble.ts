import Phaser from 'phaser';

export const createSpeechBubble = (
  x: number,
  y: number,
  width: number,
  height: number,
  quote: string,
  game: Phaser.Scene
) => {
  const bubbleWidth = width;
  const bubbleHeight = height;
  const bubblePadding = 10;
  const arrowHeight = bubbleHeight / 4;

  const bubble = game.add.graphics({ x: x, y: y });
  bubble.depth = 10;
  //  Bubble shadow
  bubble.fillStyle(0x222222, 0.5);
  bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

  //  Bubble color
  bubble.fillStyle(0xffffff, 1);

  //  Bubble outline line style
  bubble.lineStyle(4, 0x565656, 1);

  //  Bubble shape and outline
  bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

  //  Calculate arrow coordinates
  const point1X = Math.floor(bubbleWidth / 7);
  const point1Y = bubbleHeight;
  const point2X = Math.floor((bubbleWidth / 7) * 2);
  const point2Y = bubbleHeight;
  const point3X = Math.floor(bubbleWidth / 7);
  const point3Y = Math.floor(bubbleHeight + arrowHeight);

  //  Bubble arrow shadow
  bubble.lineStyle(4, 0x222222, 0.5);
  bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

  //  Bubble arrow fill
  bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
  bubble.lineStyle(2, 0x565656, 1);
  bubble.lineBetween(point2X, point2Y, point3X, point3Y);
  bubble.lineBetween(point1X, point1Y, point3X, point3Y);

  const content = game.add.text(0, 0, quote, {
    fontFamily: 'Arial',
    fontSize: '20px',
    color: '#000000',
    align: 'center',
    wordWrap: { width: bubbleWidth - bubblePadding * 2 },
  });
  content.depth = 11;
  const b = content.getBounds();

  content.setPosition(
    bubble.x + bubbleWidth / 2 - b.width / 2,
    bubble.y + bubbleHeight / 2 - b.height / 2
  );
};
