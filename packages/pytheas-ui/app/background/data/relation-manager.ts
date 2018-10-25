import { RelationTypes } from './py-relation';

/**
 * Manage the relations between elements
 */
class RelationManager {
    private static instance: RelationManager;
    private constructor() {}
    static getInstance() {
        if (!RelationManager.instance) {
            RelationManager.instance = new RelationManager();
        }
        return RelationManager.instance;
    }

    findInListByName(list, name) {
        return list.find(el => el.name === name);
    }

    mergeInRelations(elements) {
        // Loop for each element
        elements.map(element => {
            // loop for each out relation, and verify related element has the correct in relation referenced
            element.relations.forEach(relation => {
                if (relation.type === RelationTypes.Out) {
                    let toElement = this.findInListByName(elements, relation.to);
                    if (toElement) {
                        toElement.addRelation(element, toElement, relation.toType, RelationTypes.In);
                        relation.to = toElement;
                    }
                }
            });
        });
    }
}

export default RelationManager.getInstance();
