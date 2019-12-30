import { r as registerInstance, c as createEvent, h } from './core-e9f2a14b.js';

const GraphOverview = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inDetailList = false;
        this.graphOverviewDetailSelected = createEvent(this, "graphOverviewDetailSelected", 7);
        this.graphElementSelected = createEvent(this, "graphElementSelected", 7);
    }
    componentWillLoad() {
        // console.log('GraphOverview is about to be rendered..: ', this.data);
        this.dataOrderedByFirstLetter = this.orderByLetter(this.data);
    }
    orderByLetter(els) {
        let files = {}, classes = {};
        function sortObject(o) {
            return Object.keys(o)
                .sort()
                .reduce((r, k) => ((r[k] = o[k]), r), {});
        }
        const groupByFirstLetter = (element, list) => {
            const firstLetter = element.name.charAt(0);
            if (list[firstLetter]) {
                list[firstLetter].elements.push(element);
            }
            else {
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
        // console.log('GraphOverview is rendered : ', this.data);
    }
    async selectType(ev, notify) {
        this.selectedType = ev.target ? ev.target.dataset.type : ev;
        // console.log('selectType: ', this.selectedType);
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
    getPluralForType(type) {
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
            lines.push(h("li", { class: 'graph-overview__type ' + this.selectedType, onClick: this.openElement.bind(this, element), onTouchStart: this.openElement.bind(this, element) }, element.name));
        });
        return lines;
    }
    renderInternal() {
        if (this.inDetailList) {
            return (h("div", { class: "graph-overview__type-list" }, h("div", { class: "graph-overview__type-list__spacer" }, h("div", { class: "title" }, this.getPluralForType(this.selectedType)), h("ul", null, Object.keys(this.selectedElements).map(key => (h("li", null, h("span", { class: "letter-group" }, key), h("ul", { class: "elements" }, this.renderListOfElements(this.selectedElements[key].elements)))))))));
        }
        else {
            return (h("ul", { class: "graph-overview__types-list" }, this.data.file.length > 0
                ? /*<li
                    class="graph-overview__type file"
                    data-badge={this.data.file.length}
                    onClick={this.selectType.bind(this)}
                    onTouchStart={this.selectType.bind(this)}
                    data-type="file"
                >
                    Files{' '}
                </li>*/
                    ''
                : '', this.data.class.length > 0 ? (h("li", { class: "graph-overview__type class", "data-badge": this.data.class.length, onClick: this.selectType.bind(this), onTouchStart: this.selectType.bind(this), "data-type": "class" }, "Classes")) : (''), this.data.function.length > 0
                ? /*<li
                    class="graph-overview__type function"
                    data-badge={this.data.function.length}
                    onClick={this.selectType.bind(this)}
                    onTouchStart={this.selectType.bind(this)}
                    data-type="function"
                >
                    Functions
                </li>*/
                    ''
                : ''));
        }
    }
    render() {
        return this.renderInternal();
    }
    static get style() { return "py-graph-overview{width:100%;height:100%}.graph-overview__container,py-graph-overview{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.graph-overview__types-list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;list-style-type:none;margin:0;padding:0;margin:auto}.graph-overview__type-list__spacer{border:1px solid #c4c2c2;border-radius:10px;margin:20px}.graph-overview__type-list{margin:auto}.graph-overview__type-list .title{background:#c4c2c2;color:#000;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px 0;display:inline-block;font-weight:700;text-align:center;width:100%}.graph-overview__type-list .letter-group{color:#a2a2a2;font-size:15px;text-transform:uppercase;font-weight:700}.graph-overview__type-list ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;list-style-type:none;margin:20px 20px 10px 20px;padding:0}.graph-overview__type-list ul.elements{margin:10px 0}.graph-overview__type{padding:10px;border-radius:8px;margin-bottom:15px;position:relative;cursor:pointer}.graph-overview__type.file{background:#c1e1aa}.graph-overview__type.class{background:#e6e6e6}.graph-overview__type.function{background:#f1d16e}.graph-overview__type[data-badge]:after{content:attr(data-badge);position:absolute;top:-10px;right:-10px;font-size:.7em;background:#fff;color:#000;width:18px;height:18px;text-align:center;line-height:18px;border-radius:50%;-webkit-box-shadow:0 0 1px #333;box-shadow:0 0 1px #333}"; }
};

export { GraphOverview as py_graph_overview };
