import { Component, Prop, Event, EventEmitter, State, Method } from '@stencil/core';
import { OverviewData } from './overview-data';

@Component({
    tag: 'py-graph-overview',
    styleUrl: 'graph-overview.scss'
})
export class GraphOverview {
    @Prop()
    data: OverviewData;

    dataOrderedByFirstLetter;

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
        this.dataOrderedByFirstLetter = this.orderByLetter(this.data);
    }

    orderByLetter(els) {
        let files = {},
            classes = {};

        function sortObject(o) {
            return Object.keys(o)
                .sort()
                .reduce((r, k) => ((r[k] = o[k]), r), {});
        }

        const groupByFirstLetter = (element, list) => {
            const firstLetter = element.name.charAt(0);
            if (list[firstLetter]) {
                list[firstLetter].elements.push(element);
            } else {
                list[firstLetter] = { elements: [element] };
            }
        };

        els.file.forEach(element => {
            return groupByFirstLetter(element, files);
        });
        els.class.forEach(element => {
            return groupByFirstLetter(element, classes);
        });

        files = sortObject(files);
        classes = sortObject(classes);

        return { file: files, class: classes };
    }

    componentDidLoad() {
        console.log('GraphOverview is rendered : ', this.data);
    }

    @Method()
    selectType(ev, notify) {
        this.selectedType = ev.target ? ev.target.dataset.type : ev;
        console.log('selectType: ', this.selectedType);
        if (this.dataOrderedByFirstLetter[this.selectedType]) {
            this.inDetailList = true;
            if (typeof notify === 'undefined') {
                this.graphOverviewDetailSelected.emit(this.selectedType);
            }
            this.selectedElements = this.dataOrderedByFirstLetter[this.selectedType];
        }
    }

    openElement(element) {
        this.graphElementSelected.emit(element);
    }

    getPluralForType(type: string): string {
        let pluralForType = '';
        switch (type) {
            case 'file':
                pluralForType = 'Files';
                break;
            case 'class':
                pluralForType = 'Classes';
                break;
            case 'function':
                pluralForType = 'Functions';
                break;
            default:
                break;
        }
        return pluralForType;
    }

    renderListOfElements(elements) {
        const lines = [];
        elements.map(element => {
            lines.push(
                <li
                    class={'graph-overview__type ' + this.selectedType}
                    onClick={this.openElement.bind(this, element)}
                    onTouchStart={this.openElement.bind(this, element)}
                >
                    {element.name}
                </li>
            );
        });
        return lines;
    }

    renderInternal() {
        if (this.inDetailList) {
            return (
                <div class="graph-overview__type-list">
                    <div class="graph-overview__type-list__spacer">
                        <div class="title">{this.getPluralForType(this.selectedType)}</div>
                        <ul>
                            {Object.keys(this.selectedElements).map(key => (
                                <li>
                                    <span class="letter-group">{key}</span>
                                    <ul class="elements">{this.renderListOfElements(this.selectedElements[key].elements)}</ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <ul class="graph-overview__types-list">
                    {this.data.file ? (
                        <li
                            class="graph-overview__type file"
                            data-badge={this.data.file.length}
                            onClick={this.selectType.bind(this)}
                            onTouchStart={this.selectType.bind(this)}
                            data-type="file"
                        >
                            Files{' '}
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.class ? (
                        <li
                            class="graph-overview__type class"
                            data-badge={this.data.class.length}
                            onClick={this.selectType.bind(this)}
                            onTouchStart={this.selectType.bind(this)}
                            data-type="class"
                        >
                            Classes
                        </li>
                    ) : (
                        ''
                    )}
                    {this.data.function ? (
                        <li
                            class="graph-overview__type function"
                            data-badge={this.data.function.length}
                            onClick={this.selectType.bind(this)}
                            onTouchStart={this.selectType.bind(this)}
                            data-type="function"
                        >
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
        return this.renderInternal();
    }
}
