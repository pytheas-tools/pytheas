export function extensionToLanguage(extension: string): string {
    let language = '';
    switch (extension) {
        case 'js':
            language = 'javascript';
            break;
        case 'ts':
            language = 'typescript';
            break;
        default:
            break;
    }
    return language;
}
