beforeEach(() => {
    cy.on('window:before:load', win => {
        cy.spy(win.console, 'log');
    });
});

describe('My First Test', function() {
    it('Does not do much!', function() {
        cy.visit('');
        cy.window().then(win => {
            win.startMockDrag();
            expect(true).to.equal(true);
        });
    });
});
