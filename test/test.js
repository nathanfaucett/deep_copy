var assert = require("assert"),
    deepCopy = require("../src/index");


describe("deepCopy(object)", function() {
    it("should return a deep copy of object", function() {
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
    });
});
