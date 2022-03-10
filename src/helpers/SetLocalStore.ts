export default class HandleLocalStorage {
  protected key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: any) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }

  get() {
    const StorageValue = localStorage.getItem(this.key) as string;
    return JSON.parse(StorageValue);
  }

  verify() {
    if (localStorage.getItem(this.key)) return true;
    return false;
  }
}

function LocalTest() {
  const Local = new HandleLocalStorage('chave');

  Local.set('valor');

  if (Local.verify()) return Local.get();
}
