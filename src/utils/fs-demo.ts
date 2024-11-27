import fs from "fs";

// just so it looks nicer in the console
const prettyWrapLog = (logText: string) => {
  console.log("=".repeat(20));
  console.log(logText);
  console.log("=".repeat(20));
  console.log("\n");
};

const readAFile = async (path: string) => {
  try {
    console.log(`Reading file in ${path}...`);
    // could also just import from fs/promises
    const data = await fs.promises.readFile(path, "utf-8");
    console.log("File data is:");
    prettyWrapLog(data);
  } catch (err) {
    console.log(err);
  }
};

// this overwrites the file if it already exists
const writeAFile = async (path: string, data: string) => {
  try {
    console.log(`Writing to file in ${path}`);
    await fs.promises.writeFile(path, data);
    console.log("Data written to file! File is now: \n");
    prettyWrapLog(`${data}`);
  } catch (err) {
    console.log(err);
  }
};

const appendToFile = async (path: string, data: string) => {
  try {
    console.log(`Appending to file in ${path}...`);
    await fs.promises.appendFile(path, data);
    await readAFile(path);
  } catch (err) {
    console.log(err);
  }
};

const deleteAFile = async (path: string) => {
  try {
    console.log(`Deleting file in ${path}...`);
    await fs.promises.unlink(path);
    console.log("File deleted!");
  } catch (err) {
    console.log(err);
  }
};

const runDemo = async () => {
  await readAFile("src/utils/test.txt");

  await writeAFile("src/utils/test.txt", "Hello World");

  await appendToFile("src/utils/test.txt", "\nHello Again");

  // await deleteAFile("src/utils/test.txt");
};

runDemo();
