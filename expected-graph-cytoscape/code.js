fetch('data.json')
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        var cy = cytoscape({
            container: document.getElementById('cy'),
            elements: data,
            style: [{
                selector: 'node',
                style: {
                    shape: 'hexagon',
                    'background-color': 'red',
                    label: 'data(id)'
                }
            }],
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: {
                name: 'cose',
                animate: false
            }
        });
    });