import { h } from "@stencil/core";
export class GraphOverview {
    constructor() {
        this.inDetailList = false;
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
            return (h("div", { class: "graph-overview__type-list" },
                h("div", { class: "graph-overview__type-list__spacer" },
                    h("div", { class: "title" }, this.getPluralForType(this.selectedType)),
                    h("ul", null, Object.keys(this.selectedElements).map(key => (h("li", null,
                        h("span", { class: "letter-group" }, key),
                        h("ul", { class: "elements" }, this.renderListOfElements(this.selectedElements[key].elements)))))))));
        }
        else {
            return (h("ul", { class: "graph-overview__types-list" },
                this.data.file.length > 0
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
                    : '',
                this.data.class.length > 0 ? (h("li", { class: "graph-overview__type class", "data-badge": this.data.class.length, onClick: this.selectType.bind(this), onTouchStart: this.selectType.bind(this), "data-type": "class" }, "Classes")) : (''),
                this.data.function.length > 0
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
    static get is() { return "py-graph-overview"; }
    static get originalStyleUrls() { return {
        "$": ["graph-overview.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["graph-overview.css"]
    }; }
    static get properties() { return {
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "OverviewData",
                "resolved": "OverviewData",
                "references": {
                    "OverviewData": {
                        "location": "import",
                        "path": "./overview-data"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "inDetailList": {}
    }; }
    static get events() { return [{
            "method": "graphOverviewDetailSelected",
            "name": "graphOverviewDetailSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "graphElementSelected",
            "name": "graphElementSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "selectType": {
            "complexType": {
                "signature": "(ev: any, notify: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
