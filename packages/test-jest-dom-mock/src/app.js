document.addEventListener('drop', ev => {
    ev.preventDefault();
    console.log('drop');
});
document.addEventListener('dragover', () => {
    event.preventDefault();
});

setTimeout(() => {
    console.log('mock');
    var dragSource = document.createElement('div');
    dragMock
        .dragStart(dragSource, function(event, eventName) {
            console.log('dragMock dragStart: ', event, eventName);
            if (event.dataTransfer) {
                event.dataTransfer.setData('application/json', {
                    hello: 'world'
                });
            }
        })
        .drop(document, function(dropEvent) {
            // a callback with less than two parameters will only be called once for the primary ('drop') event
            if (dropEvent.dataTransfer) {
                var data = dropEvent.dataTransfer.getData('application/json');
                console.log('dragMock drop: ', dropEvent, data);
            }
        });
}, 3000);
