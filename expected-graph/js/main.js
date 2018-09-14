jsPlumb.ready(function() {
    console.log('jsPlumb ready');

    var j = (window.j = jsPlumb.getInstance({
        Container: 'canvas',
        Connector: 'Flowchart',
        ConnectionOverlays: [
            [
                'Arrow',
                {
                    location: 1,
                    width: 11,
                    length: 11,
                    id: 'ARROW'
                }
            ]
        ],
        Anchor: 'Center'
    }));

    var connectorPaintStyleBlue = {
            strokeWidth: 2,
            stroke: '#61B7CF',
            joinstyle: 'round',
            outlineStroke: 'transparent'
        },
        connectorPaintStyleYellow = {
            strokeWidth: 2,
            stroke: '#f9bb43',
            joinstyle: 'round',
            outlineStroke: 'transparent'
        };

    j.connect({
        source: c1_1,
        target: c2_1,
        anchors: ['Right', 'Left'],
        endpoint: 'Blank',
        paintStyle: connectorPaintStyleYellow
    });

    j.connect({
        source: c1_1,
        target: c1_2,
        anchors: ['Right', 'Right'],
        endpoint: 'Blank',
        paintStyle: connectorPaintStyleYellow
    });

    j.connect({
        source: c1_1,
        target: c1_3,
        anchors: ['Right', 'Right'],
        endpoint: 'Blank',
        paintStyle: connectorPaintStyleBlue
    });
});
