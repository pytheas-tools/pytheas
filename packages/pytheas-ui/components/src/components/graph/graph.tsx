import { Component, Prop, Event, EventEmitter, Method } from '@stencil/core';

import { jsPlumb } from 'jsplumb';

@Component({
    tag: 'py-graph',
    styleUrl: 'graph.scss'
})
export class Graph {
    @Prop()
    data: any;

    jsPlumbInstance;

    @Method()
    onExternalDragEvent() {
        this.jsPlumbInstance.repaintEverything();
    }

    @Event()
    graphElementSelected: EventEmitter;

    componentWillLoad() {
        console.log('Graph is about to be rendered..: ', this.data);
    }

    componentDidLoad() {
        console.log('Graph is rendered : ', this.data);
        this.jsPlumbInstance = jsPlumb.getInstance({
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
        });

        const connectorPaintStyleBlue = {
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

        this.jsPlumbInstance.connect({
            source: document.getElementById('c1_1'),
            target: document.getElementById('c2_1'),
            anchors: ['Right', 'Left'],
            endpoint: 'Blank',
            paintStyle: connectorPaintStyleYellow
        });
        this.jsPlumbInstance.connect({
            source: document.getElementById('c1_1'),
            target: document.getElementById('c1_2'),
            anchors: ['Right', 'Right'],
            endpoint: 'Blank',
            paintStyle: connectorPaintStyleYellow
        });
        this.jsPlumbInstance.connect({
            source: document.getElementById('c1_1'),
            target: document.getElementById('c1_3'),
            anchors: ['Right', 'Right'],
            endpoint: 'Blank',
            paintStyle: connectorPaintStyleBlue
        });
    }

    render() {
        return (
            <div class="container">
                <div class="class">
                    <div class="title">TicTacToe</div>
                    <div class="group">
                        <div class="title">Public</div>
                        <div id="c1_1" class="method">
                            start
                        </div>
                    </div>

                    <div class="group">
                        <div class="title">Private</div>
                        <div id="c1_2" class="method">
                            Reset
                        </div>
                        <div id="c1_3" class="property">
                            _players
                        </div>
                    </div>
                </div>
                <div class="class">
                    <div class="title">Field</div>
                    <div class="group">
                        <div class="title">Public</div>
                        <div id="c2_1" class="method">
                            init
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
