import { hex } from "../utils/hex";
import spirvHeaders from "../header";
import { opcodes } from "./opcodes";

const SPV_OFFSET_MAGIC_NUMBER = 0;
const SPV_OFFSET_VERSION_NUMBER = 4;
const SPV_OFFSET_GENERATOR_NUMBER = 8;
const SPV_OFFSET_BOUND = 12;
const SPV_OFFSET_SCHEMA = 16;

export class SPIRVHeader {
  magic: uint32;
  version: uint32;
  generator: uint32;
  bound: uint32;
  schema: uint32;

  constructor(buffer: Buffer) {
    this.magic = buffer.readUInt32LE(SPV_OFFSET_MAGIC_NUMBER);
    this.version = buffer.readUInt32LE(SPV_OFFSET_VERSION_NUMBER);
    this.generator = buffer.readUInt32LE(SPV_OFFSET_GENERATOR_NUMBER);
    this.bound = buffer.readUInt32LE(SPV_OFFSET_BOUND);
    this.schema = buffer.readUInt32LE(SPV_OFFSET_SCHEMA);
  }

  toString(): string {
    return `; Magic: ${hex(this.magic)} (SPIR-V)
; Version: ${hex(this.version)}
; Generator: ${hex(this.generator)}
; Bound: ${this.bound}
; Schema: ${this.schema}`;
  }
}

export class SPIRVInstruction {
  public name: string;
  public operands: any[];

  constructor(
    public wordCount: uint16,
    public opcode: uint16,
    public offset: uint32,
    buffer: Buffer,
    resultMap: Map<uint32, string>
  ) {
    this.name = spirvHeaders.Op.Values[opcode];
    this.operands = opcodes[opcode].read(buffer, offset, wordCount, resultMap);
  }
}

export class SPIRVInstructionStream {
  resultMap: Map<uint32, string> = new Map();
  constructor(private buffer: Buffer, private offset: uint32 = 20) {}

  *read() {
    while (this.buffer.byteLength > this.offset + 4) {
      const offset = this.offset;
      const opcode = this.buffer.readUInt16LE(this.offset);
      const wordCount = this.buffer.readUInt16LE((this.offset += 2));
      this.offset = offset + wordCount * 4;
      yield new SPIRVInstruction(
        wordCount,
        opcode,
        offset,
        this.buffer,
        this.resultMap
      );
    }
  }
}

/**
 * SPIR-V Instructions
 */
