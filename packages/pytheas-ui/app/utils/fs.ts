export function getExtension(filename: string) {
    return filename.substr(filename.lastIndexOf('.') + 1, filename.length);
}
