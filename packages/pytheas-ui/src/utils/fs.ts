export function getExtension(filename: string) {
    return filename.substr(filename.lastIndexOf('.') + 1, filename.length);
}

export function getName(filename: string) {
    return filename.substr(filename.lastIndexOf('/') + 1, filename.length);
}
