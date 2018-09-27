Cypress.Commands.add('upload_file', (selector, fileUrl, type = '') => {
    return cy.fixture(fileUrl, 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
            const nameSegments = fileUrl.split('/')
            const name = nameSegments[nameSegments.length - 1]
            const testFile = new File([blob], name, {
                type
            })
            const event = {
                dataTransfer: {
                    files: [testFile]
                }
            }
            return cy.get(selector).trigger('drop', event)
        })
});

Cypress.Commands.add('uploadFile', (filePath) => {
    cy.fixture(filePath).as('file')
        .document()
        .then(function(doc) {
            const testFile = new File([this.file], 'game.js');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            const event = {
                dataTransfer: dataTransfer
            }
            return cy.get('html').trigger('drop', event);
        });
});