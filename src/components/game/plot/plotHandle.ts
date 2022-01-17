import sceneEvents from '../events/eventCenter';

const plotHandle = (type: string) => {
  switch (type) {
    case 'roofQuest0':
      sceneEvents.emit(`dialog`, 0);
      sceneEvents.emit(`roof`, 0);
      break;
    case 'roofQuest1':
      sceneEvents.emit(`dialog`, 1);
      sceneEvents.emit(`roof`, 1);
      break;
    case 'roofQuest2':
      sceneEvents.emit(`roof`, 2);
      break;
    case 'roofQuest3':
      sceneEvents.emit(`roof`, 3);
      break;

    default:
      break;
  }
};

export default plotHandle;
