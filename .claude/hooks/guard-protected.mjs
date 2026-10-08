import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const ti = input.tool_input ?? {};

const PROTECTED = [
  /(^|\/)ios\/Pods\//,
  /(^|\/)android\/(app\/)?build\//,
  /(^|\/)node_modules\//,
  /(^|\/)\.env(\.(?!example$)[^/]*)?$/,
  /(^|\/)bun\.lockb?$/,
];
const DANGEROUS = [/\brm\s+-rf\b/, /\bgit\s+push\b.*--force/, /\bgit\s+reset\s+--hard\b/];

const block = (msg) => { console.error(msg); process.exit(2); };

if (ti.file_path) {
  const p = String(ti.file_path).replaceAll("\\", "/");
  if (PROTECTED.some((r) => r.test(p)))
    block(`Chặn: ${p} là file generated/secret. Hãy hỏi người dùng nếu thật sự cần sửa.`);
}
if (input.tool_name === "Bash" && ti.command && DANGEROUS.some((r) => r.test(ti.command)))
  block("Chặn: lệnh nguy hiểm (rm -rf / force push / reset --hard). Hãy xin xác nhận từ người dùng.");

process.exit(0);
