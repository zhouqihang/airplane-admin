const fs = require('fs');
// 删除index.tsx
removeIndexFile();
// 复制对应的文件
const args = process.argv;
const sys = args[2];
copyFile(sys);


function removeIndexFile() {
  fs.unlinkSync(__dirname + '/src/index.tsx');
}

function copyFile() {
  fs.copyFileSync(__dirname + `/src/index-${sys}.tsx`, __dirname + '/src/index.tsx');
}
