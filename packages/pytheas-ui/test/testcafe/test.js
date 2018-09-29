import { Selector, ClientFunction } from 'testcafe';

const startMockDrag = ClientFunction(() => {
    window.startMockDrag();
});

fixture`Home page`.page`http://localhost:8383`;

test('Code Window Test - Should display a code block', async t => {
    await t.wait(5000); // Await async resources loaded...
    await startMockDrag();
    await t
        .wait(500)
        .expect(Selector('.code-window').find('py-codeblock').exists)
        //.expect(Selector(() => document.querySelector('#host').shadowRoot.querySelector('.filename')).contains('game.js'))
        .ok();
});
