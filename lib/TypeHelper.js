class TypeHelper {

    // Todo...
    BASE_TYPES = ['string', 'number', 'Date', 'boolean'];

    static parseModelProps(str) {
        let props = {};
        let parts = str.match(/[(\w+):(\w+)]*/g);

        parts.filter(p => p.length).forEach(p => {
            if (p.indexOf(':') < 1) {
                throw "Invalid model property: " + p + "\nUse format 'propName:propType'";
            }
            let pp = p.split(':');
            if (pp.length != 2) {   
                throw "Invalid format for model property: " + p;
            }
            if (props[pp[0]]) {
                throw "Duplicate model property name: " + pp[0];    
            }
            props[pp[0]] = pp[1];
        });

        return props;
    }

}

module.exports = TypeHelper;