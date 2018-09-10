/*var cy = cytoscape({
    container: document.getElementById('cy'),
    style: [
        {
            selector: 'node',
            css: {
                content: 'data(label)',
                shape: 'data(faveShape)',
                width: 'label',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },
        {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'triangle'
            }
        }
    ],

    layout: {
        name: 'grid',
        padding: 5
    }
});
var eles = cy.add([
    {
        group: 'nodes',
        data: {
            id: 'n0',
            label: 'game.ts',
            faveShape: 'roundrectangle'
        }
    },
    {
        group: 'nodes',
        data: {
            id: 'n0-1',
            label: 'Game',
            faveShape: 'roundrectangle',
            parent: 'n0'
        }
    },
    {
        group: 'nodes',
        data: {
            id: 'n1',
            label: 'player.ts',
            faveShape: 'roundrectangle'
        }
    },
    {
        group: 'nodes',
        data: {
            id: 'n1-1',
            label: 'Player',
            faveShape: 'roundrectangle',
            parent: 'n1'
        }
    },
    {
        group: 'edges',
        data: {
            id: 'e0',
            source: 'n0',
            target: 'n1'
        }
    }
]);
*/
var cy = (window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: [
        {
            selector: 'node',
            css: {}
        },
        {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'triangle'
            }
        },
        {
            selector: ':selected',
            css: {
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        },
        {
            selector: '.file',
            css: {
                'background-color': 'white',
                content: 'data(label)',
                color: '#bee1ad',
                'font-size': '10px',
                'border-color': '#bee1ad',
                shape: 'data(faveShape)',
                width: 'label',
                content: 'data(label)',
                padding: '0px',
                'text-valign': 'top',
                'text-halign': 'center'
            }
        },
        {
            selector: '.class',
            css: {
                'background-color': 'grey',
                content: 'data(label)',
                shape: 'data(faveShape)',
                width: 'label',
                color: '#3c3c3c',
                'text-valign': 'top',
                'text-halign': 'center'
            }
        },
        {
            selector: '.public',
            css: {
                'background-color': 'white',
                content: 'data(label)',
                shape: 'data(faveShape)',
                width: 'label',
                color: '#3c3c3c',
                'text-valign': 'top',
                'text-halign': 'center'
            }
        },
        {
            selector: '.private',
            css: {
                'background-color': 'white',
                content: 'data(label)',
                shape: 'data(faveShape)',
                width: 'label',
                color: '#3c3c3c',
                'text-valign': 'top',
                'text-halign': 'center'
            }
        },
        {
            selector: '.function',
            css: {
                'background-color': 'red',
                content: 'data(label)',
                shape: 'data(faveShape)',
                width: 'label',
                color: '#3c3c3c',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        }
    ],

    elements: {
        nodes: [
            {
                data: {
                    id: 'n0',
                    label: 'game.ts',
                    faveShape: 'roundrectangle'
                },
                classes: 'file'
            },
            {
                data: {
                    id: 'n0-class-1',
                    label: 'Game',
                    parent: 'n0',
                    faveShape: 'roundrectangle'
                },
                classes: 'class',
                position: { x: 0, y: 50 }
            },
            {
                data: {
                    id: 'n0-class-1-public-block',
                    label: 'Public',
                    parent: 'n0-class-1',
                    faveShape: 'roundrectangle'
                },
                classes: 'public',
                position: { x: 0, y: 70 }
            },
            {
                data: {
                    id: 'n0-class-1-private-block',
                    label: 'Private',
                    parent: 'n0-class-1',
                    faveShape: 'roundrectangle'
                },
                classes: 'private',
                position: { x: 0, y: 140 }
            },
            {
                data: {
                    id: 'n0-class-1-public-function',
                    label: 'start',
                    parent: 'n0-class-1-public-block',
                    faveShape: 'roundrectangle'
                },
                classes: 'function',
                position: { x: 0, y: 80 }
            },
            {
                data: {
                    id: 'n1',
                    label: 'player.ts',
                    faveShape: 'roundrectangle'
                },
                classes: 'file'
            },
            {
                data: {
                    id: 'n1-1',
                    label: 'Player',
                    parent: 'n1',
                    faveShape: 'roundrectangle'
                },
                position: { x: 100, y: 50 },
                classes: 'class'
            }
            /*{ data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
            { data: { id: 'b' } },
            { data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
            { data: { id: 'e' } },
            { data: { id: 'f', parent: 'e' }, position: { x: 600, y: 85 } }*/
        ],
        edges: [
            {
                data: {
                    id: 'eb',
                    source: 'n0-class-1-public-function',
                    target: 'n1-1'
                }
            }
            /*{ data: { id: 'eb', source: 'e', target: 'b' } }*/
        ]
    },

    layout: {
        name: 'preset',
        padding: 50
    }
}));
