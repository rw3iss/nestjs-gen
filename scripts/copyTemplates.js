#!/usr/bin/env node

const prog = require('caporal');
const fs = require('fs');
const path = require('path');
 

/* Copies all templates in ../templates/* to the specified directory */

prog
    .version('1.0.0')

    .option('--dir <dir>', 'The location of the template files to use')
    .option('-f', 'Force override of existing files')

    .action((args, o, logger) => {
        let originDir = path.resolve(__dirname, "../templates");
        let destDir = path.resolve(o.dir ? o.dir : './templates');

        fs.mkdirSync(destDir, { recursive: true });

        fs.readdir(originDir, (err, files) => {
            files.forEach(file => {
                let origFile = path.resolve(originDir, file);
                let destFile = path.resolve(destDir, file);

                if (fs.existsSync(destFile) && !o.f) {
                    console.log("Skipping existing file (use -f to override):", destFile);
                    return
                }

                console.log("Copying:", origFile, "->", destFile);
                fs.copyFileSync(origFile, destFile);
            });
        });
    });


prog.parse(process.argv);