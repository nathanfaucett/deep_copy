var tape = require("tape"),
    deepCopy = require("../src/index");


tape("should return a deep copy of object", function(assert) {
    assert.deepEqual(
        deepCopy({
            name: "Bob",
            age: 42,
            array: [0, 1, 2]
        }), {
            name: "Bob",
            age: 42,
            array: [0, 1, 2]
        }
    );
    assert.end();
});
