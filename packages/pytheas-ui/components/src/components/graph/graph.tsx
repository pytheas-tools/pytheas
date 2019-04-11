import { Component, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';

import { jsPlumb } from 'jsplumb';

interface JsPlumbConnection {
    source?: any;
    target?: any;
    anchors?: any;
    endpoint: string;
    paintStyle: any;
}

@Component({
    tag: 'py-graph',
    styleUrl: 'graph.scss'
})
export class Graph {
    @Prop()
    data: any;

    centralElement;
    innerElements = [];
    outerElements = [];

    @Element()
    graphElement: HTMLElement;

    jsPlumbInstance;

    @Method()
    onExternalDragEvent() {
        this.jsPlumbInstance.repaintEverything();
    }

    @Method()
    async getJsPlumbInstance() {
        return this.jsPlumbInstance;
    }

    @Event()
    graphElementSelected: EventEmitter;

    componentWillLoad() {
        // console.log('Graph is about to be rendered..: ', this.data);

        this.centralElement = this.data;
        this.centralElement.relations.forEach(relation => {
            if (relation.type === 'in') {
                this.innerElements.push(relation.from);
            }
            if (relation.type === 'out' && relation.to) {
                this.outerElements.push(relation.to);
            }
        });
    }

    componentDidLoad() {
        // console.log('Graph is rendered : ', this);
        this.jsPlumbInstance = jsPlumb.getInstance({
            Container: document.querySelector('.graph-container__zoomable'),
            Connector: [
                'Flowchart',
                {
                    cornerRadius: 10
                }
            ],
            ConnectionOverlays: [
                [
                    'Arrow',
                    {
                        location: 1,
                        width: 10,
                        length: 10,
                        id: 'ARROW'
                    }
                ]
            ],
            Anchor: 'Center'
        });

        const connectorPaintStyleGrey = {
            strokeWidth: 2,
            stroke: '#e5e5e5',
            joinstyle: 'round',
            outlineStroke: 'transparent'
        };

        this.centralElement.relations.forEach(relation => {
            if (relation.to && relation.from) {
                const jsPlumbConnectionParameters: JsPlumbConnection = {
                    endpoint: 'Blank',
                    paintStyle: connectorPaintStyleGrey,
                    anchors: ['Right', 'Left']
                };
                jsPlumbConnectionParameters.source = document.getElementById(relation.from.id);
                jsPlumbConnectionParameters.target = document.getElementById(relation.to.id);
                this.jsPlumbInstance.connect(jsPlumbConnectionParameters);
            }
        });

        setTimeout(() => {
            this.onExternalDragEvent();
        }, 0);
    }

    componentDidUnload() {
        this.jsPlumbInstance.reset();
    }

    openElement(element) {
        this.graphElementSelected.emit(element);
    }

    render() {
        return (
            <div class="container jctx-host">
                <div class="inner-relations">{this.innerElements.map(element => this.renderBlockClass(element))}</div>
                {this.renderBlockClass(this.centralElement, 'central')}
                <div class="outer-relations">{this.outerElements.map(element => this.renderBlockClass(element))}</div>
            </div>
        );
    }

    renderBlockClass(classElement, optionalClass?) {
        return (
            <div
                class={'block-class ' + optionalClass}
                id={classElement.id}
                onClick={this.openElement.bind(this, classElement)}
                onTouchStart={this.openElement.bind(this, classElement)}
            >
                <div class={'block-class_title ' + (classElement.publicElements.length > 0 || classElement.privateElements.length > 0 ? 'has-child' : '')}>
                    {classElement.name}
                </div>
                {classElement.publicElements.length > 0 ? (
                    <div class="block-class_group">
                        <div class="container">
                            <div class="title">
                                <ion-icon name="ios-globe" />
                                Public
                            </div>
                            {this.renderPublicPrivateElements(classElement.publicElements)}
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {classElement.privateElements.length > 0 ? (
                    <div class="block-class_group">
                        <div class="container">
                            <div class="title">
                                <ion-icon name="ios-home" />
                                Private
                            </div>
                            {this.renderPublicPrivateElements(classElement.privateElements)}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }

    renderPublicPrivateElements(elements) {
        const lines = [];
        elements.forEach(element => {
            lines.push(<div class={element.kind}>{element.name}</div>);
        });
        return lines;
    }
}
