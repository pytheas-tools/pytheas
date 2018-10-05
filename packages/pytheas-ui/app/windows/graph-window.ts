class GraphWindow {
    $element: HTMLElement;

    private static instance: GraphWindow;
    private constructor() {}
    static getInstance() {
        if (!GraphWindow.instance) {
            GraphWindow.instance = new GraphWindow();
        }
        return GraphWindow.instance;
    }

    init(element: HTMLElement) {
        this.$element = element;
    }
}

export default GraphWindow.getInstance();
