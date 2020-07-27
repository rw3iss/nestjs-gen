#!/usr/bin/env node

const prog = require('caporal');
const fs = require('fs');
const path = require('path');
const generate = require('./lib/generator');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function _getFileName(className, type, casing) {
    if (casing) {
        if (casing == 'pascal') {
            return `${capitalize(className)}${capitalize(type)}`;
        }
    }

    return `${className.toLowerCase()}.${type}`;
}

function _findConfig() {
    let ngenConfig;

    // look in tsconfig.app.json
    let configFile = path.resolve("./tsconfig.app.json");
    if (fs.existsSync(configFile)) {
        let config = require(configFile);
        if (config['ngen-config']) {
            ngenConfig = config['ngen-config']
        }
    } 
    
    // look in tsconfig.json
    if (!ngenConfig) {
        configFile = path.resolve("./tsconfig.json");
        if (fs.existsSync(configFile)) {
            let config = require(configFile);
            if (config['ngen-config']) {
                ngenConfig = config['ngen-config']
            }
        }
    }

    return ngenConfig;
}

prog
.version('1.0.0')

.argument('<name>', 'Name of the model or module')

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

// add prefix/subdir to generate in
.option('-p <prefix>', 'Specify root/prefix dir to generate in')
.option('--prefix <prefix>', 'Specify root/prefix dir to generate in')

// add authentication guards?
.option('--auth', 'CRUD actions will add authentication guards, requiring a logged in user')
.option('--auth-guard-class <name>', 'Name of a custom @(Guard<name>) class to use')
.option('--auth-guard-dir <dir>', 'The location of the custom @Guard class file')

.option('--template-dir <dir>', 'The location of the template files to use')
.option('--no-subdir', 'Don\'t put generated files in <name> subdirectory (only if not using a module)')

.option('--casing <pascal>', 'default = "example.controller.ts", pascal = "ExampleController.ts"')

.action((args, o, logger) => {

    // first see if there is a configuration file available, and start with that
    let config = _findConfig();
    if (config) {
        if (config["prefix"] && !o.prefix) 
            o.prefix = config["prefix"] ;

        if (config["model-dir"] && !o.modelDir) 
            o.modelDir = config["model-dir"] ;

        if (config["template-dir"] && !o.templateDir) 
            o.templateDir = config["template-dir"] ;

        if (config["no-subdir"] && !o.noSubdir) 
            o.noSubdir = config["no-subdir"] ;

        if (config["casing"] && !o.casing) 
            o.casing = config["casing"] ;

        if (config["auth-guard-class"] && !o.authGuardClass) 
        o.authGuardClass = config["auth-guard-class"] ;

        if (config["auth-guard-dir"] && !o.authGuardDir) 
            o.authGuardDir = config["auth-guard-dir"] ;
    }

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
        o.authGuardDir =  o.authGuardDir ? (o.authGuardDir+'/') : 'modules/auth/lib/';
    }

    // make containing folder
    let outPath =  path.resolve((o.prefix ? o.prefix : './'));
    if (o.module) {
        outPath += `/modules/${o.name}`;
    } else {
        outPath += o.noSubdir ? '' : `/${o.name}`;
    }

    fs.mkdirSync(outPath, { recursive: true });

    // container for which files will be generated
    let stagedFiles = [];
    
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

        o.modelFileName = _getFileName(o.modelName, 'model', o.casing);
        let outFile = `${outPathModel}/${o.modelFileName}.ts`;

        stagedFiles.push({ type: 'model', outFile });
    }

    // MODULE ?
    if (o.module) {
        o.moduleFileName = _getFileName(o.name, 'module', o.casing);
        let outFile = `${outPath}/${o.moduleFileName}.ts`;
        stagedFiles.push({ type: 'module', outFile });
    }

    // REPOSITORY ?
    if (o.repository) {
        o.repositoryName = capitalize(o.name) + 'Repository';
        o.repositoryFileName = _getFileName(o.name, 'repository', o.casing);
        let outFile = `${outPath}/${o.repositoryFileName}.ts`;
        stagedFiles.push({ type: 'repository', outFile });
    } else if (o.crud) {
        // use a generic repository
        o.repositoryName = `Repository\<${o.modelName}\>`;
        o.repositoryFileName = _getFileName(o.name, 'repository', o.casing);
        let outFile = `${outPath}/${o.repositoryFileName}.ts`;
        stagedFiles.push({ type: 'repository', outFile });
    }

    // CONTROLLER ?
    if (o.controller || o.crud) {
        o.controllerFileName = _getFileName(o.name, 'controller', o.casing);
        let outFile = `${outPath}/${o.controllerFileName}.ts`;
        stagedFiles.push({ type: 'controller', outFile });
    }

    // SERVICE ?
    if (o.service) {
        o.serviceFileName = _getFileName(o.name, 'service', o.casing);
        let outFile = `${outPath}/${o.serviceFileName}.ts`;
        stagedFiles.push({ type: 'service', outFile });
    }

    stagedFiles.forEach(fd => {
        generate(fd.type, o, fd.outFile);
    });

});

prog.parse(process.argv);