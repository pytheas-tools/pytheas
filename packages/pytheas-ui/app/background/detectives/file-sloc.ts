import sloc from 'sloc';

export function getSlocInformations(sourceCode: string, type: string) {
    return sloc(sourceCode, type);
}
