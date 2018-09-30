import { Selector, ClientFunction } from 'testcafe';

const startMockDrag = ClientFunction(() => {
    window.startMockDrag();
});

fixture`Home page`.page`http://localhost:8383`;

test('Code Window Test - Should display a code block', async t => {
    await t.wait(10000); // Await async resources loaded...
    await startMockDrag();
    await t
        .wait(1000)
        .expect(Selector('.code-window').find('py-codeblock').exists)
        //.expect(Selector(() => document.querySelector('#host').shadowRoot.querySelector('.filename')).contains('game.js'))
        .ok();
});

/*
import { Selector } from 'testcafe';

fixture`Getting Started`.page`http://devexpress.github.io/testcafe/example`;

test('My first test', async t => {
    await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button')
        .expect(Selector('#article-header').innerText)
        .eql('Thank you, John Smith!');
});
*/
