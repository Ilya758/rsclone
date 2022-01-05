export interface IUserCredentials {
  login: string;
  password: string;
}

interface IUserInteractiveButtons {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  mouseButtons: Phaser.Input.Pointer;
}
