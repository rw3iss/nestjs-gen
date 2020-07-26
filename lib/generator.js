let fs = require('fs');
let ejs = require('ejs');

// generate
module.exports = (template, options, outFile) => {

    let templateFile = `${__dirname}/../templates/${template}.ejs`;

    console.log("Generating", outFile, templateFile);
    
    fs.readFile(templateFile, 'utf8', function(err, data) {
        if (err) throw err;

        var fn = ejs.compile(data);
        let str = fn(options);

        fs.writeFileSync(outFile, str);
    });

}