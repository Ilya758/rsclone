import { IUserKeys } from '../types/globals';

export const createUserKeys = (input: Phaser.Input.InputPlugin): IUserKeys => {
  const left = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  const right = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  const down = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  const up = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  return {
    left,
    right,
    down,
    up,
  };
};
