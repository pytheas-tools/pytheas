var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h } from './core-e9f2a14b.js';
var GraphOverview = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.inDetailList = false;
        this.graphOverviewDetailSelected = createEvent(this, "graphOverviewDetailSelected", 7);
        this.graphElementSelected = createEvent(this, "graphElementSelected", 7);
    }
    class_1.prototype.componentWillLoad = function () {
        // console.log('GraphOverview is about to be rendered..: ', this.data);
        this.dataOrderedByFirstLetter = this.orderByLetter(this.data);
    };
    class_1.prototype.orderByLetter = function (els) {
        var files = {}, classes = {};
        function sortObject(o) {
            return Object.keys(o)
                .sort()
                .reduce(function (r, k) { return ((r[k] = o[k]), r); }, {});
        }
        var groupByFirstLetter = function (element, list) {
            var firstLetter = element.name.charAt(0);
            if (list[firstLetter]) {
                list[firstLetter].elements.push(element);
            }
            else {
                list[firstLetter] = { elements: [element] };
            }
        };
        els.file.forEach(function (element) {
            return groupByFirstLetter(element, files);
        });
        els.class.forEach(function (element) {
            return groupByFirstLetter(element, classes);
        });
        files = sortObject(files);
        classes = sortObject(classes);
        return { file: files, class: classes };
    };
    class_1.prototype.componentDidLoad = function () {
        // console.log('GraphOverview is rendered : ', this.data);
    };
    class_1.prototype.selectType = function (ev, notify) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedType = ev.target ? ev.target.dataset.type : ev;
                // console.log('selectType: ', this.selectedType);
                if (this.dataOrderedByFirstLetter[this.selectedType]) {
                    this.inDetailList = true;
                    if (typeof notify === 'undefined') {
                        this.graphOverviewDetailSelected.emit(this.selectedType);
                    }
                    this.selectedElements = this.dataOrderedByFirstLetter[this.selectedType];
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.openElement = function (element) {
        this.graphElementSelected.emit(element);
    };
    class_1.prototype.getPluralForType = function (type) {
        var pluralForType = '';
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
    };
    class_1.prototype.renderListOfElements = function (elements) {
        var _this = this;
        var lines = [];
        elements.map(function (element) {
            lines.push(h("li", { class: 'graph-overview__type ' + _this.selectedType, onClick: _this.openElement.bind(_this, element), onTouchStart: _this.openElement.bind(_this, element) }, element.name));
        });
        return lines;
    };
    class_1.prototype.renderInternal = function () {
        var _this = this;
        if (this.inDetailList) {
            return (h("div", { class: "graph-overview__type-list" }, h("div", { class: "graph-overview__type-list__spacer" }, h("div", { class: "title" }, this.getPluralForType(this.selectedType)), h("ul", null, Object.keys(this.selectedElements).map(function (key) { return (h("li", null, h("span", { class: "letter-group" }, key), h("ul", { class: "elements" }, _this.renderListOfElements(_this.selectedElements[key].elements)))); })))));
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
    };
    class_1.prototype.render = function () {
        return this.renderInternal();
    };
    Object.defineProperty(class_1, "style", {
        get: function () { return "py-graph-overview{width:100%;height:100%}.graph-overview__container,py-graph-overview{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.graph-overview__types-list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;list-style-type:none;margin:0;padding:0;margin:auto}.graph-overview__type-list__spacer{border:1px solid #c4c2c2;border-radius:10px;margin:20px}.graph-overview__type-list{margin:auto}.graph-overview__type-list .title{background:#c4c2c2;color:#000;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px 0;display:inline-block;font-weight:700;text-align:center;width:100%}.graph-overview__type-list .letter-group{color:#a2a2a2;font-size:15px;text-transform:uppercase;font-weight:700}.graph-overview__type-list ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;list-style-type:none;margin:20px 20px 10px 20px;padding:0}.graph-overview__type-list ul.elements{margin:10px 0}.graph-overview__type{padding:10px;border-radius:8px;margin-bottom:15px;position:relative;cursor:pointer}.graph-overview__type.file{background:#c1e1aa}.graph-overview__type.class{background:#e6e6e6}.graph-overview__type.function{background:#f1d16e}.graph-overview__type[data-badge]:after{content:attr(data-badge);position:absolute;top:-10px;right:-10px;font-size:.7em;background:#fff;color:#000;width:18px;height:18px;text-align:center;line-height:18px;border-radius:50%;-webkit-box-shadow:0 0 1px #333;box-shadow:0 0 1px #333}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { GraphOverview as py_graph_overview };
