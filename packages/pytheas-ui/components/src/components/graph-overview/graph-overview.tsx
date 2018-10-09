import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
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

    componentWillLoad() {
        console.log('GraphOverview is about to be rendered..: ', this.data);
    }

    componentDidLoad() {
        console.log('GraphOverview is rendered : ', this.data);
    }

    selectType(ev) {
        console.log('selectType: ', ev.target.dataset.type);
        this.selectedType = ev.target.dataset.type;
        if (this.data[this.selectedType]) {
            this.inDetailList = true;
            this.graphOverviewDetailSelected.emit();
            this.selectedElements = this.data[this.selectedType];
        }
    }

    renderInternal() {
        console.log('renderInternal: ', this.inDetailList);
        if (this.inDetailList) {
            console.log('render detail');

            return (
                <div class="type-list">
                    <div class="title">{this.selectedType}</div>
                    <ul>
                        {this.selectedElements.map(element => (
                            <li class={'type ' + this.selectedType}>{element.name}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            console.log('render types');

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
        console.log('render');

        return <div class="container">{this.renderInternal()}</div>;
    }
}
