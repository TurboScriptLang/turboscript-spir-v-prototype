// #!/usr/bin/env ts-node
import glslangModule from "@webgpu/glslang";
import fs from "fs";

const glslang = glslangModule();

export async function main() {
  console.log("TEST");

  const code = await glslang.compileGLSL(
    `#version 450
  layout(location = 0) out vec4 fragColor;
  void main() {
    fragColor = vec4(1.0);
  }
`,
    "fragment"
  );

  fs.writeFileSync("code.spirv", code);
}
main();
