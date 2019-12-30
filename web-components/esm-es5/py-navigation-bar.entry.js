import { r as registerInstance, c as createEvent, h } from './core-e9f2a14b.js';
var NavigationBar = /** @class */ (function () {
    function NavigationBar(hostRef) {
        registerInstance(this, hostRef);
        this.nextDisabled = true;
        this.backDisabled = true;
        this.navigationBarBackEvent = createEvent(this, "navigationBarBackEvent", 7);
        this.navigationBarHomeEvent = createEvent(this, "navigationBarHomeEvent", 7);
        this.navigationBarNextEvent = createEvent(this, "navigationBarNextEvent", 7);
    }
    NavigationBar.prototype.back = function () {
        this.navigationBarBackEvent.emit();
    };
    NavigationBar.prototype.home = function () {
        this.navigationBarHomeEvent.emit();
    };
    NavigationBar.prototype.next = function () {
        this.navigationBarNextEvent.emit();
    };
    NavigationBar.prototype.render = function () {
        return (h("div", { class: "navigation-bar__container" }, h("div", { class: "navigation-bar__history-buttons" }, h("button", { class: 'navigation-bar__history-buttons__button back ' + (this.backDisabled ? 'disabled' : ''), title: "Back", type: "button", onClick: this.back.bind(this) }, "<"), h("button", { class: "navigation-bar__history-buttons__button home", title: "Home", type: "button", onClick: this.home.bind(this) }, h("img", { src: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDYzLjY5OSA2My42OTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYzLjY5OSA2My42OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNjMuNjYzLDI5LjQyNGMtMC4xNDMtMS4wOTMtMC43MDEtMi4wNjUtMS41NzUtMi43MzdsLTExLjcxNS05LjAyMVY4LjYwOGMwLTIuMjc1LTEuODUxLTQuMTI2LTQuMTI1LTQuMTI2ICAgYy0yLjI3MywwLTQuMTI1LDEuODUxLTQuMTI1LDQuMTI2djIuNzA1bC03Ljc1OC01Ljk3NWMtMC43MTgtMC41NTEtMS42MTItMC44NTYtMi41MTctMC44NTZjLTAuOTA2LDAtMS44MDEsMC4zMDQtMi41MTksMC44NTcgICBMMS42MDYsMjYuNjg3Yy0xLjgwMiwxLjM4OS0yLjEzOSwzLjk4My0wLjc1MSw1Ljc4NWMwLjc4OCwxLjAyMiwxLjk3OSwxLjYwOCwzLjI3MSwxLjYwOGMwLjY2NCwwLDEuMzAyLTAuMTUzLDEuODgtMC40NTFWNTUuMDkgICBjMCwyLjI3NSwxLjg1MSw0LjEyNyw0LjEyNiw0LjEyN2gxOC41MzRWMzkuNzMyaDYuMzUxdjE5LjQ4MmgxOC4yNzFjMi4yNzQsMCw0LjEyNS0xLjg1LDQuMTI1LTQuMTI3VjMzLjQ3MiAgIGMwLjY0OSwwLjM5OSwxLjM4NywwLjYwOCwyLjE1NywwLjYwOGMxLjI4OSwwLDIuNDgyLTAuNTg2LDMuMjctMS42MDZDNjMuNTE0LDMxLjYwMSw2My44MDcsMzAuNTE4LDYzLjY2MywyOS40MjR6IE01OS44MTksMzAuMTQ0ICAgYy0wLjA4LDAuMTA1LTAuMTg5LDAuMTIyLTAuMjQ3LDAuMTIyYy0wLjA2OSwwLTAuMTMyLTAuMDIxLTAuMTg4LTAuMDY1TDUzLjYsMjUuNzQ4VjU1LjA5YzAsMC4xNzMtMC4xNCwwLjMxMi0wLjMxMSwwLjMxMkgzOC44MzIgICBsMC4wMDEtMTkuNDg0SDI0Ljg1MnYxOS40ODRIMTAuMTMyYy0wLjE3MSwwLTAuMzEtMC4xNDEtMC4zMS0wLjMxMlYyNS45Nkw0LjMxNSwzMC4yYy0wLjA1NiwwLjA0My0wLjExOSwwLjA2NS0wLjE4OCwwLjA2NSAgIGMtMC4wNTksMC0wLjE2Ny0wLjAxNy0wLjI0OC0wLjEyMWMtMC4wNjUtMC4wODQtMC4wNy0wLjE3MS0wLjA2Mi0wLjIyOWMwLjAwNy0wLjA1OCwwLjAzNC0wLjE0MSwwLjExOC0wLjIwNUwzMS42NjEsOC4zNjMgICBjMC4xMzgtMC4xMDUsMC4yMzktMC4xMDYsMC4zNzksMGwxMy44OTksMTAuNzAzVjguNjA4YzAtMC4xNzIsMC4xNC0wLjMxMSwwLjMxMS0wLjMxMXMwLjMxMiwwLjEzOSwwLjMxMiwwLjMxMXYxMC45MzUgICBsMTMuMjA1LDEwLjE2NmMwLjA4NCwwLjA2NCwwLjEwOCwwLjE0NywwLjExNiwwLjIwNUM1OS44OTEsMjkuOTc1LDU5Ljg4NSwzMC4wNjIsNTkuODE5LDMwLjE0NHoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" })), h("button", { class: 'navigation-bar__history-buttons__button next ' + (this.nextDisabled ? 'disabled' : ''), title: "Next", type: "button", onClick: this.next.bind(this) }, ">")), h("input", { type: "text", readonly: true, class: "navigation-bar__history-bar", value: this.current })));
    };
    Object.defineProperty(NavigationBar, "style", {
        get: function () { return "py-navigation-bar{padding:8px;display:block;z-index:5}.navigation-bar__container{display:-ms-flexbox;display:flex}.navigation-bar__history-buttons{margin-right:10px;display:-ms-flexbox;display:flex}.navigation-bar__history-bar{-ms-flex-positive:1;flex-grow:1;padding:5px}.navigation-bar__history-buttons__button{width:30px;height:30px;border-radius:15px;padding:0;font-weight:700;font-size:12px;cursor:pointer;border:1px solid #afaeae;margin-left:2px;background:#afaeae;color:#fff}.navigation-bar__history-buttons__button:focus{outline:none}.navigation-bar__history-buttons__button:hover{border-color:#8b8a8a}.navigation-bar__history-buttons__button.disabled{opacity:.5;pointer-events:none}"; },
        enumerable: true,
        configurable: true
    });
    return NavigationBar;
}());
export { NavigationBar as py_navigation_bar };
