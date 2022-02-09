import fs  from 'fs'
import Path from 'path'

console.dir("Deploy")

 const deleteFolderRecursive = function(path: any) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive('../SSE/node_modules') 

function getFilesInDirectory() {
    console.log("\nFiles present in directory:");
    let files = fs.readdirSync('../SSE');
    files.forEach(file => {
      console.log(file);
    });
}
