## What This Is:

This is a package to generate automatic files for NestJS, namely a combination of a module, controller, service, repository, and model files, for any particular model, feature set, etc.

## Install:

    npm install nestjs-gen


## How to Use:

#### Generate a module / package contents / whatever:

    node ./node_modules/nestjs-gen/index.js gen <name> <options>


This will generate a folder \<name> within the current directory according to the options. See below for examples.

(Tip: Use --prefix to place files within a prefix directory, from the current folder)


## Examples:

#### Generate a Module with all features (module, controller, service, repository, and model):

    node ./node_modules/nestjs-gen/index.js gen example --all

This will generate:

    ./modules/example/example.module.js         (ExampleModule)
    ./modules/example/example.controller.js     (ExampleController)
    ./modules/example/example.service.js        (ExampleService)
    ./modules/example/example.repository.js     (ExampleRepository)
    ./modules/example/models/example.model.js   (ExampleModel)
    (and corresponding CRUD interface within controller and service)

#### Generate just Controller, Repository, and Test model (no module)

    node ./node_modules/nestjs-gen/index.js gen example --crud

This will generate:

    ./example/example.controller.js             (ExampleController)
    ./example/example.repository.js             (ExampleRepository)
    ./example/models/example.model.js           (ExampleModel)
    (and corresponding CRUD interface within controller and service)

(Tip: If you want the files generated in their own module, just specify `--module`)


## Options:

     --p <prefix>           Specify root/prefix dir to generate in                                optional
     --prefix <prefix>      Specify root/prefix dir to generate in                                optional
     
     --a                    Generate all (module + controller + service + repository + model      optional      default: false
     --all                  Generate all (module + controller + service + repository + model      optional      default: false
     
     --m                    Generate a module                                                     optional      default: false
     --module               Generate a module                                                     optional      default: false
      
     --r                    Generate a repository for the model                                   optional      default: false
     --repo                 Generate a repository for the model                                   optional      default: false
     --repository           Generate a repository for the model                                   optional      default: false
     
     --md                   Generate the model files                                              optional      default: false
     --model                Generate the model files                                              optional      default: false
     --model-name           Specify the exact name for the model class                            optional      default: false
     
     --c                    Generate a controller for the model                                   optional      default: false
     --controller           Generate a controller for the model                                   optional      default: false
     
     --s                    Generate a service for the model                                      optional      default: false
     --service              Generate a service for the model                                      optional      default: false
     
     --crud                 Generates CRUD actions within the controller and service              optional      default: false
     
     --auth                 CRUD actions will require a logged in user                            optional      default: false
     --auth-guard-class     The name of the Guard class                                           optional      default: false
     --auth-guard-location  The location of the Guard class                                       optional      default: false


## Other Things to Note / Todo:
The generated files will all reference eachother correctly, but you will still need to add these references to your main AppModule, or wherever you need to use them. In other words: this package doesn't "edit" existing files.