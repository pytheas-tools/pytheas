import { RelationTypes } from './py-relation';

/**
 * Manage the relations between elements
 */
class RelationSingleton {
    private static instance: RelationSingleton;
    private constructor() {}
    static getInstance() {
        if (!RelationSingleton.instance) {
            RelationSingleton.instance = new RelationSingleton();
        }
        return RelationSingleton.instance;
    }

    findInListByName(list, name) {
        return list.find(el => el.name === name);
    }

    mergeInRelations(elements) {
        // Loop for each element
        elements.map(element => {
            // loop for each out relation, and verify related element has the correct in relation referenced
            if (element.relations && element.relations.length > 0) {
                element.relations.forEach(relation => {
                    if (relation.type === RelationTypes.Out) {
                        const toElement = this.findInListByName(elements, relation.to);
                        if (toElement) {
                            toElement.addRelation(element, toElement, relation.toType, RelationTypes.In);
                            relation.to = toElement;
                        }
                    }
                });
            }
        });
    }
}

export const RelationManager = RelationSingleton.getInstance();
