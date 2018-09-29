beforeEach(() => {
    cy.on('window:before:load', win => {
        cy.spy(win.console, 'log');
    });
});

describe('Code Window Test', function() {
    it('Should display a code block', function() {
        cy.visit('');
        cy.window().then(win => {
            win.startMockDrag();
            cy.wait(500);
            cy.get('.code-window').find('py-codeblock');
        });
    });
});
