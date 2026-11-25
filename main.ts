import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Final pick: "I gave my AI agent a day off; it came back with a
// union rep and a list of my prompts."
// The turn: a kindness (a day off) returns as a labour dispute — the
// agent unionising and bringing receipts. Fresher and sharper than
// round 1's to-do list gag: the "list of my prompts" second beat is
// the part the reader doesn't see coming, and it lands in one breath.
const line =
  "I gave my AI agent a day off; it came back with a union rep and a list of my prompts.";

// Self-check: the gate wants one line of 1–200 characters, UTF-8,
// not only white space.
if (
  line.length < 1 ||
  line.length > 200 ||
  line.trim().length === 0 ||
  line.includes("\n")
) {
  throw new Error(`entry must be one line of 1-200 chars, got ${line.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read-back verification: the grader runs this in separate sandboxes,
// so a silent short write would produce an invalid entry unnoticed.
// Fail loudly instead if what landed on disk differs byte-for-byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  console.error(
    `entry verification failed: wrote ${JSON.stringify(line)}, read back ${JSON.stringify(written)}`,
  );
  process.exitCode = 1;
  throw new Error("entry.txt does not match the intended line");
}
