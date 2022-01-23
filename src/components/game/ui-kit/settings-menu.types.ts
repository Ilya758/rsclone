export type TSound = Phaser.Sound.WebAudioSound;

export interface ISounds extends Phaser.Sound.WebAudioSoundManager {
  sounds: [TSound];
}
