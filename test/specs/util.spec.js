var assert = require('chai').assert;

// load lep-API and mocks into this context..
require('lepApiAndMocksLoader');

lep.setLogLevel(lep.LOGLEVEL.WARN);

describe('util.js', function() {

    it('throws errors on assertions failures', function() {
        assert.throw(function() {
            lep.util.assert(false);
        });
        assert.throw(function() {
            lep.util.assert(0);
        });
        assert.doesNotThrow(function() {
            lep.util.assertObjectOrEmpty(null);
        });
        assert.doesNotThrow(function() {
            lep.util.assertObjectOrEmpty(false);
        });
        assert.throw(function() {
            lep.util.assertObjectOrEmpty('null');
        });
        assert.throw(function() {
            lep.util.assertObjectOrEmpty(123);
        });
    });
    
    it('throws nicely formatted errors on assertion failures', function() {
        assert.throw(
            function(){
                lep.util.assert(false, '123{}456', 'xx')
            },
            '123xx456'
        );
        assert.throw(
            function(){
                var min = 10, max = 20;
                lep.util.assertNumberInRange(5, min, max, 'Number must be within {} and {}', min, max);
            },
            'Number must be within 10 and 20'
        );
        assert.throw(
            function(){
                var min = 10, max = 20;
                lep.util.assertNumberInRange(5, min, max, 'Number must be within {} and {}');
            },
            'Number must be within {} and {}'
        );
    });

    it('formats strings using formatString()', function() {
        assert.equal(lep.util.formatString('ABC{}DE{}F', '_', 'x'), 'ABC_DExF');
        assert.equal(lep.util.formatString('ABC{}DE{}F', '_', ''), 'ABC_DEF');
        assert.equal(lep.util.formatString('ABC{}DE{}F', '_'), 'ABC_DE{}F');
        assert.equal(lep.util.formatString('ABC{}DE{}F', '_', null), 'ABC_DEnullF');
        assert.equal(lep.util.formatString('ABC', 'x', 'y', 'z'), 'ABC');
        assert.equal(lep.util.formatString('ABC'), 'ABC');
    });

    it('generates positive IDs using nextId()', function() {
        var lastId = lep.util.nextId();
        assert.isNumber(lastId);
        assert.isAbove(lastId, 0);
        assert.strictEqual(lep.util.nextId(), lastId + 1);
        assert.strictEqual(lep.util.nextId(), lastId + 2);
    });

    it('limits numbers using limitToRange()', function() {
        assert.strictEqual(lep.util.limitToRange(5, 10, 20), 10);
        assert.strictEqual(lep.util.limitToRange(15, 10, 20), 15);
        assert.strictEqual(lep.util.limitToRange(15, 10, 20), 15);
    });

    it('binds function to scopes using bind()', function() {
        var obj = {
                __fooProperty__: 123,
                getX: function(){
                    return this.__fooProperty__;
                }
            },
            getX_noContext = obj.getX,
            getX_withContextBound = lep.util.bind(obj.getX, obj),
            getX_withBindIgnoredSinceContextParamIsFalsy = lep.util.bind(obj.getX, null);

        assert.strictEqual(obj.getX(), 123);
        assert.isUndefined(getX_noContext());
        assert.strictEqual(getX_withContextBound(), 123);
        assert.isUndefined(getX_withBindIgnoredSinceContextParamIsFalsy());
    });

    it('generates arrays with initial values', function() {
        var a = lep.util.generateArray(20, 'xxx');
        assert.isArray(a);
        assert.strictEqual(a.length, 20);
        assert.strictEqual(a[0], 'xxx');
        assert.strictEqual(a[10], 'xxx');
        assert.strictEqual(a[19], 'xxx');
        assert.isUndefined(a[20]);
    });

    it('extends objects using extend()', function() {
        var o1 = {a: 1, b: {c: 3}, getA: function(){return this.a}},
            o2 = {a: 5, x: 666};

        assert.strictEqual(o1.getA(), 1);
        assert.isUndefined(o2.b);
        assert.isUndefined(o2.getA);
        lep.util.extend(o2, o1);
        assert.isFunction(o2.getA);
        assert.strictEqual(o2.getA(), 1);
        assert.strictEqual(o2.a, 1);
        assert.isObject(o2.b);
        assert.strictEqual(o2.b.c, 3);
        assert.strictEqual(o2.x, 666);
    });

    it('measures time differences in millis', function(done) {
        var ID1 = 1,
            ID2 = 3,
            TIME_TO_MEASURE = 500,
            TOLERANCE = 100;

        lep.util.startTimer(ID1);
        setTimeout(function() {
            assert.closeTo(lep.util.stopTimer(ID1), TIME_TO_MEASURE, TOLERANCE);
            assert.closeTo(lep.util.stopTimer(ID1), TIME_TO_MEASURE, TOLERANCE);
            assert.strictEqual(lep.util.stopTimer(ID2), -1);
            done();
        }, TIME_TO_MEASURE);
    });
});
