'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const stringUtil = require('ember-cli-string-utils');
const EmberRouterGenerator = require('ember-router-generator');
const isModuleUnificationProject = require('../module-unification').isModuleUnificationProject;

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
			__controller_name__() {
				if (options.pod) {
					return 'controller';
				}
				return options.locals.moduleName;
			},
			__controller__() {
                if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'controllers';
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
		updateRouter.call(this, 'add', options);
	},

	afterUninstall: function(options) {
		updateRouter.call(this, 'remove', options);
	},
};

function updateRouter(action, options) {
	let entity = options.entity;
	let actionColorMap = {
		add: 'green',
		remove: 'red',
	};
	let color = actionColorMap[action] || 'gray';

	if (this.shouldTouchRouter(entity.name, options)) {
		writeRoute(action, entity.name, options);

		this.ui.writeLine('updating router');
		this._writeStatusToUI(chalk[color], action + ' route', entity.name);
	}
}

function findRouter(options) {
	let routerPathParts = [options.project.root];
	let root = isModuleUnificationProject(options.project) ? 'src' : 'app';

	if (options.dummy && options.project.isEmberCLIAddon()) {
		routerPathParts = routerPathParts.concat(['tests', 'dummy', root, 'router.js']);
	} else {
		routerPathParts = routerPathParts.concat([root, 'router.js']);
	}

	return routerPathParts;
}

function writeRoute(action, name, options) {
	let routerPath = path.join.apply(null, findRouter(options));
	let source = fs.readFileSync(routerPath, 'utf-8');

	let routes = new EmberRouterGenerator(source);
	let newRoutes = routes[action](name, options);

	fs.writeFileSync(routerPath, newRoutes.code());
}
