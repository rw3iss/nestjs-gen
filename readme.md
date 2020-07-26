## Install:

    npm install nestjs-gen


#### Generate a module / package contents / whatever:

    node ./node_modules/nestjs-gen/index.js gen <name> <options>


This will generate a folder <name> within a subdirectory according to options. See below for examples.


## Examples:

#### Generate Module with all Features (controller, service, repository, model):

    node ./node_modules/nestjs-gen/index.js gen example --all --prefix "src"

This will generate:

    ./modules/example/example.module.js
    ./modules/example/example.controller.js
    ./modules/example/example.service.js
    ./modules/example/example.repository.js
    ./modules/example/models/example.model.js
    (and corresponding CRUD interface within controller and service)

(Use --prefix to place files within the prefix directory, from the current folder)

#### Generate just Controller, Repository, and Test model (no module)

    node ./node_modules/nestjs-gen/index.js gen example --crud

This will generate:

    ./example/example.controller.js
    ./example/example.repository.js
    ./example/models/example.model.js
    (and corresponding CRUD interface within controller and service)


(If you want things in their own module, just specify `--module`)


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

     --no-model-dir         Don't put models in "models" subdirectory                             optional      default: false