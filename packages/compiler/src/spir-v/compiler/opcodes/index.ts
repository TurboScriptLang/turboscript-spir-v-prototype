import spirvHeaders from "../../header";
import { readStringTillNull } from "~/spir-v/utils/utf8";

export const opcodes = {
  0: {
    name: "OpNop",
    id: 0,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  1: {
    name: "OpUndef",
    id: 1,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  2: {
    name: "OpSourceContinued",
    id: 2,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  3: {
    name: "OpSource",
    id: 3,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const sourceLanguage = buffer.readUInt32LE(offset + 4);
      const version = buffer.readUInt32LE(offset + 8);
      return [
        {
          sourceLanguage,
          mappedValue: spirvHeaders.SourceLanguage.Values[sourceLanguage],
        },
        { version },
      ];
    },
  },
  4: {
    name: "OpSourceExtension",
    id: 4,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5: {
    name: "OpName",
    id: 5,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const target = buffer.readUInt32LE(offset + 4);
      const name = readStringTillNull(buffer, offset + 8);
      return [{ target }, { name }];
    },
  },
  6: {
    name: "OpMemberName",
    id: 6,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  7: {
    name: "OpString",
    id: 7,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  8: {
    name: "OpLine",
    id: 8,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  10: {
    name: "OpExtension",
    id: 10,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  11: {
    name: "OpExtInstImport",
    id: 11,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      const name = readStringTillNull(buffer, offset + 8);
      resultMap.set(result, "OpExtInstImport");
      return [
        {
          result,
        },
        {
          name,
        },
      ];
    },
  },
  12: {
    name: "OpExtInst",
    id: 12,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  14: {
    name: "OpMemoryModel",
    id: 14,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const addressingModel = buffer.readUInt32LE(offset + 4);
      const memoryModel = buffer.readUInt32LE(offset + 8);
      return [
        {
          addressingModel,
          mappedValue: spirvHeaders.AddressingModel.Values[addressingModel],
        },
        {
          memoryModel,
          mappedValue: spirvHeaders.MemoryModel.Values[memoryModel],
        },
      ];
    },
  },
  15: {
    name: "OpEntryPoint",
    id: 15,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const executionModel = buffer.readUInt32LE(offset + 4);
      const entryPoint = buffer.readUInt32LE(offset + 8);
      const name = readStringTillNull(buffer, offset + 12);
      return [
        {
          executionModel,
          mappedValue: spirvHeaders.ExecutionModel.Values[executionModel],
        },
        {
          entryPoint,
        },
        {
          name,
        },
      ];
    },
  },
  16: {
    name: "OpExecutionMode",
    id: 16,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const entryPoint = buffer.readUInt32LE(offset + 4);
      const mode = buffer.readUInt32LE(offset + 8);
      return [
        { entryPoint },
        {
          mode,
          mappedValue: spirvHeaders.ExecutionMode.Values[mode],
        },
      ];
    },
  },
  17: {
    name: "OpCapability",
    id: 17,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const value = buffer.readUInt32LE(offset + 4);
      const capability = {
        value,
        mappedValue: spirvHeaders.Capability.Values[value],
      };
      return [capability];
    },
  },
  19: {
    name: "OpTypeVoid",
    id: 19,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      resultMap.set(result, "OpTypeVoid");
      return [{ result }];
    },
  },
  20: {
    name: "OpTypeBool",
    id: 20,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  21: {
    name: "OpTypeInt",
    id: 21,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  22: {
    name: "OpTypeFloat",
    id: 22,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      const width = buffer.readUInt32LE(offset + 8);
      resultMap.set(result, "OpTypeFloat");
      return [{ result }, { width }];
    },
  },
  23: {
    name: "OpTypeVector",
    id: 23,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      const componentType = buffer.readUInt32LE(offset + 8);
      const componentCount = buffer.readUInt32LE(offset + 12);
      resultMap.set(result, "OpTypeVector");
      return [{ result }, { componentType }, { componentCount }];
    },
  },
  24: {
    name: "OpTypeMatrix",
    id: 24,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  25: {
    name: "OpTypeImage",
    id: 25,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  26: {
    name: "OpTypeSampler",
    id: 26,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  27: {
    name: "OpTypeSampledImage",
    id: 27,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  28: {
    name: "OpTypeArray",
    id: 28,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  29: {
    name: "OpTypeRuntimeArray",
    id: 29,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  30: {
    name: "OpTypeStruct",
    id: 30,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  31: {
    name: "OpTypeOpaque",
    id: 31,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  32: {
    name: "OpTypePointer",
    id: 32,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      const storageClass = buffer.readUInt32LE(offset + 8);
      const type = buffer.readUInt32LE(offset + 12);
      resultMap.set(result, "OpTypePointer");
      return [
        { result },
        {
          storageClass,
          mappedValue: spirvHeaders.StorageClass.Values[storageClass],
        },
        { type, mappedValue: resultMap.get(type) },
      ];
    },
  },
  33: {
    name: "OpTypeFunction",
    id: 33,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const result = buffer.readUInt32LE(offset + 4);
      const returnType = buffer.readUInt32LE(offset + 8);
      resultMap.set(result, "OpTypeFunction");
      return [
        { result },
        { returnType, mappedValue: resultMap.get(returnType) },
      ];
    },
  },
  34: {
    name: "OpTypeEvent",
    id: 34,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  35: {
    name: "OpTypeDeviceEvent",
    id: 35,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  36: {
    name: "OpTypeReserveId",
    id: 36,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  37: {
    name: "OpTypeQueue",
    id: 37,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  38: {
    name: "OpTypePipe",
    id: 38,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  39: {
    name: "OpTypeForwardPointer",
    id: 39,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  41: {
    name: "OpConstantTrue",
    id: 41,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  42: {
    name: "OpConstantFalse",
    id: 42,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  43: {
    name: "OpConstant",
    id: 43,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const resultType = buffer.readUInt32LE(offset + 4);
      const result = buffer.readUInt32LE(offset + 8);
      return [
        { resultType, mappedValue: resultMap.get(resultType) },
        { result },
      ];
    },
  },
  44: {
    name: "OpConstantComposite",
    id: 44,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  45: {
    name: "OpConstantSampler",
    id: 45,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  46: {
    name: "OpConstantNull",
    id: 46,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  48: {
    name: "OpSpecConstantTrue",
    id: 48,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  49: {
    name: "OpSpecConstantFalse",
    id: 49,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  50: {
    name: "OpSpecConstant",
    id: 50,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  51: {
    name: "OpSpecConstantComposite",
    id: 51,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  52: {
    name: "OpSpecConstantOp",
    id: 52,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  54: {
    name: "OpFunction",
    id: 54,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  55: {
    name: "OpFunctionParameter",
    id: 55,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  56: {
    name: "OpFunctionEnd",
    id: 56,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  57: {
    name: "OpFunctionCall",
    id: 57,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  59: {
    name: "OpVariable",
    id: 59,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const resultType = buffer.readUInt32LE(offset + 4);
      const result = buffer.readUInt32LE(offset + 8);
      const storagerClass = buffer.readUInt32LE(offset + 12);
      return [
        { resultType, mappedValue: resultMap.get(resultType) },
        { result },
        { storagerClass },
      ];
    },
  },
  60: {
    name: "OpImageTexelPointer",
    id: 60,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  61: {
    name: "OpLoad",
    id: 61,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  62: {
    name: "OpStore",
    id: 62,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  63: {
    name: "OpCopyMemory",
    id: 63,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  64: {
    name: "OpCopyMemorySized",
    id: 64,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  65: {
    name: "OpAccessChain",
    id: 65,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  66: {
    name: "OpInBoundsAccessChain",
    id: 66,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  67: {
    name: "OpPtrAccessChain",
    id: 67,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  68: {
    name: "OpArrayLength",
    id: 68,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  69: {
    name: "OpGenericPtrMemSemantics",
    id: 69,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  70: {
    name: "OpInBoundsPtrAccessChain",
    id: 70,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  71: {
    name: "OpDecorate",
    id: 71,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {
      const target = buffer.readUInt32LE(offset + 4);
      const decoration = buffer.readUInt32LE(offset + 8);
      const location = buffer.readUInt32LE(offset + 12);
      return [
        { target },
        { decoration, mappedValue: spirvHeaders.Decoration.Values[decoration] },
        { location },
      ];
    },
  },
  72: {
    name: "OpMemberDecorate",
    id: 72,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  73: {
    name: "OpDecorationGroup",
    id: 73,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  74: {
    name: "OpGroupDecorate",
    id: 74,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  75: {
    name: "OpGroupMemberDecorate",
    id: 75,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  77: {
    name: "OpVectorExtractDynamic",
    id: 77,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  78: {
    name: "OpVectorInsertDynamic",
    id: 78,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  79: {
    name: "OpVectorShuffle",
    id: 79,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  80: {
    name: "OpCompositeConstruct",
    id: 80,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  81: {
    name: "OpCompositeExtract",
    id: 81,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  82: {
    name: "OpCompositeInsert",
    id: 82,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  83: {
    name: "OpCopyObject",
    id: 83,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  84: {
    name: "OpTranspose",
    id: 84,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  86: {
    name: "OpSampledImage",
    id: 86,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  87: {
    name: "OpImageSampleImplicitLod",
    id: 87,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  88: {
    name: "OpImageSampleExplicitLod",
    id: 88,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  89: {
    name: "OpImageSampleDrefImplicitLod",
    id: 89,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  90: {
    name: "OpImageSampleDrefExplicitLod",
    id: 90,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  91: {
    name: "OpImageSampleProjImplicitLod",
    id: 91,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  92: {
    name: "OpImageSampleProjExplicitLod",
    id: 92,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  93: {
    name: "OpImageSampleProjDrefImplicitLod",
    id: 93,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  94: {
    name: "OpImageSampleProjDrefExplicitLod",
    id: 94,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  95: {
    name: "OpImageFetch",
    id: 95,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  96: {
    name: "OpImageGather",
    id: 96,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  97: {
    name: "OpImageDrefGather",
    id: 97,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  98: {
    name: "OpImageRead",
    id: 98,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  99: {
    name: "OpImageWrite",
    id: 99,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  100: {
    name: "OpImage",
    id: 100,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  101: {
    name: "OpImageQueryFormat",
    id: 101,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  102: {
    name: "OpImageQueryOrder",
    id: 102,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  103: {
    name: "OpImageQuerySizeLod",
    id: 103,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  104: {
    name: "OpImageQuerySize",
    id: 104,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  105: {
    name: "OpImageQueryLod",
    id: 105,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  106: {
    name: "OpImageQueryLevels",
    id: 106,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  107: {
    name: "OpImageQuerySamples",
    id: 107,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  109: {
    name: "OpConvertFToU",
    id: 109,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  110: {
    name: "OpConvertFToS",
    id: 110,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  111: {
    name: "OpConvertSToF",
    id: 111,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  112: {
    name: "OpConvertUToF",
    id: 112,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  113: {
    name: "OpUConvert",
    id: 113,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  114: {
    name: "OpSConvert",
    id: 114,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  115: {
    name: "OpFConvert",
    id: 115,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  116: {
    name: "OpQuantizeToF16",
    id: 116,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  117: {
    name: "OpConvertPtrToU",
    id: 117,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  118: {
    name: "OpSatConvertSToU",
    id: 118,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  119: {
    name: "OpSatConvertUToS",
    id: 119,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  120: {
    name: "OpConvertUToPtr",
    id: 120,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  121: {
    name: "OpPtrCastToGeneric",
    id: 121,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  122: {
    name: "OpGenericCastToPtr",
    id: 122,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  123: {
    name: "OpGenericCastToPtrExplicit",
    id: 123,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  124: {
    name: "OpBitcast",
    id: 124,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  126: {
    name: "OpSNegate",
    id: 126,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  127: {
    name: "OpFNegate",
    id: 127,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  128: {
    name: "OpIAdd",
    id: 128,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  129: {
    name: "OpFAdd",
    id: 129,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  130: {
    name: "OpISub",
    id: 130,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  131: {
    name: "OpFSub",
    id: 131,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  132: {
    name: "OpIMul",
    id: 132,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  133: {
    name: "OpFMul",
    id: 133,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  134: {
    name: "OpUDiv",
    id: 134,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  135: {
    name: "OpSDiv",
    id: 135,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  136: {
    name: "OpFDiv",
    id: 136,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  137: {
    name: "OpUMod",
    id: 137,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  138: {
    name: "OpSRem",
    id: 138,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  139: {
    name: "OpSMod",
    id: 139,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  140: {
    name: "OpFRem",
    id: 140,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  141: {
    name: "OpFMod",
    id: 141,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  142: {
    name: "OpVectorTimesScalar",
    id: 142,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  143: {
    name: "OpMatrixTimesScalar",
    id: 143,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  144: {
    name: "OpVectorTimesMatrix",
    id: 144,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  145: {
    name: "OpMatrixTimesVector",
    id: 145,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  146: {
    name: "OpMatrixTimesMatrix",
    id: 146,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  147: {
    name: "OpOuterProduct",
    id: 147,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  148: {
    name: "OpDot",
    id: 148,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  149: {
    name: "OpIAddCarry",
    id: 149,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  150: {
    name: "OpISubBorrow",
    id: 150,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  151: {
    name: "OpUMulExtended",
    id: 151,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  152: {
    name: "OpSMulExtended",
    id: 152,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  154: {
    name: "OpAny",
    id: 154,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  155: {
    name: "OpAll",
    id: 155,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  156: {
    name: "OpIsNan",
    id: 156,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  157: {
    name: "OpIsInf",
    id: 157,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  158: {
    name: "OpIsFinite",
    id: 158,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  159: {
    name: "OpIsNormal",
    id: 159,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  160: {
    name: "OpSignBitSet",
    id: 160,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  161: {
    name: "OpLessOrGreater",
    id: 161,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  162: {
    name: "OpOrdered",
    id: 162,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  163: {
    name: "OpUnordered",
    id: 163,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  164: {
    name: "OpLogicalEqual",
    id: 164,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  165: {
    name: "OpLogicalNotEqual",
    id: 165,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  166: {
    name: "OpLogicalOr",
    id: 166,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  167: {
    name: "OpLogicalAnd",
    id: 167,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  168: {
    name: "OpLogicalNot",
    id: 168,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  169: {
    name: "OpSelect",
    id: 169,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  170: {
    name: "OpIEqual",
    id: 170,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  171: {
    name: "OpINotEqual",
    id: 171,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  172: {
    name: "OpUGreaterThan",
    id: 172,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  173: {
    name: "OpSGreaterThan",
    id: 173,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  174: {
    name: "OpUGreaterThanEqual",
    id: 174,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  175: {
    name: "OpSGreaterThanEqual",
    id: 175,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  176: {
    name: "OpULessThan",
    id: 176,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  177: {
    name: "OpSLessThan",
    id: 177,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  178: {
    name: "OpULessThanEqual",
    id: 178,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  179: {
    name: "OpSLessThanEqual",
    id: 179,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  180: {
    name: "OpFOrdEqual",
    id: 180,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  181: {
    name: "OpFUnordEqual",
    id: 181,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  182: {
    name: "OpFOrdNotEqual",
    id: 182,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  183: {
    name: "OpFUnordNotEqual",
    id: 183,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  184: {
    name: "OpFOrdLessThan",
    id: 184,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  185: {
    name: "OpFUnordLessThan",
    id: 185,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  186: {
    name: "OpFOrdGreaterThan",
    id: 186,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  187: {
    name: "OpFUnordGreaterThan",
    id: 187,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  188: {
    name: "OpFOrdLessThanEqual",
    id: 188,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  189: {
    name: "OpFUnordLessThanEqual",
    id: 189,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  190: {
    name: "OpFOrdGreaterThanEqual",
    id: 190,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  191: {
    name: "OpFUnordGreaterThanEqual",
    id: 191,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  194: {
    name: "OpShiftRightLogical",
    id: 194,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  195: {
    name: "OpShiftRightArithmetic",
    id: 195,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  196: {
    name: "OpShiftLeftLogical",
    id: 196,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  197: {
    name: "OpBitwiseOr",
    id: 197,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  198: {
    name: "OpBitwiseXor",
    id: 198,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  199: {
    name: "OpBitwiseAnd",
    id: 199,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  200: {
    name: "OpNot",
    id: 200,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  201: {
    name: "OpBitFieldInsert",
    id: 201,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  202: {
    name: "OpBitFieldSExtract",
    id: 202,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  203: {
    name: "OpBitFieldUExtract",
    id: 203,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  204: {
    name: "OpBitReverse",
    id: 204,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  205: {
    name: "OpBitCount",
    id: 205,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  207: {
    name: "OpDPdx",
    id: 207,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  208: {
    name: "OpDPdy",
    id: 208,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  209: {
    name: "OpFwidth",
    id: 209,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  210: {
    name: "OpDPdxFine",
    id: 210,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  211: {
    name: "OpDPdyFine",
    id: 211,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  212: {
    name: "OpFwidthFine",
    id: 212,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  213: {
    name: "OpDPdxCoarse",
    id: 213,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  214: {
    name: "OpDPdyCoarse",
    id: 214,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  215: {
    name: "OpFwidthCoarse",
    id: 215,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  218: {
    name: "OpEmitVertex",
    id: 218,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  219: {
    name: "OpEndPrimitive",
    id: 219,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  220: {
    name: "OpEmitStreamVertex",
    id: 220,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  221: {
    name: "OpEndStreamPrimitive",
    id: 221,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  224: {
    name: "OpControlBarrier",
    id: 224,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  225: {
    name: "OpMemoryBarrier",
    id: 225,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  227: {
    name: "OpAtomicLoad",
    id: 227,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  228: {
    name: "OpAtomicStore",
    id: 228,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  229: {
    name: "OpAtomicExchange",
    id: 229,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  230: {
    name: "OpAtomicCompareExchange",
    id: 230,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  231: {
    name: "OpAtomicCompareExchangeWeak",
    id: 231,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  232: {
    name: "OpAtomicIIncrement",
    id: 232,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  233: {
    name: "OpAtomicIDecrement",
    id: 233,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  234: {
    name: "OpAtomicIAdd",
    id: 234,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  235: {
    name: "OpAtomicISub",
    id: 235,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  236: {
    name: "OpAtomicSMin",
    id: 236,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  237: {
    name: "OpAtomicUMin",
    id: 237,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  238: {
    name: "OpAtomicSMax",
    id: 238,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  239: {
    name: "OpAtomicUMax",
    id: 239,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  240: {
    name: "OpAtomicAnd",
    id: 240,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  241: {
    name: "OpAtomicOr",
    id: 241,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  242: {
    name: "OpAtomicXor",
    id: 242,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  245: {
    name: "OpPhi",
    id: 245,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  246: {
    name: "OpLoopMerge",
    id: 246,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  247: {
    name: "OpSelectionMerge",
    id: 247,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  248: {
    name: "OpLabel",
    id: 248,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  249: {
    name: "OpBranch",
    id: 249,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  250: {
    name: "OpBranchConditional",
    id: 250,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  251: {
    name: "OpSwitch",
    id: 251,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  252: {
    name: "OpKill",
    id: 252,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  253: {
    name: "OpReturn",
    id: 253,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  254: {
    name: "OpReturnValue",
    id: 254,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  255: {
    name: "OpUnreachable",
    id: 255,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  256: {
    name: "OpLifetimeStart",
    id: 256,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  257: {
    name: "OpLifetimeStop",
    id: 257,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  259: {
    name: "OpGroupAsyncCopy",
    id: 259,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  260: {
    name: "OpGroupWaitEvents",
    id: 260,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  261: {
    name: "OpGroupAll",
    id: 261,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  262: {
    name: "OpGroupAny",
    id: 262,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  263: {
    name: "OpGroupBroadcast",
    id: 263,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  264: {
    name: "OpGroupIAdd",
    id: 264,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  265: {
    name: "OpGroupFAdd",
    id: 265,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  266: {
    name: "OpGroupFMin",
    id: 266,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  267: {
    name: "OpGroupUMin",
    id: 267,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  268: {
    name: "OpGroupSMin",
    id: 268,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  269: {
    name: "OpGroupFMax",
    id: 269,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  270: {
    name: "OpGroupUMax",
    id: 270,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  271: {
    name: "OpGroupSMax",
    id: 271,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  274: {
    name: "OpReadPipe",
    id: 274,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  275: {
    name: "OpWritePipe",
    id: 275,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  276: {
    name: "OpReservedReadPipe",
    id: 276,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  277: {
    name: "OpReservedWritePipe",
    id: 277,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  278: {
    name: "OpReserveReadPipePackets",
    id: 278,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  279: {
    name: "OpReserveWritePipePackets",
    id: 279,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  280: {
    name: "OpCommitReadPipe",
    id: 280,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  281: {
    name: "OpCommitWritePipe",
    id: 281,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  282: {
    name: "OpIsValidReserveId",
    id: 282,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  283: {
    name: "OpGetNumPipePackets",
    id: 283,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  284: {
    name: "OpGetMaxPipePackets",
    id: 284,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  285: {
    name: "OpGroupReserveReadPipePackets",
    id: 285,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  286: {
    name: "OpGroupReserveWritePipePackets",
    id: 286,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  287: {
    name: "OpGroupCommitReadPipe",
    id: 287,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  288: {
    name: "OpGroupCommitWritePipe",
    id: 288,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  291: {
    name: "OpEnqueueMarker",
    id: 291,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  292: {
    name: "OpEnqueueKernel",
    id: 292,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  293: {
    name: "OpGetKernelNDrangeSubGroupCount",
    id: 293,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  294: {
    name: "OpGetKernelNDrangeMaxSubGroupSize",
    id: 294,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  295: {
    name: "OpGetKernelWorkGroupSize",
    id: 295,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  296: {
    name: "OpGetKernelPreferredWorkGroupSizeMultiple",
    id: 296,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  297: {
    name: "OpRetainEvent",
    id: 297,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  298: {
    name: "OpReleaseEvent",
    id: 298,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  299: {
    name: "OpCreateUserEvent",
    id: 299,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  300: {
    name: "OpIsValidEvent",
    id: 300,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  301: {
    name: "OpSetUserEventStatus",
    id: 301,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  302: {
    name: "OpCaptureEventProfilingInfo",
    id: 302,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  303: {
    name: "OpGetDefaultQueue",
    id: 303,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  304: {
    name: "OpBuildNDRange",
    id: 304,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  305: {
    name: "OpImageSparseSampleImplicitLod",
    id: 305,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  306: {
    name: "OpImageSparseSampleExplicitLod",
    id: 306,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  307: {
    name: "OpImageSparseSampleDrefImplicitLod",
    id: 307,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  308: {
    name: "OpImageSparseSampleDrefExplicitLod",
    id: 308,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  309: {
    name: "OpImageSparseSampleProjImplicitLod",
    id: 309,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  310: {
    name: "OpImageSparseSampleProjExplicitLod",
    id: 310,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  311: {
    name: "OpImageSparseSampleProjDrefImplicitLod",
    id: 311,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  312: {
    name: "OpImageSparseSampleProjDrefExplicitLod",
    id: 312,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  313: {
    name: "OpImageSparseFetch",
    id: 313,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  314: {
    name: "OpImageSparseGather",
    id: 314,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  315: {
    name: "OpImageSparseDrefGather",
    id: 315,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  316: {
    name: "OpImageSparseTexelsResident",
    id: 316,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  317: {
    name: "OpNoLine",
    id: 317,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  318: {
    name: "OpAtomicFlagTestAndSet",
    id: 318,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  319: {
    name: "OpAtomicFlagClear",
    id: 319,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  320: {
    name: "OpImageSparseRead",
    id: 320,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  321: {
    name: "OpSizeOf",
    id: 321,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  322: {
    name: "OpTypePipeStorage",
    id: 322,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  323: {
    name: "OpConstantPipeStorage",
    id: 323,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  324: {
    name: "OpCreatePipeFromPipeStorage",
    id: 324,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  325: {
    name: "OpGetKernelLocalSizeForSubgroupCount",
    id: 325,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  326: {
    name: "OpGetKernelMaxNumSubgroups",
    id: 326,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  327: {
    name: "OpTypeNamedBarrier",
    id: 327,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  328: {
    name: "OpNamedBarrierInitialize",
    id: 328,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  329: {
    name: "OpMemoryNamedBarrier",
    id: 329,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  330: {
    name: "OpModuleProcessed",
    id: 330,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  331: {
    name: "OpExecutionModeId",
    id: 331,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  332: {
    name: "OpDecorateId",
    id: 332,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  333: {
    name: "OpGroupNonUniformElect",
    id: 333,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  334: {
    name: "OpGroupNonUniformAll",
    id: 334,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  335: {
    name: "OpGroupNonUniformAny",
    id: 335,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  336: {
    name: "OpGroupNonUniformAllEqual",
    id: 336,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  337: {
    name: "OpGroupNonUniformBroadcast",
    id: 337,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  338: {
    name: "OpGroupNonUniformBroadcastFirst",
    id: 338,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  339: {
    name: "OpGroupNonUniformBallot",
    id: 339,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  340: {
    name: "OpGroupNonUniformInverseBallot",
    id: 340,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  341: {
    name: "OpGroupNonUniformBallotBitExtract",
    id: 341,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  342: {
    name: "OpGroupNonUniformBallotBitCount",
    id: 342,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  343: {
    name: "OpGroupNonUniformBallotFindLSB",
    id: 343,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  344: {
    name: "OpGroupNonUniformBallotFindMSB",
    id: 344,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  345: {
    name: "OpGroupNonUniformShuffle",
    id: 345,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  346: {
    name: "OpGroupNonUniformShuffleXor",
    id: 346,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  347: {
    name: "OpGroupNonUniformShuffleUp",
    id: 347,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  348: {
    name: "OpGroupNonUniformShuffleDown",
    id: 348,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  349: {
    name: "OpGroupNonUniformIAdd",
    id: 349,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  350: {
    name: "OpGroupNonUniformFAdd",
    id: 350,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  351: {
    name: "OpGroupNonUniformIMul",
    id: 351,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  352: {
    name: "OpGroupNonUniformFMul",
    id: 352,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  353: {
    name: "OpGroupNonUniformSMin",
    id: 353,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  354: {
    name: "OpGroupNonUniformUMin",
    id: 354,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  355: {
    name: "OpGroupNonUniformFMin",
    id: 355,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  356: {
    name: "OpGroupNonUniformSMax",
    id: 356,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  357: {
    name: "OpGroupNonUniformUMax",
    id: 357,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  358: {
    name: "OpGroupNonUniformFMax",
    id: 358,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  359: {
    name: "OpGroupNonUniformBitwiseAnd",
    id: 359,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  360: {
    name: "OpGroupNonUniformBitwiseOr",
    id: 360,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  361: {
    name: "OpGroupNonUniformBitwiseXor",
    id: 361,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  362: {
    name: "OpGroupNonUniformLogicalAnd",
    id: 362,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  363: {
    name: "OpGroupNonUniformLogicalOr",
    id: 363,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  364: {
    name: "OpGroupNonUniformLogicalXor",
    id: 364,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  365: {
    name: "OpGroupNonUniformQuadBroadcast",
    id: 365,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  366: {
    name: "OpGroupNonUniformQuadSwap",
    id: 366,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  400: {
    name: "OpCopyLogical",
    id: 400,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  401: {
    name: "OpPtrEqual",
    id: 401,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  402: {
    name: "OpPtrNotEqual",
    id: 402,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  403: {
    name: "OpPtrDiff",
    id: 403,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4416: {
    name: "OpTerminateInvocation",
    id: 4416,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4421: {
    name: "OpSubgroupBallotKHR",
    id: 4421,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4422: {
    name: "OpSubgroupFirstInvocationKHR",
    id: 4422,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4428: {
    name: "OpSubgroupAllKHR",
    id: 4428,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4429: {
    name: "OpSubgroupAnyKHR",
    id: 4429,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4430: {
    name: "OpSubgroupAllEqualKHR",
    id: 4430,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4432: {
    name: "OpSubgroupReadInvocationKHR",
    id: 4432,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4472: {
    name: "OpTypeRayQueryProvisionalKHR",
    id: 4472,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4473: {
    name: "OpRayQueryInitializeKHR",
    id: 4473,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4474: {
    name: "OpRayQueryTerminateKHR",
    id: 4474,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4475: {
    name: "OpRayQueryGenerateIntersectionKHR",
    id: 4475,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4476: {
    name: "OpRayQueryConfirmIntersectionKHR",
    id: 4476,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4477: {
    name: "OpRayQueryProceedKHR",
    id: 4477,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  4479: {
    name: "OpRayQueryGetIntersectionTypeKHR",
    id: 4479,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5000: {
    name: "OpGroupIAddNonUniformAMD",
    id: 5000,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5001: {
    name: "OpGroupFAddNonUniformAMD",
    id: 5001,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5002: {
    name: "OpGroupFMinNonUniformAMD",
    id: 5002,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5003: {
    name: "OpGroupUMinNonUniformAMD",
    id: 5003,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5004: {
    name: "OpGroupSMinNonUniformAMD",
    id: 5004,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5005: {
    name: "OpGroupFMaxNonUniformAMD",
    id: 5005,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5006: {
    name: "OpGroupUMaxNonUniformAMD",
    id: 5006,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5007: {
    name: "OpGroupSMaxNonUniformAMD",
    id: 5007,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5011: {
    name: "OpFragmentMaskFetchAMD",
    id: 5011,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5012: {
    name: "OpFragmentFetchAMD",
    id: 5012,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5056: {
    name: "OpReadClockKHR",
    id: 5056,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5283: {
    name: "OpImageSampleFootprintNV",
    id: 5283,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5296: {
    name: "OpGroupNonUniformPartitionNV",
    id: 5296,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5299: {
    name: "OpWritePackedPrimitiveIndices4x8NV",
    id: 5299,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5334: {
    name: "OpReportIntersectionKHR",
    id: 5334,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  // 5334: {
  //   name: "OpReportIntersectionNV",
  //   id: 5334,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  5335: {
    name: "OpIgnoreIntersectionKHR",
    id: 5335,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  // 5335: {
  //   name: "OpIgnoreIntersectionNV",
  //   id: 5335,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  5336: {
    name: "OpTerminateRayKHR",
    id: 5336,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  // 5336: {
  //   name: "OpTerminateRayNV",
  //   id: 5336,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  // 5337: {
  //   name: "OpTraceNV",
  //   id: 5337,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  5337: {
    name: "OpTraceRayKHR",
    id: 5337,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5341: {
    name: "OpTypeAccelerationStructureKHR",
    id: 5341,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  // 5341: {
  //   name: "OpTypeAccelerationStructureNV",
  //   id: 5341,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  5344: {
    name: "OpExecuteCallableKHR",
    id: 5344,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  // 5344: {
  //   name: "OpExecuteCallableNV",
  //   id: 5344,
  //   read(buffer: Buffer, offset: uint32, wordCount:uint32) {},
  // },
  5358: {
    name: "OpTypeCooperativeMatrixNV",
    id: 5358,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5359: {
    name: "OpCooperativeMatrixLoadNV",
    id: 5359,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5360: {
    name: "OpCooperativeMatrixStoreNV",
    id: 5360,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5361: {
    name: "OpCooperativeMatrixMulAddNV",
    id: 5361,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5362: {
    name: "OpCooperativeMatrixLengthNV",
    id: 5362,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5364: {
    name: "OpBeginInvocationInterlockEXT",
    id: 5364,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5365: {
    name: "OpEndInvocationInterlockEXT",
    id: 5365,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5380: {
    name: "OpDemoteToHelperInvocationEXT",
    id: 5380,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5381: {
    name: "OpIsHelperInvocationEXT",
    id: 5381,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5571: {
    name: "OpSubgroupShuffleINTEL",
    id: 5571,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5572: {
    name: "OpSubgroupShuffleDownINTEL",
    id: 5572,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5573: {
    name: "OpSubgroupShuffleUpINTEL",
    id: 5573,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5574: {
    name: "OpSubgroupShuffleXorINTEL",
    id: 5574,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5575: {
    name: "OpSubgroupBlockReadINTEL",
    id: 5575,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5576: {
    name: "OpSubgroupBlockWriteINTEL",
    id: 5576,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5577: {
    name: "OpSubgroupImageBlockReadINTEL",
    id: 5577,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5578: {
    name: "OpSubgroupImageBlockWriteINTEL",
    id: 5578,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5580: {
    name: "OpSubgroupImageMediaBlockReadINTEL",
    id: 5580,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5581: {
    name: "OpSubgroupImageMediaBlockWriteINTEL",
    id: 5581,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5585: {
    name: "OpUCountLeadingZerosINTEL",
    id: 5585,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5586: {
    name: "OpUCountTrailingZerosINTEL",
    id: 5586,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5587: {
    name: "OpAbsISubINTEL",
    id: 5587,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5588: {
    name: "OpAbsUSubINTEL",
    id: 5588,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5589: {
    name: "OpIAddSatINTEL",
    id: 5589,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5590: {
    name: "OpUAddSatINTEL",
    id: 5590,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5591: {
    name: "OpIAverageINTEL",
    id: 5591,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5592: {
    name: "OpUAverageINTEL",
    id: 5592,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5593: {
    name: "OpIAverageRoundedINTEL",
    id: 5593,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5594: {
    name: "OpUAverageRoundedINTEL",
    id: 5594,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5595: {
    name: "OpISubSatINTEL",
    id: 5595,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5596: {
    name: "OpUSubSatINTEL",
    id: 5596,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5597: {
    name: "OpIMul32x16INTEL",
    id: 5597,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5598: {
    name: "OpUMul32x16INTEL",
    id: 5598,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5600: {
    name: "OpFunctionPointerINTEL",
    id: 5600,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5601: {
    name: "OpFunctionPointerCallINTEL",
    id: 5601,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5632: {
    name: "OpDecorateString",
    id: 5632,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5633: {
    name: "OpMemberDecorateString",
    id: 5633,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5699: {
    name: "OpVmeImageINTEL",
    id: 5699,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5700: {
    name: "OpTypeVmeImageINTEL",
    id: 5700,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5701: {
    name: "OpTypeAvcImePayloadINTEL",
    id: 5701,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5702: {
    name: "OpTypeAvcRefPayloadINTEL",
    id: 5702,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5703: {
    name: "OpTypeAvcSicPayloadINTEL",
    id: 5703,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5704: {
    name: "OpTypeAvcMcePayloadINTEL",
    id: 5704,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5705: {
    name: "OpTypeAvcMceResultINTEL",
    id: 5705,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5706: {
    name: "OpTypeAvcImeResultINTEL",
    id: 5706,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5707: {
    name: "OpTypeAvcImeResultSingleReferenceStreamoutINTEL",
    id: 5707,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5708: {
    name: "OpTypeAvcImeResultDualReferenceStreamoutINTEL",
    id: 5708,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5709: {
    name: "OpTypeAvcImeSingleReferenceStreaminINTEL",
    id: 5709,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5710: {
    name: "OpTypeAvcImeDualReferenceStreaminINTEL",
    id: 5710,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5711: {
    name: "OpTypeAvcRefResultINTEL",
    id: 5711,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5712: {
    name: "OpTypeAvcSicResultINTEL",
    id: 5712,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5713: {
    name: "OpSubgroupAvcMceGetDefaultInterBaseMultiReferencePenaltyINTEL",
    id: 5713,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5714: {
    name: "OpSubgroupAvcMceSetInterBaseMultiReferencePenaltyINTEL",
    id: 5714,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5715: {
    name: "OpSubgroupAvcMceGetDefaultInterShapePenaltyINTEL",
    id: 5715,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5716: {
    name: "OpSubgroupAvcMceSetInterShapePenaltyINTEL",
    id: 5716,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5717: {
    name: "OpSubgroupAvcMceGetDefaultInterDirectionPenaltyINTEL",
    id: 5717,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5718: {
    name: "OpSubgroupAvcMceSetInterDirectionPenaltyINTEL",
    id: 5718,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5719: {
    name: "OpSubgroupAvcMceGetDefaultIntraLumaShapePenaltyINTEL",
    id: 5719,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5720: {
    name: "OpSubgroupAvcMceGetDefaultInterMotionVectorCostTableINTEL",
    id: 5720,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5721: {
    name: "OpSubgroupAvcMceGetDefaultHighPenaltyCostTableINTEL",
    id: 5721,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5722: {
    name: "OpSubgroupAvcMceGetDefaultMediumPenaltyCostTableINTEL",
    id: 5722,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5723: {
    name: "OpSubgroupAvcMceGetDefaultLowPenaltyCostTableINTEL",
    id: 5723,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5724: {
    name: "OpSubgroupAvcMceSetMotionVectorCostFunctionINTEL",
    id: 5724,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5725: {
    name: "OpSubgroupAvcMceGetDefaultIntraLumaModePenaltyINTEL",
    id: 5725,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5726: {
    name: "OpSubgroupAvcMceGetDefaultNonDcLumaIntraPenaltyINTEL",
    id: 5726,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5727: {
    name: "OpSubgroupAvcMceGetDefaultIntraChromaModeBasePenaltyINTEL",
    id: 5727,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5728: {
    name: "OpSubgroupAvcMceSetAcOnlyHaarINTEL",
    id: 5728,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5729: {
    name: "OpSubgroupAvcMceSetSourceInterlacedFieldPolarityINTEL",
    id: 5729,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5730: {
    name: "OpSubgroupAvcMceSetSingleReferenceInterlacedFieldPolarityINTEL",
    id: 5730,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5731: {
    name: "OpSubgroupAvcMceSetDualReferenceInterlacedFieldPolaritiesINTEL",
    id: 5731,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5732: {
    name: "OpSubgroupAvcMceConvertToImePayloadINTEL",
    id: 5732,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5733: {
    name: "OpSubgroupAvcMceConvertToImeResultINTEL",
    id: 5733,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5734: {
    name: "OpSubgroupAvcMceConvertToRefPayloadINTEL",
    id: 5734,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5735: {
    name: "OpSubgroupAvcMceConvertToRefResultINTEL",
    id: 5735,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5736: {
    name: "OpSubgroupAvcMceConvertToSicPayloadINTEL",
    id: 5736,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5737: {
    name: "OpSubgroupAvcMceConvertToSicResultINTEL",
    id: 5737,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5738: {
    name: "OpSubgroupAvcMceGetMotionVectorsINTEL",
    id: 5738,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5739: {
    name: "OpSubgroupAvcMceGetInterDistortionsINTEL",
    id: 5739,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5740: {
    name: "OpSubgroupAvcMceGetBestInterDistortionsINTEL",
    id: 5740,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5741: {
    name: "OpSubgroupAvcMceGetInterMajorShapeINTEL",
    id: 5741,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5742: {
    name: "OpSubgroupAvcMceGetInterMinorShapeINTEL",
    id: 5742,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5743: {
    name: "OpSubgroupAvcMceGetInterDirectionsINTEL",
    id: 5743,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5744: {
    name: "OpSubgroupAvcMceGetInterMotionVectorCountINTEL",
    id: 5744,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5745: {
    name: "OpSubgroupAvcMceGetInterReferenceIdsINTEL",
    id: 5745,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5746: {
    name: "OpSubgroupAvcMceGetInterReferenceInterlacedFieldPolaritiesINTEL",
    id: 5746,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5747: {
    name: "OpSubgroupAvcImeInitializeINTEL",
    id: 5747,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5748: {
    name: "OpSubgroupAvcImeSetSingleReferenceINTEL",
    id: 5748,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5749: {
    name: "OpSubgroupAvcImeSetDualReferenceINTEL",
    id: 5749,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5750: {
    name: "OpSubgroupAvcImeRefWindowSizeINTEL",
    id: 5750,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5751: {
    name: "OpSubgroupAvcImeAdjustRefOffsetINTEL",
    id: 5751,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5752: {
    name: "OpSubgroupAvcImeConvertToMcePayloadINTEL",
    id: 5752,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5753: {
    name: "OpSubgroupAvcImeSetMaxMotionVectorCountINTEL",
    id: 5753,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5754: {
    name: "OpSubgroupAvcImeSetUnidirectionalMixDisableINTEL",
    id: 5754,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5755: {
    name: "OpSubgroupAvcImeSetEarlySearchTerminationThresholdINTEL",
    id: 5755,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5756: {
    name: "OpSubgroupAvcImeSetWeightedSadINTEL",
    id: 5756,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5757: {
    name: "OpSubgroupAvcImeEvaluateWithSingleReferenceINTEL",
    id: 5757,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5758: {
    name: "OpSubgroupAvcImeEvaluateWithDualReferenceINTEL",
    id: 5758,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5759: {
    name: "OpSubgroupAvcImeEvaluateWithSingleReferenceStreaminINTEL",
    id: 5759,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5760: {
    name: "OpSubgroupAvcImeEvaluateWithDualReferenceStreaminINTEL",
    id: 5760,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5761: {
    name: "OpSubgroupAvcImeEvaluateWithSingleReferenceStreamoutINTEL",
    id: 5761,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5762: {
    name: "OpSubgroupAvcImeEvaluateWithDualReferenceStreamoutINTEL",
    id: 5762,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5763: {
    name: "OpSubgroupAvcImeEvaluateWithSingleReferenceStreaminoutINTEL",
    id: 5763,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5764: {
    name: "OpSubgroupAvcImeEvaluateWithDualReferenceStreaminoutINTEL",
    id: 5764,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5765: {
    name: "OpSubgroupAvcImeConvertToMceResultINTEL",
    id: 5765,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5766: {
    name: "OpSubgroupAvcImeGetSingleReferenceStreaminINTEL",
    id: 5766,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5767: {
    name: "OpSubgroupAvcImeGetDualReferenceStreaminINTEL",
    id: 5767,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5768: {
    name: "OpSubgroupAvcImeStripSingleReferenceStreamoutINTEL",
    id: 5768,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5769: {
    name: "OpSubgroupAvcImeStripDualReferenceStreamoutINTEL",
    id: 5769,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5770: {
    name:
      "OpSubgroupAvcImeGetStreamoutSingleReferenceMajorShapeMotionVectorsINTEL",
    id: 5770,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5771: {
    name:
      "OpSubgroupAvcImeGetStreamoutSingleReferenceMajorShapeDistortionsINTEL",
    id: 5771,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5772: {
    name:
      "OpSubgroupAvcImeGetStreamoutSingleReferenceMajorShapeReferenceIdsINTEL",
    id: 5772,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5773: {
    name:
      "OpSubgroupAvcImeGetStreamoutDualReferenceMajorShapeMotionVectorsINTEL",
    id: 5773,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5774: {
    name: "OpSubgroupAvcImeGetStreamoutDualReferenceMajorShapeDistortionsINTEL",
    id: 5774,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5775: {
    name:
      "OpSubgroupAvcImeGetStreamoutDualReferenceMajorShapeReferenceIdsINTEL",
    id: 5775,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5776: {
    name: "OpSubgroupAvcImeGetBorderReachedINTEL",
    id: 5776,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5777: {
    name: "OpSubgroupAvcImeGetTruncatedSearchIndicationINTEL",
    id: 5777,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5778: {
    name: "OpSubgroupAvcImeGetUnidirectionalEarlySearchTerminationINTEL",
    id: 5778,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5779: {
    name: "OpSubgroupAvcImeGetWeightingPatternMinimumMotionVectorINTEL",
    id: 5779,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5780: {
    name: "OpSubgroupAvcImeGetWeightingPatternMinimumDistortionINTEL",
    id: 5780,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5781: {
    name: "OpSubgroupAvcFmeInitializeINTEL",
    id: 5781,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5782: {
    name: "OpSubgroupAvcBmeInitializeINTEL",
    id: 5782,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5783: {
    name: "OpSubgroupAvcRefConvertToMcePayloadINTEL",
    id: 5783,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5784: {
    name: "OpSubgroupAvcRefSetBidirectionalMixDisableINTEL",
    id: 5784,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5785: {
    name: "OpSubgroupAvcRefSetBilinearFilterEnableINTEL",
    id: 5785,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5786: {
    name: "OpSubgroupAvcRefEvaluateWithSingleReferenceINTEL",
    id: 5786,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5787: {
    name: "OpSubgroupAvcRefEvaluateWithDualReferenceINTEL",
    id: 5787,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5788: {
    name: "OpSubgroupAvcRefEvaluateWithMultiReferenceINTEL",
    id: 5788,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5789: {
    name: "OpSubgroupAvcRefEvaluateWithMultiReferenceInterlacedINTEL",
    id: 5789,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5790: {
    name: "OpSubgroupAvcRefConvertToMceResultINTEL",
    id: 5790,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5791: {
    name: "OpSubgroupAvcSicInitializeINTEL",
    id: 5791,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5792: {
    name: "OpSubgroupAvcSicConfigureSkcINTEL",
    id: 5792,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5793: {
    name: "OpSubgroupAvcSicConfigureIpeLumaINTEL",
    id: 5793,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5794: {
    name: "OpSubgroupAvcSicConfigureIpeLumaChromaINTEL",
    id: 5794,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5795: {
    name: "OpSubgroupAvcSicGetMotionVectorMaskINTEL",
    id: 5795,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5796: {
    name: "OpSubgroupAvcSicConvertToMcePayloadINTEL",
    id: 5796,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5797: {
    name: "OpSubgroupAvcSicSetIntraLumaShapePenaltyINTEL",
    id: 5797,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5798: {
    name: "OpSubgroupAvcSicSetIntraLumaModeCostFunctionINTEL",
    id: 5798,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5799: {
    name: "OpSubgroupAvcSicSetIntraChromaModeCostFunctionINTEL",
    id: 5799,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5800: {
    name: "OpSubgroupAvcSicSetBilinearFilterEnableINTEL",
    id: 5800,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5801: {
    name: "OpSubgroupAvcSicSetSkcForwardTransformEnableINTEL",
    id: 5801,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5802: {
    name: "OpSubgroupAvcSicSetBlockBasedRawSkipSadINTEL",
    id: 5802,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5803: {
    name: "OpSubgroupAvcSicEvaluateIpeINTEL",
    id: 5803,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5804: {
    name: "OpSubgroupAvcSicEvaluateWithSingleReferenceINTEL",
    id: 5804,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5805: {
    name: "OpSubgroupAvcSicEvaluateWithDualReferenceINTEL",
    id: 5805,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5806: {
    name: "OpSubgroupAvcSicEvaluateWithMultiReferenceINTEL",
    id: 5806,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5807: {
    name: "OpSubgroupAvcSicEvaluateWithMultiReferenceInterlacedINTEL",
    id: 5807,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5808: {
    name: "OpSubgroupAvcSicConvertToMceResultINTEL",
    id: 5808,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5809: {
    name: "OpSubgroupAvcSicGetIpeLumaShapeINTEL",
    id: 5809,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5810: {
    name: "OpSubgroupAvcSicGetBestIpeLumaDistortionINTEL",
    id: 5810,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5811: {
    name: "OpSubgroupAvcSicGetBestIpeChromaDistortionINTEL",
    id: 5811,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5812: {
    name: "OpSubgroupAvcSicGetPackedIpeLumaModesINTEL",
    id: 5812,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5813: {
    name: "OpSubgroupAvcSicGetIpeChromaModeINTEL",
    id: 5813,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5814: {
    name: "OpSubgroupAvcSicGetPackedSkcLumaCountThresholdINTEL",
    id: 5814,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5815: {
    name: "OpSubgroupAvcSicGetPackedSkcLumaSumThresholdINTEL",
    id: 5815,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5816: {
    name: "OpSubgroupAvcSicGetInterRawSadsINTEL",
    id: 5816,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5887: {
    name: "OpLoopControlINTEL",
    id: 5887,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5946: {
    name: "OpReadPipeBlockingINTEL",
    id: 5946,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5947: {
    name: "OpWritePipeBlockingINTEL",
    id: 5947,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  5949: {
    name: "OpFPGARegINTEL",
    id: 5949,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6016: {
    name: "OpRayQueryGetRayTMinKHR",
    id: 6016,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6017: {
    name: "OpRayQueryGetRayFlagsKHR",
    id: 6017,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6018: {
    name: "OpRayQueryGetIntersectionTKHR",
    id: 6018,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6019: {
    name: "OpRayQueryGetIntersectionInstanceCustomIndexKHR",
    id: 6019,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6020: {
    name: "OpRayQueryGetIntersectionInstanceIdKHR",
    id: 6020,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6021: {
    name: "OpRayQueryGetIntersectionInstanceShaderBindingTableRecordOffsetKHR",
    id: 6021,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6022: {
    name: "OpRayQueryGetIntersectionGeometryIndexKHR",
    id: 6022,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6023: {
    name: "OpRayQueryGetIntersectionPrimitiveIndexKHR",
    id: 6023,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6024: {
    name: "OpRayQueryGetIntersectionBarycentricsKHR",
    id: 6024,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6025: {
    name: "OpRayQueryGetIntersectionFrontFaceKHR",
    id: 6025,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6026: {
    name: "OpRayQueryGetIntersectionCandidateAABBOpaqueKHR",
    id: 6026,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6027: {
    name: "OpRayQueryGetIntersectionObjectRayDirectionKHR",
    id: 6027,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6028: {
    name: "OpRayQueryGetIntersectionObjectRayOriginKHR",
    id: 6028,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6029: {
    name: "OpRayQueryGetWorldRayDirectionKHR",
    id: 6029,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6030: {
    name: "OpRayQueryGetWorldRayOriginKHR",
    id: 6030,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6031: {
    name: "OpRayQueryGetIntersectionObjectToWorldKHR",
    id: 6031,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6032: {
    name: "OpRayQueryGetIntersectionWorldToObjectKHR",
    id: 6032,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
  6035: {
    name: "OpAtomicFAddEXT",
    id: 6035,
    read(
      buffer: Buffer,
      offset: uint32,
      wordCount: uint32,
      resultMap: Map<uint32, string>
    ) {},
  },
};
