const prog = require('caporal');
let fs = require('fs');
let path = require('path');
let generate = require('./lib/generator');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

prog
  .version('1.0.0')
  .command('gen', 'Generate the model package...')
  .argument('<name>', 'Name of the model or module')

  .option('--p <prefix>', 'Specify root/prefix dir to generate in')
  .option('--prefix <prefix>', 'Specify root/prefix dir to generate in')

  .option('--a', 'Generate all (module + controller + service + repository + model')
  .option('--all', 'Generate all (module + controller + service + repository + model')

  .option('--m', 'Generate a module')
  .option('--module', 'Generate a module')

  .option('-r', 'Generate a repository for the model')
  .option('--repo', 'Generate a repository for the model')
  .option('--repository', 'Generate a repository for the model')

  .option('--md', 'Generate the model files')
  .option('--model', 'Generate the model files')
  .option('--model-name', 'Specify the exact name for the model class')

  .option('--c', 'Generate a controller for the model')
  .option('--controller', 'Generate a controller for the model')

  .option('--s', 'Generate a service for the model')
  .option('--service', 'Generate a service for the model')

  // make interface?
  .option('--crud', 'Generates CRUD actions within the controller and service')
  .option('--auth', 'CRUD actions will require a logged in user')

  // extended options
  .option('--no-model-dir', 'Don\'t put models in "models" subdirectory')

  .action((args, o, logger) => {

    console.log("RUN", args, o);

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
    // TODO: move to config
    if (o.auth) {
        o.authGuardName = 'PrincipalGuard';
        o.authGuardLocation = 'modules/auth/lib/PrincipalGuard';
    }

    // make containing folder
    let outPath =  path.resolve((o.prefix ? o.prefix : './'));
    if (o.module) {
        outPath += `/modules/${o.name}`;
    } else {
        outPath += `/${o.name}`;
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

        let outPathModel = outPath + '/models';
        if (o.noModelDir) {
            outPathModel = outPath;
        } else {
            fs.mkdirSync(outPathModel, { recursive: true });
        }
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

    // SERVICE ?s
    if (o.service) {
        let outFile = `${outPath}/${o.name}.service.ts`;
        generate('service', o, outFile);
    }

  });

prog.parse(process.argv);


// ask some prompts first
// gen <somename> --module --repo --model --controller --service --crud

