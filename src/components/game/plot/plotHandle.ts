import sceneEvents from '../events/eventCenter';

const plotHandle = (type: string) => {
  switch (type) {
    case 'roofQuest0':
      sceneEvents.emit(`dialog`, 0);
      sceneEvents.emit(`roof`, 0);
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
    case 'roofQuest2':
      sceneEvents.emit(`roof`, 2);
      sceneEvents.emit(`zombies`, 0);
      sceneEvents.emit(`dialog`, 4);
      break;
    case 'roofQuest3':
      sceneEvents.emit(`roof`, 3);
      sceneEvents.emit(`zombies`, 1);
      sceneEvents.emit(`zombieBoss`, 1);
      break;
    case 'roofQuest4':
      sceneEvents.emit(`hide`);
      break;

    default:
      break;
  }
};

export default plotHandle;
