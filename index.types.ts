import {Atom, atom, PrimitiveAtom} from "jotai";
import {getFromPersistentStorage} from "./index";

export abstract class StorageDescriptor<TValueType> {
    public abstract key : string;
    public abstract preferredStorage: TStorageType;
    public abstract initialValueIfNotFoundInPreferredStorage: TValueType;
    private atom?: Atom<TValueType>;
    public getAtom(): PrimitiveAtom<TValueType> {
        if (this.atom === null || this.atom === undefined){
            this.atom = atom<TValueType>(getFromPersistentStorage<TValueType>(this.preferredStorage, this.key) ?? this.initialValueIfNotFoundInPreferredStorage)
        }
        return this.atom as PrimitiveAtom<TValueType>;
    }
}

export enum TStorageType {
    LocalStorage = "localStorage",
    SessionStorage = "sessionStorage"
}
