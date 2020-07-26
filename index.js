#!/usr/bin/env node

const prog = require('caporal');
const fs = require('fs');
const path = require('path');
const generate = require('./lib/generator');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

prog
  .version('1.0.0')

  .argument('<name>', 'Name of the model or module')

  .option('-p <prefix>', 'Specify root/prefix dir to generate in')
  .option('--prefix <prefix>', 'Specify root/prefix dir to generate in')

  .option('-a', 'Generate all (Module + Controller + Service + Repository + Model')
  .option('--all', 'Generate all (Module + Controller + Service + Repository + Model')

  .option('-m', 'Generate a Module')
  .option('--module', 'Generate a Module')

  .option('-r', 'Generate a Repository for the model')
  .option('--repo', 'Generate a Repository for the model')
  .option('--repository', 'Generate a Repository for the model')

  .option('-d', 'Generate the model files')
  .option('--model', 'Generate the model file')
  .option('--model-name <name>', 'Specify a custom class name for the model')
  .option('--model-dir <dir>', 'Specify a subdirectory to put the model in (ie. \'models\')')

  .option('-c', 'Generate a Controller for the model')
  .option('--controller', 'Generate a Controller for the model')

  .option('-s', 'Generate a Service for the model')
  .option('--service', 'Generate a Service for the model')

  // make interface?
  .option('--crud', 'Generates CRUD actions within the Controller and Service')
  
  // add authentication guards?
  .option('--auth', 'CRUD actions will add authentication guards, requiring a logged in user')
  .option('--auth-guard-class <name>', 'Name of a custom @(Guard<name>) class to use')
  .option('--auth-guard-dir <dir>', 'The location of the custom @Guard class file')

  .option('--template-dir <dir>', 'The location of the template files to use')
  .option('--no-subdir', 'Don\'t put generated files in <name> subdirectory (if not using a module)')

  .action((args, o, logger) => {

    // normalize and validate
    if (o.p) { o.prefix = o.p };
    if (o.a || o.all) { o.all = true };
    if (o.m || o.module) { o.module = true };
    if (o.r || o.repo || o.repository) { o.repository = true };
    if (o.md || o.model || o.repository) { o.model = true };
    if (o.c || o.controller) { o.controller = true };
    if (o.s || o.service) { o.service = true };

    if (o.all) {
        o.module = o.repository = o.model = o.controller = o.service = o.crud = true;
    }

    o.name = args.name;

    // set auth guarding params if applicable
    if (o.auth) {
        o.authGuardName = o.authGuardClass ? o.authGuardClass : 'PrincipalGuard';
        o.authGuardDir =  o.authGuardDir ? o.authGuardDir : 'modules/auth/lib/';
    }

    // make containing folder
    let outPath =  path.resolve((o.prefix ? o.prefix : './'));
    if (o.module) {
        outPath += `/modules/${o.name}`;
    } else {
        outPath += o.noSubdir ? '' : `/${o.name}`;
    }

    fs.mkdirSync(outPath, { recursive: true });
    
    // MODEL ?
    if (o.model || o.repository || o.crud) {
        if (!o.modelName) {
            o.modelName = capitalize(o.name);
            if (o.modelName.charAt(o.modelName.length-1) === 's') {
                o.modelName = o.modelName.substr(0, o.modelName.length-1);
            }
        }

        o.modelNameLower = o.modelName.toLowerCase();

        let outPathModel = outPath;
        if (o.modelDir) {
            outPathModel += '/' + o.modelDir;
            if (o.modelName.charAt(o.modelName.length-1) !== '/') {
                o.modelDir += '/';
            }
        } else {
            o.modelDir = '';
        }

        fs.mkdirSync(outPathModel, { recursive: true });
        let outFile = `${outPathModel}/${o.modelName.toLowerCase()}.model.ts`;

        generate('model', o, outFile);
    }

    // MODULE ?
    if (o.module) {
        let outFile = `${outPath}/${o.name}.module.ts`;
        generate('module', o, outFile);
    }

    // REPOSITORY ?
    if (o.repository) {
        o.repositoryName = capitalize(o.name) + 'Repository';
        let outFile = `${outPath}/${o.name}.repository.ts`;
        generate('repository', o, outFile);
    } else if (o.crud) {
        o.repositoryName = `Repository\<${o.modelName}\>`;
        let outFile = `${outPath}/${o.name}.repository.ts`;
        generate('repository', o, outFile);
    }

    // CONTROLLER ?
    if (o.controller || o.crud) {
        let outFile = `${outPath}/${o.name}.controller.ts`;
        generate('controller', o, outFile);
    }

    // SERVICE ?
    if (o.service) {
        let outFile = `${outPath}/${o.name}.service.ts`;
        generate('service', o, outFile);
    }

  });

prog.parse(process.argv);


// ask some prompts first
// gen <somename> --module --repo --model --controller --service --crud

