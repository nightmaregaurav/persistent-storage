import {StorageDescriptor, TStorageType} from "./index.types";
import React, {useEffect} from "react";
import { useAtom } from "jotai";

export const getFromPersistentStorage = <T> (storageType: TStorageType, key: string) => {
    let storedValue : string | null;
    switch(storageType){
        case TStorageType.LocalStorage:
            storedValue = localStorage.getItem(key);
            break;
        case TStorageType.SessionStorage:
            storedValue = sessionStorage.getItem(key);
            break;
        default:
            storedValue = null;
    }
    return storedValue !== null ? JSON.parse(storedValue) as T : undefined
}

const setToPersistentStorage = (storageType: TStorageType, key: string, value: string) => {
    switch(storageType){
        case TStorageType.LocalStorage:
            localStorage.setItem(key, value);
            break;
        case TStorageType.SessionStorage:
            sessionStorage.setItem(key, value);
            break;
        default:
            break;
    }
}

const removeFromPersistentStorage = (storageType: TStorageType, key: string) => {
    switch(storageType){
        case TStorageType.LocalStorage:
            localStorage.removeItem(key);
            break;
        case TStorageType.SessionStorage:
            sessionStorage.removeItem(key);
            break;
        default:
            break;
    }
}

export const usePersistentStorage = <T>(storageDescriptor: StorageDescriptor<T>) : [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
    const {key, preferredStorage} = storageDescriptor;
    const [value, setValue] = useAtom(storageDescriptor.getAtom());

    useEffect(() => {
        const initialValue = getFromPersistentStorage<T>(storageDescriptor.preferredStorage, storageDescriptor.key);
        if (initialValue !== undefined) setValue(initialValue);
    }, [key, preferredStorage, setValue]);

    useEffect(() => {
        if (value === null || value == undefined) removeFromPersistentStorage(storageDescriptor.preferredStorage, storageDescriptor.key);
        else setToPersistentStorage(storageDescriptor.preferredStorage, storageDescriptor.key, JSON.stringify(value));
    }, [key, preferredStorage, value]);

    const removeValue = () => removeFromPersistentStorage(storageDescriptor.preferredStorage, storageDescriptor.key);
    return [value, setValue, removeValue];
}
 export {StorageDescriptor, TStorageType} from "./index.types";
