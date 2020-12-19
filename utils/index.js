const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function sortObject (object) {
  const sortedObject = {};
  Object.keys(object)
    .sort() // 按字母表排序
    .forEach(item => {
      sortedObject[item] = object[item];
    });
  return sortedObject;
}

function runCommand (cmd, args, options) {
  return new Promise((resolve, reject) => {
    const cusSpawn = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit', // 将相应的 stdio 流传给父进程或从父进程传入
          shell: true, // run command inside of a shell
        },
        options
      )
    );

    cusSpawn.on('exit', () => {
      resolve();
    });

    cusSpawn.on('error', err => {
      reject(err)
    });
  })
}

function installMsg (data) {
  return !data.autoInstall ? 'npm install (or if using yarn: yarn)\n  ' : '';
}

exports.sortDependencies = function sortDependencies (data) {
  const packageJsonFile = path.join(
    data.inPlace ? '' : data.destDirName,
    'package.json'
  );
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile));
  packageJsonFile.devDependencies = sortObject(packageJson.devDependencies);
  packageJson.dependencies = sortObject(packageJson.dependencies);
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n'); // JSON.stringfy(value[,replacer [,space]])
}

exports.installDependencies = function installDependencise (
  cwd,
  executable = 'npm',
  color
) {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`)
  console.log('#===========================\n');
  return runCommand(executable, ['install'], {
    cwd
  })
}

exports.printMessage = function printMessage(data, { green, yellow }) {
  const message = `
# ${green('Project initiallization finished!')}
# =============================================

To get started:
  
  ${yellow(
    `${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${installMsg(data)}npm run serve`
  )}
  `;
  console.log(message);
}