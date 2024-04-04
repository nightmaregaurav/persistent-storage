# persistent-storage
[![npm version](https://badge.fury.io/js/@nightmaregaurav%2Fpersistent-storage.svg)](https://badge.fury.io/js/@nightmaregaurav%2Fpersistent-storage)
[![HitCount](https://hits.dwyl.com/nightmaregaurav/persistent-storage.svg?style=flat)](http://hits.dwyl.com/nightmaregaurav/persistent-storage)<br>
[![NPM](https://nodei.co/npm/@nightmaregaurav/persistent-storage.png?mini=true)](https://nodei.co/npm/@nightmaregaurav/persistent-storage/)
***

## Description
Persistent storage is a library that allows you to store hook's state in local storage or session storage so that the latest state is available even after the page is refreshed. 

## Installation
```bash
npm install @nightmaregaurav/persistent-storage
````

## Usage ([Watch video](https://www.youtube.com/watch?v=ZLLvKlQ8t2U))
### Defining Storage (Adding StorageDescriptor)
```typescript
import {StorageDescriptor, TStorageType} from "@nightmaregaurav/persistent-storage";

export const TThemes = ["default", "dark", "purple", "green", "orange"] as const;
export type TThemes = typeof TThemes[number];

export class ThemeStorageDescriptor extends StorageDescriptor<TThemes>{
    initialValueIfNotFoundInPreferredStorage: TThemes = "default";
    key: string = "Theme";
    preferredStorage: TStorageType = TStorageType.LocalStorage;
}
```

### Setting Storage
```typescript
import {ThemeStorageDescriptor} from "./....";

export const ThemeStorage = new ThemeStorageDescriptor();
```

### Using Persistent Storage
```typescript
import React, {useEffect} from "react";
import {usePersistentStorage} from "@nightmaregaurav/persistent-storage";
import {ThemeStorage} from "./example-store";

const Test = () => {
    const [theme, setTheme] = usePersistentStorage(ThemeStorage);
    useEffect(() => {
        console.log("Theme changed to: ", theme);
    }, [theme]);

    setTheme("dark");
    
    return (
        <div className= {"theme-" + theme}>
            test
        </div>
    );
};

export default Test;

```

## How to Contribute
* Fork the repository
* Clone the forked repository
* Make changes
* Commit and push the changes
* Create a pull request
* Wait for the pull request to be merged
* Celebrate
* Repeat

*If you are new to open source, you can read [this](https://opensource.guide/how-to-contribute/) to learn how to contribute to open source projects.*<br>
*If you are new to GitHub, you can read [this](https://guides.github.com/activities/hello-world/) to learn how to use GitHub.*<br>
*If you are new to Git, you can read [this](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud) to learn how to use Git.*<br>
*If you are new to TypeScript, you can read [this](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) to learn how to use TypeScript.*<br>


## License
persistent-storage is released under the MIT License. You can find the full license details in the [LICENSE](LICENSE) file.

Made with ❤️ by [NightmareGaurav](https://github.com/nightmaregaurav).

---
Open For Contribution
---
