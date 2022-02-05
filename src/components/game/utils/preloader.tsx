export const preloader = (scene: Phaser.Scene) => {
  const width = scene.cameras.main.width;
  const height = scene.cameras.main.height;
  const progressBar = scene.add.graphics();
  const progressBox = scene.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

  const loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      color: '#ffffff',
    },
  });
  loadingText.setOrigin(0.5, 0.5);

  const percentText = scene.make.text({
    x: width / 2,
    y: height / 2,
    text: '0%',
    style: {
      font: '18px monospace',
      color: '#ffffff',
    },
  });
  percentText.setOrigin(0.5, 0.5);

  const assetText = scene.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      color: '#ffffff',
    },
  });
  assetText.setOrigin(0.5, 0.5);

  scene.load.on('progress', function (value: number) {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    percentText.setText(parseInt(String(value * 100)) + '%');
  });

  scene.load.on('fileprogress', function (file: { src: string }) {
    assetText.setText('Loading asset: ' + file.src);
  });
  scene.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });
};
