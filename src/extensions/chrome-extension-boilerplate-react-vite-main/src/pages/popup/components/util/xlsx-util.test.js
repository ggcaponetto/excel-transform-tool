/* eslint-env jest */
import assert from "assert";
import Util from "@pages/popup/components/util/xlsx-util.js";
describe("XLSX util", () => {
  test("convert digit index to letter index", () => {
    // given
    let util = new Util();
    let output = util.convertToLetter(25);
    assert.equal(output, "Z");

    output = util.convertToLetter(26);
    assert.equal(output, "AA");
  });
});
