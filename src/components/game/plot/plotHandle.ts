import sceneEvents from '../events/eventCenter';

const plotHandle = (type: string) => {
  switch (type) {
    case 'roofQuest0':
      sceneEvents.emit(`dialog`, 0);
      sceneEvents.emit(`roof`, 0);
      sceneEvents.emit(`questLabel`, 3);
      sceneEvents.emit(`questLabel`, 0);
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
      break;

    default:
      break;
  }
};

export default plotHandle;
