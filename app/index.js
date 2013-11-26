/*global require, module, __dirname, console*/
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var os     = require('os');


var CordovacliGenerator,
    getPlatformChoices,
    getPluginsChoices;
CordovacliGenerator = module.exports = function CordovacliGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovacliGenerator, yeoman.generators.Base);

CordovacliGenerator.prototype.askFor = function askFor() {
    var cb,
        prompts;
    cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    prompts = [{
        'name': 'appName',
        'message': 'What do you want to name your App?',
        'default': 'dude'
    },
    {
        type: 'checkbox',
        name: 'platforms',
        message: 'What platforms would you like to add support for?',
        choices: getPlatformChoices()
    },
    {
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins would you like to add support for?',
        choices: getPluginsChoices()
    }];

    this.prompt(prompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        this.platforms = '[\'' + this.platforms.toString().split(',').join('\', \'') + '\']';
        if (this.plugins && this.plugins.length > 0) {
            this.plugins = '[\'' + this.plugins.toString().split(',').join('\', \'') + '\']';
        } else {
            this.plugins = '[]';
        }



        cb();
    }.bind(this));
};

CordovacliGenerator.prototype.app = function app() {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

CordovacliGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('Gruntfile.js', 'Gruntfile.js');
};

getPlatformChoices = function () {
    var choices = [];

    choices.push({
        name: 'Android',
        value: 'android',
        checked: true
    });
    if (os.platform() === 'darwin') {
        choices.push({
            name: 'iOS',
            value: 'ios',
            checked: true
        });
    }
    choices.push({
        name: 'Blackberry 10',
        value: 'blackberry10',
        checked: true
    });
    if (os.platform() === 'win32') {
        choices.push({
            name: 'Windows Phone 8',
            value: 'wp8',
            checked: true
        });

        choices.push({
            name: 'Windows 8',
            value: 'windows8',
            checked: true
        });
    }
    choices.push({
        name: 'Firefox OS',
        value: 'firefoxos',
        checked: false
    });
    return choices;
};
getPluginsChoices = function () {
    var choices;

    choices = [{
        name: 'Device',
        value: 'device',
        checked: true
    },
    {
        name: 'Dialogs',
        value: 'dialogs',
        checked: false
    },
    {
        name: 'Battery Status',
        value: 'battery-status',
        checked: false
    },
    {
        name: 'Camera',
        value: 'camera',
        checked: false
    },
    {
        name: 'Console',
        value: 'console',
        checked: false
    },
    {
        name: 'Contacts',
        value: 'contacts',
        checked: false
    },
    {
        name: 'Device Motion',
        value: 'device-motion',
        checked: false
    },
    {
        name: 'Device Orientation',
        value: 'device-orientation',
        checked: false
    },
    {
        name: 'File',
        value: 'file-transfer',
        checked: false
    },
    {
        name: 'Geolocation',
        value: 'geolacation',
        checked: false
    },
    {
        name: 'Globalization',
        value: 'globalization',
        checked: false
    },
    {
        name: 'In App Browser',
        value: 'inappbrowser',
        checked: false
    },
    {
        name: 'Media',
        value: 'media',
        checked: false
    },
    {
        name: 'Media Capture',
        value: 'media-capture',
        checked: false
    },
    {
        name: 'Network Information',
        value: 'network-information',
        checked: false
    },
    {
        name: 'Splashscreen',
        value: 'splashscreen',
        checked: false
    },
    {
        name: 'Vibration',
        value: 'vibration',
        checked: false
    }];


    return choices;
};
