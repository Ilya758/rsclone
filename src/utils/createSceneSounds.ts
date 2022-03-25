import Enemy from '../components/game/enemies/abstract/Enemy';
import Person from '../components/game/person/Person';
import Arena from '../components/game/scenes/Arena';
import Dungeon from '../components/game/scenes/Dungeon';
import { TWeaponSounds } from '../components/game/scenes/dungeon.types';
import { WEAPONS } from '../constants/weapons';

export const createSceneSounds = (scene: Dungeon | Arena) => {
  WEAPONS.forEach(weapon => {
    const shot = scene.sound.add(`${weapon}-shot`, {
      volume: 0.5,
      loop: true,
    });
    const reload = scene.sound.add(`${weapon}-reload`, {
      volume: 0.5,
      loop: false,
    });

    const currentWeapon = weapon as keyof TWeaponSounds;

    scene.weaponSoundsShot[currentWeapon] = shot;
    scene.weaponSoundsReload[currentWeapon] = reload;
  });

  scene.personSounds = Person.createPersonSounds(scene);

  if (scene instanceof Dungeon) {
    scene.enemySounds = Enemy.createEnemySounds(scene);

    scene.tracks = {
      static: scene.sound.add('track-static', {
        volume: 0.4,
        loop: true,
      }),
      dynamic: scene.sound.add('track-dynamic', {
        volume: 0.4,
        loop: true,
      }),
    };
  }
};
