import { isFileSupported } from '../files/files.utils';
import { getExtension } from '../../utils/fs';

/**
 * Manage demos
 */
class DemosManager {
    private static instance: DemosManager;

    demosData: any;

    private constructor() {}
    static getInstance() {
        if (!DemosManager.instance) {
            DemosManager.instance = new DemosManager();
        }
        return DemosManager.instance;
    }

    init() {
        const { PYTHEAS_CONTEXT } = <any>window;
        if (PYTHEAS_CONTEXT && PYTHEAS_CONTEXT !== 'vscode') {
            fetch('./demos/demos.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.demosData = data;
                    console.log(this.demosData);
                })
                .catch(error => {
                    console.log('Error with fetch: ' + error.message);
                });
        }
    }

    getDemoProjectFiles(project: string) {
        const resolvedFiles: any = [];
        const filesToResolve = this.demosData[project];
        let i = 0;
        const len = filesToResolve.length;
        return new Promise((resolve, reject) => {
            const resolveFile = (): Promise<any> => {
                return fetch(`./demos/${project}/${filesToResolve[i]}`)
                    .then(response => {
                        return response.text();
                    })
                    .then(dataFile => {
                        if (isFileSupported(getExtension(filesToResolve[i]))) {
                            resolvedFiles.push({
                                path: filesToResolve[i],
                                data: dataFile
                            });
                        }
                        if (i < len - 1) {
                            i++;
                            return resolveFile();
                        } else {
                            return resolvedFiles;
                        }
                    })
                    .catch(error => {
                        console.log('Error with fetch: ' + error.message);
                    });
            };
            resolveFile()
                .then(files => {
                    resolve(files);
                })
                .catch(error => {
                    reject('Error with fetch: ' + error.message);
                });
        });
    }
}

export default DemosManager.getInstance();
