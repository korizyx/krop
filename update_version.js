import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const path = "./package.json";
const _package = JSON.parse(readFileSync(path).toString());

console.log(_package);
const old_version = _package.version;
const new_version = incrementVersionNumber(old_version);

_package.version = new_version;

writeFileSync(path, JSON.stringify(_package, null, 2));

execSync("yarn build");
execSync(`git add . && git commit -m "${new_version}" && git push`).toString();

console.log(
  `Updated to version ${new_version} from version ${old_version}\n\nrun: npm publish`
);

function incrementVersionNumber(version, delimiter = ".") {
  const arr = version.split(delimiter);

  if (arr[arr.length - 1] == 9) {
    if (arr[arr.length - 2] == 9) {
      arr[arr.length - 3] = (Number(arr[arr.length - 3]) + 1).toString();
      arr[arr.length - 2] = "0";
      arr[arr.length - 1] = "0";
    } else {
      arr[arr.length - 2] = (Number(arr[arr.length - 2]) + 1).toString();
      arr[arr.length - 1] = "0";
    }
  } else if (arr[arr.length - 2] == 9 && arr[arr.length - 1] != 9) {
    arr[arr.length - 1] = (Number(arr[arr.length - 1]) + 1).toString();
  } else {
    arr[arr.length - 1] = (Number(arr[arr.length - 1]) + 1).toString();
  }

  return `${arr}`.replace(",", ".").replace(",", ".");
}
