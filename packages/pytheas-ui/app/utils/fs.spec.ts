import { getExtension } from './fs';

describe('should get extension of file', () => {
    test('drop', () => {
        let extension = getExtension('./a-path/a-file.css');
        expect(extension).toEqual('css');
    });
});
