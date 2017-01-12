export class DataCache {
  private _store
  private _timeout
  constructor(timeout) {
    this._store = {}
    this._timeout = timeout || Infinity
  }
  public get(key: string): Object {
    const item = this._store[key]
    if (!item) return
    if (this._timeout <= (new Date().getTime() - item.time)) {
      delete this._store[key]
      return
    }
    return item['data']
  }
  public set(key: string, val: Object): Object {
    this._store[key] = {
      time: new Date().getTime(),
      data: val,
    }
    return val
  }
}
