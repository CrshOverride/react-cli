'use strict'

let Task    = require('../models/task'),
    Builder = require('../models/builder'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk');

class Build extends Task {
    constructor(environment, outputPath) {
        super();
        this.environment = environment;
        this.outputPath = outputPath;
    }

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let builder = new Builder(this.environment, this.outputPath);
            builder.build();
            resolve();
        });
    }

}

module.exports = Build;
