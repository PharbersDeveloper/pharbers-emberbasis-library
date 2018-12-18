'use strict';

const path = require('path');
const stringUtil = require('ember-cli-string-utils');

module.exports = {
	description: 'Generates Pharbers Init Adapter & Serializer',

	availableOptions: [{
			name: 'path',
			type: String,
			default: '',
		},{
			name: 'skip-router',
			type: Boolean,
			default: false,
		},{
			name: 'reset-namespace',
			type: Boolean,
		}
	],

	fileMapTokens: function(options) {
		// let temp = this.ui;
		// temp.writeLine(isModuleUnificationProject(this.project));
		return {
			__component_name__() {
				if (options.pod) {
					return 'component';
				}
				return options.locals.moduleName;
			},
			__component__() {
                if (options.pod) {
					return path.join(options.podPath, 'components' , options.locals.moduleName);
				}
				return 'components';
			},
			__templatepath__() {
				if (options.pod) {
					return path.join(options.podPath, 'components' , options.locals.moduleName);
				}
				return path.join('components', 'templates');
			},
			__templatename__() {
				if (options.pod) {
					return 'template';
				}
				return options.locals.moduleName;
            },
			__root__() {
				if (options.inRepoAddon) {
					return path.join('lib', options.inRepoAddon, 'addon');
				}

				if (options.inDummy) {
					return path.join('tests', 'dummy', 'app');
				}

				if (options.inAddon) {
					return 'addon';
				}

				return 'app';
			},
		};
	},

	locals: function(options) {
		let moduleName = options.entity.name;

		if (options.resetNamespace) {
			moduleName = moduleName.split('/')
				.pop();
		}

		return {
			moduleName: stringUtil.dasherize(moduleName),
		};
	},

	shouldEntityTouchRouter: function(name) {
		let isIndex = name === 'index';
		let isBasic = name === 'basic';
		let isApplication = name === 'application';

		return !isBasic && !isIndex && !isApplication;
	},

	shouldTouchRouter: function(name, options) {
		let entityTouchesRouter = this.shouldEntityTouchRouter(name);
		let isDummy = !!options.dummy;
		let isAddon = !!options.project.isEmberCLIAddon();
		let isAddonDummyOrApp = isDummy === isAddon;

		return (
			entityTouchesRouter &&
			isAddonDummyOrApp &&
			!options.dryRun &&
			!options.inRepoAddon &&
			!options.skipRouter
		);
	},

	afterInstall: function(options) {
	},

	afterUninstall: function(options) {
	},
};
