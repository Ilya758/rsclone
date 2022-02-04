import { IUserInteractiveButtons } from '../types/globals';

export const createUserKeys = (
  input: Phaser.Input.InputPlugin
): IUserInteractiveButtons => {
  const left = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  const right = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  const down = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  const up = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  const one = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
  const two = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  const three = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
  const four = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  const five = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
  const reload = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  const mouseButtons = input.mousePointer;

  return {
    left,
    right,
    down,
    up,
    mouseButtons,
    one,
    two,
    three,
    four,
    five,
    reload,
  };
};
