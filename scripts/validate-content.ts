import { loadAll } from "../lib/content";

const { tasks, errors, warnings } = loadAll();
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`${tasks.length} task(s) loaded, ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
