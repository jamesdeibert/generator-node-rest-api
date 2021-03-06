'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.options = {
      name: 'node-rest-api'
    };
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-node-rest-api') + ' generator!'
    ));
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: this.options.name // Default to current folder name
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        default: ''
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: ''
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Confirm to install?',
        default: true
      }]).then(answers => {
        this.options.name = answers.name;
        this.options.author = answers.author;
        this.options.description = answers.description;
        this.options.confirm = answers.confirm;
      });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('node-rest-api/src'),
      this.destinationPath(`${this.options.name}/src`)
    );
    this.fs.copyTpl(
      this.templatePath('node-rest-api/test'),
      this.destinationPath(`${this.options.name}/test`)
    );
    this.fs.copyTpl(
      this.templatePath('node-rest-api/.*'),
      this.destinationPath(`${this.options.name}`)
    );
    this.fs.copyTpl(
      this.templatePath('node-rest-api/README.md'),
      this.destinationPath(`${this.options.name}/README.md`)
    );
    this.fs.delete(
      this.destinationPath(`${this.options.name}/.npmignore`)
    );
    this.fs.write(
      this.destinationPath(`${this.options.name}/.gitignore`),
      `
# Created by https://www.gitignore.io/api/node

### Node ###
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules
jspm_packages

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Custom
dist
influxdb

# MAC OS X
.DS_Store

#.idea
/.idea

temp/

    `);
    const pkg = this.fs.readJSON(this.templatePath('node-rest-api/package.json'), {});
    pkg.name = this.options.name;
    pkg.author = this.options.author;
    pkg.description = this.options.description;
    this.fs.writeJSON(this.destinationPath(`${this.options.name}/package.json`), pkg);
  }

  end() {
    if (this.options.confirm) {
      this.log(
      `
      All things are almost done.
      Last thing: Edit the mongodb config in [src/config.js] manually
      Enter the project dir and as below:
      Use command [npm install] or [yarn] to install the dependencies
      Use command [npm run start] to start the project
      Use command [npm run test] to run the test
      `);
    } else {
      this.log('Process terminated');
    }
  }
};
