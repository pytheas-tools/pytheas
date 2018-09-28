Cypress.Commands.add('uploadFile', filePath => {
    return cy.fixture(filePath).then(function(file) {
        const testFile = new File(['foo'], 'foo.txt', {
            type: 'text/plain'
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        const event = {
            dataTransfer: dataTransfer
        };
        // cy.log('event ' + event.dataTransfer.files);
        return cy.get('html').trigger('drop', event);
    });
});
