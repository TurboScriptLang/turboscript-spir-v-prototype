import fs from "fs";
import path from "path";
import { SPIRVHeader, SPIRVInstructionStream } from "./spirv";

const code: Buffer = fs.readFileSync(
  path.resolve(__dirname, "./__mocks__/code.spirv")
);

describe("SPIRV Test suites", () => {
  describe("SPIRV Header test suite", () => {
    it("Should parse header correctlty", () => {
      const header = new SPIRVHeader(code);
      expect(header.magic).toBe(0x07230203);
      expect(header.version).toBe(0x10000);
      expect(header.generator).toBe(0x080008);
      expect(header.bound).toBe(12);
      expect(header.schema).toBe(0);
      expect(header.toString()).toBe(`; Magic: 0x07230203 (SPIR-V)
; Version: 0x00010000
; Generator: 0x00080008
; Bound: 12
; Schema: 0`);
    });
  });

  describe("SPIRV Instruction test suite", () => {
    it("Should parse instructions correctlty", () => {
      const header = new SPIRVInstructionStream(code);
      const reader = header.read();
      let result = reader.next();
      
      while (!result.done) {
        console.log(result.value);
        result = reader.next();
      }
      expect(result.value).toBe(1);
      console.log(result);
    });
  });
});
