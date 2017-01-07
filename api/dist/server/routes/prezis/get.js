"use strict";
exports.get = ({ storage }) => {
    console.log(storage);
    return (err, req, res) => {
        console.log('/prezis GET handler');
    };
};
//# sourceMappingURL=get.js.map