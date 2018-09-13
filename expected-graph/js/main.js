jsPlumb.ready(function() {
    console.log('jsPlumb ready');

    var j = window.j = jsPlumb.getInstance({
        Container: 'canvas',
        Connector: "Flowchart",
        Endpoint: ["Dot", {
            radius: 3
        }],
        Anchor: "Center"
    });

    var connectorPaintStyle = {
        strokeWidth: 2,
        stroke: "#61B7CF",
        joinstyle: "round",
        outlineStroke: "white",
        outlineWidth: 2
    }

    j.connect({
        source: c1_1,
        target: c2_1,
        anchors: ["Right", "Left"],
        endpoint: "Dot"
    });

    j.connect({
        source: c1_1,
        target: c1_2,
        anchors: ["Right", "Right"],
        endpoint: "Dot"
    });
});