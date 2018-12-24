const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const fs = require('fs');
const rimraf = require('rimraf');
const R = require('ramda');

const packageJson = require('./package.json');

async function kickstart () {
  const questions = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: `What's the name of your project? (kebab-cased)`,
      default: 'awesome-project'
    },
    {
      type: 'input',
      name: 'projectAuthor',
      message: `Who's the author?`,
      default: 'Alex Sol'
    }
  ]);

  const { projectName, projectAuthor } = questions;

  const layoutPath = './src/templates/_layouts/layout.pug';
  const layoutFile = fs.readFileSync(layoutPath, 'utf8');

  ui.log.write('Updating package.json name');
  packageJson.name = projectName;

  ui.log.write('Updating package.json author');
  packageJson.author = projectAuthor;

  packageJson.description = '';

  ui.log.write('Removing package.json kickstart dependencies');
  packageJson.kickstartDependencies.forEach((kickstartDependency) => {
    delete packageJson.devDependencies[kickstartDependency];
    rimraf.sync(`./node-modules/${kickstartDependency}`);
  });

  delete packageJson.kickstartDependencies;

  ui.log.write('Removing package.json kickstart script');
  delete packageJson.scripts.kickstart;

  ui.log.write('Writing new package.json');
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4));

  ui.log.write('Removing package-lock.json');
  fs.unlinkSync('./package-lock.json');

  ui.log.write('Setting page title to project name');
  let newLayoutFile = R.replace(/{{projectName}}/g, projectName)(layoutFile);

  ui.log.write('Writing new layout.pug');
  fs.writeFileSync(layoutPath, newLayoutFile, 'utf8');

  ui.log.write('Removing kickstarter script');
  fs.unlinkSync('./kickstarter.js');

  // TODO(AlexSol): create question about what use ts or js

  ui.log.write('All done!');
}

kickstart();
