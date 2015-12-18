'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    express = require('express'),
    livereload = require('express-livereload'),
    Watcher = require('../models/watcher'),
    Build   = require('../tasks/build');

class Server extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {

            let port = args[0];
            let watchDirectory = args[1];
            let app;
            let builder = new Build('development', null);
            builder
            .run([])
            .then((result) => {
                let directory = result.directory;
                console.log(chalk.green(`Starting server on port ${port} for directory ${directory}`));

                app = express();
                app.use(express.static(directory));

                livereload(app, {'watchDir': directory});

                let watcher = new Watcher(watchDirectory, () => {
                    new Build('development', directory)
                    .run()
                    .catch(e => console.log(chalk.red(e.stack)));
                });

                app.listen(port);
            }).catch(e => console.log(chalk.red(e.stack)));
        });
    }

}

module.exports = Server;
