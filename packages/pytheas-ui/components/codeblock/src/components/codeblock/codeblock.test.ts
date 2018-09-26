import { TestWindow } from '@stencil/core/testing';
import { CodeBlock } from './codeblock';

describe('codeblock', () => {
    it('should build', () => {
        expect(new CodeBlock()).toBeTruthy();
    });

    /*describe('rendering', () => {
        let element: HTMLCodeBlockElement;
        let testWindow: TestWindow;
        beforeEach(async () => {
            testWindow = new TestWindow();
            console.log(testWindow);

            element = await testWindow.load({
                components: [CodeBlock],
                html: '<py-codeblock></py-codeblock>'
            });
            console.log(element);
        });

        it('should work with a filename attribute', async () => {
            element.filename = 'player.ts';

            await testWindow.flush();

            console.log(element.textContent);

            expect(element.textContent.trim()).toEqual(`player.ts`);
        });
    });*/
});
