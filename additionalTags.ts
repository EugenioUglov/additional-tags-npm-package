interface ITagsArrayByTag {
    tagKey: string[];
};


export default class AdditionalTags {
    // General example: {tagKey: [tagToAdd1, tagToAdd2], tagKey2...}. 
    // Concrete example: {turtle: ['animal', 'shy']}
    #tagsArrayByTag = {} as ITagsArrayByTag;

    // General example: [[tagA1, tagA2], [tagB1, tagB2]...]
    // Concrete example: [['js', 'JavaScript']]
    #arraysOfSelfReplaceableTags: string[][] = [];


    addTagsArrayByTag(tagsArrayByTagToSet: {}) {
        this.#tagsArrayByTag = {...this.#tagsArrayByTag, ...tagsArrayByTagToSet};

        return this.#tagsArrayByTag;
    }
    
    addSelfReplaceableTags(arrayOfSelfReplaceableTagsToSet: string[]) {
        this.#arraysOfSelfReplaceableTags.push(arrayOfSelfReplaceableTagsToSet);

        return this.#arraysOfSelfReplaceableTags;
    }

    getAdditionalTagsByTag(inputTag: string) {
        let additionalTags: string[] = [];

        if (this.#tagsArrayByTag[inputTag] != undefined) {
            additionalTags = [...additionalTags, ...this.#tagsArrayByTag[inputTag]];
        }

        for (const selfReplaceableTags of this.#arraysOfSelfReplaceableTags) {
            for (const currentTagIndex in selfReplaceableTags) {
                const currentTag = selfReplaceableTags[currentTagIndex];

                if (currentTag === inputTag) {
                    const selfReplaceableTagsWithoutInputTag = selfReplaceableTags.filter(item => item !== inputTag);

                    additionalTags = [...additionalTags, ...selfReplaceableTagsWithoutInputTag];
                    break;
                }
            }
        }

        return Array.from(new Set(additionalTags));
    }
}