"use strict";
class DataCache {
    constructor(_timeout = Infinity) {
        this._timeout = _timeout;
        this._store = {};
    }
    get(key) {
        const item = this._store[key];
        if (!item)
            return;
        if (this._timeout <= (new Date().getTime() - item.time)) {
            delete this._store[key];
            return;
        }
        return item['data'];
    }
    set(key, val) {
        this._store[key] = {
            time: new Date().getTime(),
            data: val,
        };
        return val;
    }
}
exports.DataCache = DataCache;
//# sourceMappingURL=cache.js.map