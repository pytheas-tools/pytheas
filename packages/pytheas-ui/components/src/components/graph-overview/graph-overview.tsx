import { Component, Prop, Event, EventEmitter, State, Method } from '@stencil/core';
import { OverviewData } from './overview-data';

@Component({
    tag: 'py-graph-overview',
    styleUrl: 'graph-overview.scss',
    shadow: false
})
export class GraphOverview {
    @Prop()
    data: OverviewData;

    @State()
    inDetailList = false;

    selectedType;
    selectedElements;

    @Event()
    graphOverviewDetailSelected: EventEmitter;
    @Event()
    graphElementSelected: EventEmitter;

    componentWillLoad() {
        console.log('GraphOverview is about to be rendered..: ', this.data);
    }

    componentDidLoad() {
        console.log('GraphOverview is rendered : ', this.data);
    }

    @Method()
    selectType(ev, notify) {
        this.selectedType = ev.target ? ev.target.dataset.type : ev;
        console.log('selectType: ', this.selectedType);
        if (this.data[this.selectedType]) {
            this.inDetailList = true;
            if (typeof notify === 'undefined') {
                this.graphOverviewDetailSelected.emit(this.selectedType);
            }
            this.selectedElements = this.data[this.selectedType];
        }
    }

    openElement(element) {
        this.graphElementSelected.emit(element);
    }

    renderInternal() {
        if (this.inDetailList) {
            return (
                <div class="type-list">
                    <div class="title">{this.selectedType}</div>
                    <ul>
                        {this.selectedElements.map(element => (
                            <li class={'type ' + this.selectedType} onClick={this.openElement.bind(this, element)}>
                                {element.name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <ul class="types-list">
                    {this.data.file ? (
                        <li class="type file" data-badge={this.data.file.length} onClick={this.selectType.bind(this)} data-type="file">
                            Files{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.class ? (
                        <li class="type class" data-badge={this.data.class.length} onClick={this.selectType.bind(this)} data-type="class">
                            Classes
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.function ? (
                        <li class="type function" data-badge={this.data.function.length} onClick={this.selectType.bind(this)} data-type="function">
                            Functions
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
            );
        }
    }

    render() {
        return <div class="container">{this.renderInternal()}</div>;
    }
}
