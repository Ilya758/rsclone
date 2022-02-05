import sceneEvents from '../events/eventCenter';
import { ITracks } from '../scenes/dungeon.types';

const plotHandle = (type: string, tracks?: ITracks) => {
  switch (type) {
    case 'helicopter':
      sceneEvents.emit(`questLabelDestroy`, 8);
      sceneEvents.emit(`questLabel`, 9);
      sceneEvents.emit(`dialog`, 16);
      sceneEvents.emit(`zombie`, 4);
      break;
    case 'questBridge':
      sceneEvents.emit(`questLabelDestroy`, 7);
      sceneEvents.emit(`questLabel`, 8);
      break;
    case 'quest5':
      sceneEvents.emit(`questLabelDestroy`, 6);
      sceneEvents.emit(`dialog`, 15);
      sceneEvents.emit(`questLabel`, 7);
      break;
    case 'roofQuest0':
      sceneEvents.emit(`dialog`, 0);
      sceneEvents.emit(`roof`, 0);
      sceneEvents.emit(`questLabel`, 3);
      sceneEvents.emit(`questLabel`, 0);
      sceneEvents.emit('staticMusicStart', tracks?.static, tracks);
      break;
    case 'roofQuest1':
      sceneEvents.emit(`dialog`, 1);
      sceneEvents.emit(`roof`, 1);
      sceneEvents.emit(`questLabelDestroy`, 0);
      break;
    case 'zombie1':
      sceneEvents.emit(`dialog`, 2);
      sceneEvents.emit(`zombie`, 0);
      sceneEvents.emit(`questLabel`, 1);
      break;
    case 'killFirstZombie':
      sceneEvents.emit(`dialog`, 3);
      sceneEvents.emit(`questLabelDestroy`, 1);
      break;
    case 'killSecondZombies':
      sceneEvents.emit(`dialog`, 6);
      sceneEvents.emit(`questLabelDestroy`, 2);
      break;
    case 'killLastZombies':
      sceneEvents.emit(`dialog`, 7);
      sceneEvents.emit(`questLabelDestroy`, 5);
      break;
    case 'killZombie21':
      sceneEvents.emit(`dialog`, 13);
      break;
    case 'killZombie100':
      sceneEvents.emit(`dialog`, 14);
      break;
    case 'roofQuest2':
      sceneEvents.emit(`roof`, 2);
      sceneEvents.emit(`zombie`, 1);
      sceneEvents.emit(`dialog`, 4);
      sceneEvents.emit(`questLabel`, 2);
      break;
    case 'roofQuest3':
      sceneEvents.emit(`roof`, 3);
      sceneEvents.emit(`zombie`, 2);
      sceneEvents.emit(`dialog`, 4);
      sceneEvents.emit(`questLabel`, 5);
      // sceneEvents.emit(`zombieBoss`, 1);
      break;
    case 'roofQuest4':
      sceneEvents.emit(`questLabelDestroy`, 3);
      sceneEvents.emit(`hide`);
      sceneEvents.emit(`zombie`, 3);
      sceneEvents.emit(`questLabel`, 6);
      sceneEvents.emit('dynamicMusicStart', tracks);
      break;
    default:
      break;
  }
};

export default plotHandle;
