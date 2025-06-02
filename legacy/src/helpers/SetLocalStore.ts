'use client'

export interface ProjectObj { projectName: string, updated: boolean };

export default class HandleLocalStorage {
  protected key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: ProjectObj[]) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  get(): ProjectObj[] {
    const StorageValue = localStorage.getItem(this.key) as string;
    return JSON.parse(StorageValue);
  }

  verify() {
    if (localStorage.getItem(this.key)) {
      return Array.isArray(this.get());
    }
    return false;
  }
}

// function LocalTest() {
//   const Local = new HandleLocalStorage('chave');

//   Local.set([{ projectName: 'name', updated: false }]);

//   if (Local.verify()) return Local.get();
// }
