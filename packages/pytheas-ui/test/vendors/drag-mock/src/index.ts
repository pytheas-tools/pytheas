
function call(instance, methodName, args) {
  return instance[methodName].apply(instance, args);
}


// Just for unit testing:
import DataTransfer from './DataTransfer';

import DragDropAction from './DragDropAction';
import eventFactory from './eventFactory';


var dragMock = {
  dragStart: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'dragStart', arguments);
  },
  dragEnter: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'dragEnter', arguments);
  },
  dragOver: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'dragOver', arguments);
  },
  dragLeave: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'dragLeave', arguments);
  },
  drop: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'drop', arguments);
  },
  delay: function(targetElement, eventProperties, configCallback) {
    return call(new DragDropAction(), 'delay', arguments);
  },

  DataTransfer,
  DragDropAction,
  eventFactory
};

export default dragMock;
