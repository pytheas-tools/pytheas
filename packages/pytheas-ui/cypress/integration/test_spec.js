describe('Pytheas E2E tests', function() {
    it('Visit application, and launch demo TypeScript', function() {
        cy.visit('http://localhost:8383/');

        /**
         * Select demo
         */
        cy.get('#demo-projects-selector').select('typescript');
        cy.get('py-codeblock').contains('8 files');

        /**
         * Select classes on left panel
         */
        cy.get('py-graph-overview')
            .find('li')
            .click();

        /**
         * Select first class on left panel
         */
        cy.get('py-graph-overview')
            .first('li')
            .click();
        cy.get('py-codeblock')
            .first()
            .contains('class Main');

        /**
         * Go home
         */
        cy.get('py-navigation-bar')
            .find('.home')
            .click();
        cy.get('py-codeblock').contains('8 files');
    });

    it('Visit application, and launch demo JavaScript', function() {
        cy.visit('http://localhost:8383/');

        /**
         * Select demo
         */
        cy.get('#demo-projects-selector').select('javascript');
        cy.get('py-codeblock').contains('5 files');

        /**
         * Select classes on left panel
         */
        cy.get('py-graph-overview')
            .find('li')
            .click();

        /**
         * Select first class on left panel
         */
        cy.get('py-graph-overview')
            .first('li')
            .first('li')
            .contains('Game')
            .click();
        cy.get('py-codeblock')
            .first()
            .contains('class Game');

        /**
         * Go home
         */
        cy.get('py-navigation-bar')
            .find('.home')
            .click();
        cy.get('py-codeblock').contains('5 files');
    });
});
