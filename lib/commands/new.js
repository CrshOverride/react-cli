'use strict';

let Command             = require('../models/command'),
    chalk               = require('chalk'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    CreateDirectory     = require('../tasks/create-directory'),
    GitInit             = require('../tasks/git'),
    NpmInstall          = require('../tasks/npm'),
    rsvp                = require('rsvp');

class New extends Command {
    run(options, args) {
        let directoryCreator = new CreateDirectory()
        let installer = new InstallBlueprint();
        let gitInit = new GitInit();
        let npmInstall = new NpmInstall();

        let appname = options[0];

        directoryCreator
        .run([appname])
        .then(() => {
            return installer.run(['app', appname]);
        })
        .then(() => {
            return gitInit.run([appname]);
        })
        .then(() => {
            return npmInstall.run([appname]);
        });
    }
}

New.nam = 'new';
New.description = `Creates a new directory and calls ${chalk.green('react init')} in it.`;
New.aliases = ['n'];
New.works = 'outsideProject';
New.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];

module.exports = New;
