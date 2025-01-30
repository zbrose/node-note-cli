import fs from "node:fs/promises";

const read = async () => {
  const path = new URL("./package.json", import.meta.url).pathname;
  console.log(JSON.parse(await fs.readFile(path, "utf-8")));
};

const write = async () => {
  const newFile = new URL("./demo.js", import.meta.url).pathname;
  await fs.writeFile(newFile, `console.log('hello')`);
};

read();
write();
