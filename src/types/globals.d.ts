export interface IUserCredentials {
  login: string;
  password: string;
}

export interface IUserKeys {
  [Key: string]: Phaser.Input.Keyboard.Key;
}
