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

    findInListByName(list: any, name: any) {
        return list.find((el: any) => el.name === name);
    }

    mergeInRelations(elements: any) {
        // Loop for each element
        elements.map((element: any) => {
            // loop for each out relation, and verify related element has the correct in relation referenced
            if (element.relations && element.relations.length > 0) {
                element.relations.forEach((relation: any) => {
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
