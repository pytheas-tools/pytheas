import { SUPPORTED_FILES } from './supported-files';

export function isFileSupported(extension: string): boolean {
    return extension in SUPPORTED_FILES;
}
