import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { relative } from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_input?.file_path;
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
if (!file) process.exit(0);

const rel = relative(root, file).replaceAll("\\", "/");
if (!rel.startsWith("app/") || !/\.(ts|tsx|js|jsx)$/.test(rel)) process.exit(0);

const r = spawnSync("bunx", ["eslint", "--fix", rel], { cwd: root, encoding: "utf8" });
if (r.status !== 0) {
  console.error(`ESLint còn lỗi ở ${rel}:\n${(r.stdout + r.stderr).slice(0, 3000)}`);
  process.exit(2);
}
process.exit(0);
