const EOF_byte: number = -1;
const EOF_code_point: number = -1;

export function readStringTillNull(
  buffer: Buffer,
  offset: number,
  keepEvenByte: boolean = true
): string {
  let str: string = "";
  let num: number = 0;
  while (offset < buffer.byteLength) {
    let _byte: number = buffer.readUInt8(offset++);
    num++;
    if (_byte !== 0) {
      str += String.fromCharCode(_byte);
    } else {
      if (keepEvenByte && num % 2 !== 0) {
        offset++;
      }
      break;
    }
  }
  return str;
}

export function readUTFBytes(
  buffer: Buffer,
  length: number,
  offset: number
): string {
  if (!validate(buffer, offset + length)) return null;

  let _bytes: Uint8Array = new Uint8Array(
    buffer.buffer,
    buffer.byteOffset + offset,
    length
  );
  return decodeUTF8(_bytes);
}
function validate(buffer: Buffer, position: number): boolean {
  // len += this.data.byteOffset;
  if (buffer.byteLength > 0 && position <= buffer.byteLength) {
    return true;
  }
  throw "Error #2030: End of file was encountered.";
}

export function decodeUTF8(data: Uint8Array): string {
  const fatal: boolean = false;
  let pos: number = 0;
  let result: string = "";
  let code_point: number;
  let utf8_code_point = 0;
  let utf8_bytes_needed = 0;
  let utf8_bytes_seen = 0;
  let utf8_lower_boundary = 0;

  while (data.length > pos) {
    const _byte = data[pos++];

    if (_byte === EOF_byte) {
      if (utf8_bytes_needed !== 0) {
        code_point = decoderError(fatal);
      } else {
        code_point = EOF_code_point;
      }
    } else {
      if (utf8_bytes_needed === 0) {
        if (inRange(_byte, 0x00, 0x7f)) {
          code_point = _byte;
        } else {
          if (inRange(_byte, 0xc2, 0xdf)) {
            utf8_bytes_needed = 1;
            utf8_lower_boundary = 0x80;
            utf8_code_point = _byte - 0xc0;
          } else if (inRange(_byte, 0xe0, 0xef)) {
            utf8_bytes_needed = 2;
            utf8_lower_boundary = 0x800;
            utf8_code_point = _byte - 0xe0;
          } else if (inRange(_byte, 0xf0, 0xf4)) {
            utf8_bytes_needed = 3;
            utf8_lower_boundary = 0x10000;
            utf8_code_point = _byte - 0xf0;
          } else {
            decoderError(fatal);
          }
          utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
          code_point = null;
        }
      } else if (!inRange(_byte, 0x80, 0xbf)) {
        utf8_code_point = 0;
        utf8_bytes_needed = 0;
        utf8_bytes_seen = 0;
        utf8_lower_boundary = 0;
        pos--;
        code_point = decoderError(fatal, _byte);
      } else {
        utf8_bytes_seen += 1;
        utf8_code_point =
          utf8_code_point +
          (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);

        if (utf8_bytes_seen !== utf8_bytes_needed) {
          code_point = null;
        } else {
          const cp = utf8_code_point;
          const lower_boundary = utf8_lower_boundary;
          utf8_code_point = 0;
          utf8_bytes_needed = 0;
          utf8_bytes_seen = 0;
          utf8_lower_boundary = 0;
          if (
            inRange(cp, lower_boundary, 0x10ffff) &&
            !inRange(cp, 0xd800, 0xdfff)
          ) {
            code_point = cp;
          } else {
            code_point = decoderError(fatal, _byte);
          }
        }
      }
    }
    // Decode string
    if (code_point !== null && code_point !== EOF_code_point) {
      if (code_point <= 0xffff) {
        if (code_point > 0) result += String.fromCharCode(code_point);
      } else {
        code_point -= 0x10000;
        result += String.fromCharCode(0xd800 + ((code_point >> 10) & 0x3ff));
        result += String.fromCharCode(0xdc00 + (code_point & 0x3ff));
      }
    }
  }
  return result;
}

export function encoderError(code_point) {
  throw "EncodingError! The code point " +
    code_point +
    " could not be encoded.";
}

export function decoderError(fatal, opt_code_point?): number {
  if (fatal) {
    throw "DecodingError";
  }
  return opt_code_point || 0xfffd;
}

export function inRange(a: number, min: number, max: number) {
  return min <= a && a <= max;
}
