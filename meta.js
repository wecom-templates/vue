const path = require('path');
const {
  sortDependencies,
  installDependencies,
  printMessage
} = require('./utils');

module.exports = {
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      require: true,
      message: 'Project name'
    },

    description: {
      when: 'isNotTest',
      type: 'string',
      require: false,
      message: 'Project description',
      default: 'A Vue.js project'
    },

    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author'
    },

    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no'
        }
      ]
    }
  },

  complete: function (data, {chalk}) {
    const green = chalk.green;

    sortDependencies(data, green);

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return printMessage(data, green);
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk);
    }
  }
}