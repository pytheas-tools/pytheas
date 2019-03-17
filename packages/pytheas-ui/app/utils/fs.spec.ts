import { getExtension, getName } from './fs';

describe('should get extension of file', () => {
    test('with a file', () => {
        const extension = getExtension('./a-path/a-file.css');
        expect(extension).toEqual('css');
    });
});

describe('should get name of file', () => {
    test('with a file', () => {
        const name = getName('./a-path/a-file.css');
        expect(name).toEqual('a-file');
    });
});
