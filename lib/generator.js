const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// generate
module.exports = (template, options, outFile) => {

    let templateFile = path.resolve(`${__dirname}/../templates/${template}.ejs`);

    console.log("Generating", template, '\tto:', outFile);//, '\uusing:', templateFile);
    
    fs.readFile(templateFile, 'utf8', function(err, data) {
        if (err) throw err;

        var fn = ejs.compile(data);
        let str = fn(options);

        fs.writeFileSync(outFile, str);
    });

}