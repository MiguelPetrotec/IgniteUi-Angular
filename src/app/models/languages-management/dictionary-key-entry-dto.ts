import { v4 as uuid } from 'uuid';

export interface IDictionaryKeyEntryDTO {
    namespace: string;
    dictionaryKey: string;
    value: Map<string, string>;
}

export class DictionaryKeyEntryDTO implements IDictionaryKeyEntryDTO {
    uniqueKey: string;
    namespace: string;
    dictionaryKey: string;
    value: Map<string, string>;
    newKey: boolean;
    error: boolean;

    constructor(entry?: IDictionaryKeyEntryDTO, newKey?: boolean) {
        this.namespace = entry.namespace;
        this.dictionaryKey = entry.dictionaryKey;
        this.value = entry.value;
        this.uniqueKey = newKey ? uuid() : entry.namespace + entry.dictionaryKey;
        this.newKey = newKey || false;
        this.error = false;
    }
}