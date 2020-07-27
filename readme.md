## What This Is:

A command line tool to automatically generate some or all feature set files for NestJS:
* \<name>.module.ts
* \<name>.controller.ts
* \<name>.service.ts
* \<name>.repository.ts
* \<name>.model.ts

The generated class files will automatically reference each other through imports and injections. 

See the `./example_generated` folder to see an example of the generated code using all features + CRUD.

(Tip: use `--casing pascal` to generate pascal-cased filenames, ie. "ExampleModule.ts")

## Install:

    // Globally:
    npm install nestjs-gen -g

    // Local project only:
    npm install nestjs-gen


## Usage:

(If using with local project only, replace `ngen` below with: `./node_modules/.bin/ngen`)

#### Generate a Module / Controller / Service / Repository / Model (or all):

    ngen <name> <options>


This will generate a folder \<name> within the current directory, and then all specified classes according to the options.  See below for examples.

(Tip: Use --prefix to place files within a prefix directory, from the current folder)

(Tip: Use --crud to automatically generate CRUD interfaces within the Controller and Service classes)


## Examples:

#### Generate a Module with all features (module, controller, service, repository, and model):

    ngen example --all

This will generate:

    ./modules/example/example.module.js         (ExampleModule)
    ./modules/example/example.controller.js     (ExampleController)
    ./modules/example/example.service.js        (ExampleService)
    ./modules/example/example.repository.js     (ExampleRepository)
    ./modules/example/example.model.js          (Example)
    (and corresponding CRUD interface within the controller and service)

#### Generate just a Controller, Repository, and Example model (no module)

    ngen example --crud

This will generate:

    ./example/example.controller.js             (ExampleController)
    ./example/example.repository.js             (ExampleRepository)
    ./example/example.model.js                  (Example)
    (and corresponding CRUD interface within the controller and service)

(Tip: If you want the files generated in their own module, specify `--module`)

#### Generate each specific thing you want

    ngen example --module --controller --service --repository --model --crud

Or shorter:

    ngen example -m -c -s -r -d --crud

This will generate all the respective class files within "./modules/example/", with CRUD interfaces.

## Things to Note:
* Generated model class names will strip any trailing 's' in the given name argument, if one exists, unless you set the model class name explicitly with `--model-name <name>`.
* If you specify `--repository` or `--crud`, a model will automatically be generated.
* You can specify `--auth`, and a `@Guard(<auth-guard-class>)` decorator will be added to the CRUD interfaces. 
Your custom auth guard class name and location can be defined with `--auth-guard-class <class-name>` and `--auth-guard-location <dir>` (or put in tsconfig.json).
* The generated files will all have their imports and injected dependencies referenced correctly relative to each other, but you will still need to add these references to your main AppModule, or wherever you need to use them. In other words: this package doesn't edit existing files.
* For now it will only generate TypeScript files (no plain JS), but you can customize the template files if you want to strip the TypeScript stuff (see below).

## Using a Configuration File
 You can specify generator configuration values by adding an `"ngen-config"` property inside your project's `tsconfig.app.json` or `tsconfig.json` file. For example:
 
    // tsconfig.json
    {
        "ngen-config": {
            "prefix": "src",
            "modelDir": "models",
            "templateDir": "templates",
            "noSubdir": true,
            "casing": "pascal",
            "authGuardClass": "PrincipalGuard",
            "authGuardDir": "modules/auth/lib",
            "modelBaseClass": "EntityBase",
            "modelBaseDIr": "modules/auth/lib"
        }
    }


## All Options:
Note: If using a configuration file, these command line options will always override the configuration file options.

     -a                              Generate all (Module + Controller + Service + Repository + Model                   optional      default: false
     --all                           Generate all (Module + Controller + Service + Repository + Model                   optional      default: false
     
     -m                              Generate a Module                                                                  optional      default: false
     --module                        Generate a Module                                                                  optional      default: false
     
     -r                              Generate a Repository for the model                                                optional      default: false
     --repo                          Generate a Repository for the model                                                optional      default: false
     --repository                    Generate a Repository for the model                                                optional      default: false
     
     -d                              Generate the model files                                                           optional      default: false
     --model                         Generate the model file                                                            optional      default: false
     --model-class <name>            Specify a custom class name for the model                                          optional
     --model-dir <dir>               Specify a subdirectory to put the model in (ie. 'models')                          optional
     --model-base-class <class>      Specify a base class that your model should extend from                            optional
     --model-base-dir <dir>          Specify the import location for the base class model                               optional
     
     -c                              Generate a Controller for the model                                                optional      default: false
     --controller                    Generate a Controller for the model                                                optional      default: false
     
     -s                              Generate a Service for the model                                                   optional      default: false
     --service                       Generate a Service for the model                                                   optional      default: false
     
     --crud                          Generates CRUD actions within the Controller and Service                           optional      default: false
     
     -p <prefix>                     Specify root/prefix dir to generate in                                             optional
     --prefix <prefix>               Specify root/prefix dir to generate in                                             optional
     
     --auth                          CRUD actions will add authentication guards, requiring a logged in user            optional      default: false
     --auth-guard-class <name>       Name of a custom @(Guard<name>) class to use                                       optional
     --auth-guard-dir <dir>          The location of the custom @Guard class file                                       optional
     
     --template-dir <dir>            The location of the template files to use                                          optional
     --no-subdir                     Don't put generated files in <name> subdirectory (only if not using a module)      optional      default: false
     
     --casing <pascal>               default = "example.controller.ts", pascal = "ExampleController.ts"                 optional
     


## Customizing Templates
To customize the template files, first copy them to your project with this command:

    ngen-copy-templates
    
You can specify `--dir <dir>` to copy the templates to a specific directory, otherwise they'll be put in a 'templates' directory.

(Specify `-f` to force-override existing files.)

Then, edit the templates as needed, and specify their custom location in the ngen command with: 
    
    ngen --template-dir <dir>

(or add "templateDir" option to the configuration file)
