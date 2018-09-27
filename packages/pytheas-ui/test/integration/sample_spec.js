beforeEach(() => {
    cy.on('window:before:load', win => {
        cy.spy(win.console, 'log');
    });
});

describe('My First Test', function() {
    it('Does not do much!', function() {
        //cy.fixture('game.js').as('file');
        //cy.upload_file('document', 'game.js');
        cy.visit('');
        cy.uploadFile('game.js');
        expect(true).to.equal(true);
    });
});
