import fs from "fs";
import path from "path";

const ROOT = path.join(__dirname, "../");

export default (filenameNoExt: string) => {
    return fs.readFileSync(`${ROOT}public/${filenameNoExt}.mjml`, "utf8");
};
