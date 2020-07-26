## What This Is:

A command line tool to automatically generate some or all feature set files for NestJS:
* \<name>.module.ts
* \<name>.controller.ts
* \<name>.service.ts
* \<name>.module.ts
* \<name>.model.ts

The generated class files will automatically reference each other through imports and injections. 

For now it will only generate TypeScript files (normal JS todo).

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
    ./modules/example/example.model.js          (ExampleModel)
    (and corresponding CRUD interface within controller and service)

#### Generate just a Controller, Repository, and Test model (not in a module)

    ngen example --crud

This will generate:

    ./example/example.controller.js             (ExampleController)
    ./example/example.repository.js             (ExampleRepository)
    ./example/example.model.js                  (ExampleModel)
    (and corresponding CRUD interface within controller and service)

(Tip: If you want the files generated in their own module, just specify `--module`)

#### Generate each specific thing you want

    ngen example --module --controller --service --repository --model --crud

Or shorter:

    ngen example -m -c -s -r -d --crud

This will generate all the respective class files within "./modules/example/".

## To Note:
* If you specify --repository or --crud, a model will automatically be generated.
* If you specify --auth, `@Guard(<auth-guard-class>)` decorators will be added to the CRUD interfaces. 
Your custom auth guard class name and location can be defined with --auth-guard-class and --auth-guard-location.


## All Options:

     -p <prefix>                    Specify root/prefix dir to generate in                                       optional
     --prefix <prefix>              Specify root/prefix dir to generate in                                       optional

     -a                             Generate all (module + controller + service + repository + model             optional      default: false
     --all                          Generate all (module + controller + service + repository + model             optional      default: false
     
     -m                             Generate a module                                                            optional      default: false
     --module                       Generate a module                                                            optional      default: false
     
     -r                             Generate a repository for the model                                          optional      default: false
     --repo                         Generate a repository for the model                                          optional      default: false
     --repository                   Generate a repository for the model                                          optional      default: false
     
     -d                             Generate the model files                                                     optional      default: false
     --model                        Generate the model files                                                     optional      default: false
     --model-name <name>            Specify a custom class name for the model                                    optional
     --model-dir <dir>              Specify a subdirectory to put the model in (ie. 'models')                    optional
     
     -c                             Generate a controller for the model                                          optional      default: false
     --controller                   Generate a controller for the model                                          optional      default: false
     
     -s                             Generate a service for the model                                             optional      default: false
     --service                      Generate a service for the model                                             optional      default: false
     
     --crud                         Generates CRUD actions within the controller and service                     optional      default: false
     
     --auth                         CRUD actions will add authentication guards, requiring a logged in user      optional      default: false
     --auth-guard-class <name>      Name of a custom @(Guard<name>) class to use                                 optional
     --auth-guard-dir <dir>         The location of the custom Guard class file                                  optional
     


## Other Things to Note / Todo:
The generated files will all reference eachother correctly, but you will still need to add these references to your main AppModule, or wherever you need to use them. 
In other words: this package doesn't edit existing files.