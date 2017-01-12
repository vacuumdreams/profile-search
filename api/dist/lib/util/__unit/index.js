"use strict";
const chai_1 = require("chai");
const mocha_1 = require("mocha");
var sinon = require('sinon');
const errors_1 = require("../../../errors");
const utils = require('../');
const res = {
    send: sinon.spy()
};
mocha_1.describe('Lib - Utils', function () {
    mocha_1.afterEach(function () {
        res.send.reset();
    });
    mocha_1.describe('successHandler', function () {
        mocha_1.it('sends response with status 200', function () {
            utils.successHandler(res)({ test: 'data' });
            chai_1.expect(res.send.callCount).to.equal(1);
            chai_1.expect(res.send.firstCall.args[0]).to.equal(200);
            chai_1.expect(res.send.firstCall.args[1]).to.deep.equal({ test: 'data' });
        });
    });
    mocha_1.describe('errorHandler', function () {
        mocha_1.it('sends response with the passed in error\'s code and message', function () {
            const err = new errors_1.HTTPError();
            err.code = 503;
            err.msg = 'Test message';
            utils.errorHandler(res)(err);
            chai_1.expect(res.send.callCount).to.equal(1);
            chai_1.expect(res.send.firstCall.args[0]).to.equal(503);
            chai_1.expect(res.send.firstCall.args[1]).to.deep.equal('Test message');
        });
    });
    mocha_1.describe('tryThrow', function () {
        mocha_1.it('doesn\'t throw error when the passed in function executes correctly', function () {
            chai_1.expect(() => utils.tryThrow(() => ({}), errors_1.HTTPError)).to.not.throw();
        });
        mocha_1.it('throws an error instance when it can\'t execute the callback', function () {
            chai_1.expect(() => utils.tryThrow(() => { throw new Error(); }, errors_1.HTTPError)).to.throw(errors_1.HTTPError);
        });
    });
    mocha_1.describe('alwaysThrow', function () {
        mocha_1.it('throws an error instance when the returned function gets called', function () {
            chai_1.expect(() => utils.alwaysThrow(errors_1.HTTPError)()).to.throw(errors_1.HTTPError);
        });
    });
    mocha_1.describe('toTimestamp', function () {
        mocha_1.it('converts a valid date string to a timestamp', function () {
            chai_1.expect(utils.toTimestamp('2012-01-12')).to.equal(1326326400000);
        });
    });
    mocha_1.describe('toArg', function () {
        mocha_1.it('returns the nth argument of the returned function', function () {
            chai_1.expect(utils.toArg(0)(1, 2, 3)).to.equal(1);
            chai_1.expect(utils.toArg(3)('a', 'b', 'c', 'd', 'e')).to.equal('d');
        });
    });
});
//# sourceMappingURL=index.js.map