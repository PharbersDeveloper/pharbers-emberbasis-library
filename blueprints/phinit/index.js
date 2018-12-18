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
		return {
			__adapter_name__() {
				if (options.pod) {
					return 'adapter';
				}
				return 'application'
			},
			__serializer_name__() {
                if (options.pod) {
					return 'serializer';
				}
				return 'application';
			},
			__adapter__() {
				if (options.pod) {
					return path.join(options.podPath, 'application');
				}
				return 'adapters';
			},
			__serializer__() {
				if (options.pod) {
					return path.join(options.podPath, 'application');
				}
				return 'serializers';
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
