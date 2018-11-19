/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable node/no-extraneous-require */
'use strict';

const fs = require('fs'),
	path = require('path'),
	chalk = require('chalk'),
	stringUtil = require('ember-cli-string-utils'),
	EmberRouterGenerator = require('ember-router-generator'),
	isModuleUnificationProject = require('../module-unification').isModuleUnificationProject;

module.exports = {
	description: 'Generates Pharbers Init Adapter & Serializer',

	availableOptions: [{
		name: 'path',
		type: String,
		default: ''
	}, {
		name: 'skip-router',
		type: Boolean,
		default: false
	}, {
		name: 'reset-namespace',
		type: Boolean
	}
	],

	fileMapTokens: function (options) {
		// let temp = this.ui;
		// temp.writeLine(isModuleUnificationProject(this.project));
		return {
			__route_name__() {
				if (options.pod) {
					return 'route';
				}
				return options.locals.moduleName;
			},
			__service_name__() {
				if (options.pod) {
					return 'service';
				}
				return options.locals.moduleName;
			},
			__route__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'routes';
			},
			__service__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'services';
			},
			__templatepath__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'templates';
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
			}
		};
	},

	locals: function (options) {
		let moduleName = options.entity.name;

		if (options.resetNamespace) {
			moduleName = moduleName.split('/')
				.pop();
		}

		return {
			moduleName: stringUtil.dasherize(moduleName)
		};
	},

	shouldEntityTouchRouter: function (name) {
		let isIndex = name === 'index',
			isBasic = name === 'basic',
			isApplication = name === 'application';

		return !isBasic && !isIndex && !isApplication;
	},

	shouldTouchRouter: function (name, options) {
		let entityTouchesRouter = this.shouldEntityTouchRouter(name),
			isDummy = !!options.dummy,
			isAddon = !!options.project.isEmberCLIAddon(),
			isAddonDummyOrApp = isDummy === isAddon;

		return (
			entityTouchesRouter &&
			isAddonDummyOrApp &&
			!options.dryRun &&
			!options.inRepoAddon &&
			!options.skipRouter
		);
	},

	afterInstall: function (options) {
		updateRouter.call(this, 'add', options);
	},

	afterUninstall: function (options) {
		updateRouter.call(this, 'remove', options);
	}
};

function appendBusinessRoute(action, name, options) {
	this.ui.writeLine('12345655');
	let routerPath = path.join.apply(null, findBusinessRoute(name, options)),
		source = fs.readFileSync(routerPath, 'utf-8'),
		routes = new EmberRouterGenerator(source),
		newRoutes = routes[action](name, options);

	this.ui.writeLine(routerPath);
	this.ui.writeLine(source);
	this.ui.writeLine(routes);
	this.ui.writeLine(newRoutes);
	// fs.writeFileSync(routerPath, newRoutes.code());
}

function updateRouter(action, options) {
	let entity = options.entity,
		actionColorMap = {
			add: 'green',
			remove: 'red'
		},
		color = actionColorMap[action] || 'gray';

	if (this.shouldTouchRouter(entity.name, options)) {
		writeRoute(action, entity.name, options);
		if (action !== 'remove') {
			appendBusinessRoute.call(this, action, entity.name, options);
		}
		this.ui.writeLine('updating router');
		this._writeStatusToUI(chalk[color], action + ' route', entity.name);
	}
}

function findBusinessRoute(name, options) {
	let routerPathParts = [options.project.root],
		root = isModuleUnificationProject(options.project) ? 'src' : 'app/routes';

	// if (options.pod) {
	// 	root += options.podPath + '/' + name;
	// 	// return path.join(options.podPath, options.locals.moduleName);
	// } else {
	// 	root += '/' + name;
	// }

	if (options.dummy && options.project.isEmberCLIAddon()) {
		routerPathParts = routerPathParts.concat(['tests', 'dummy', root, name + '.js']);
	} else {
		routerPathParts = routerPathParts.concat([root, name + '.js']);
	}

	return routerPathParts;
}

function findRouter(options) {
	let routerPathParts = [options.project.root],
		root = isModuleUnificationProject(options.project) ? 'src' : 'app';

	if (options.dummy && options.project.isEmberCLIAddon()) {
		routerPathParts = routerPathParts.concat(['tests', 'dummy', root, 'router.js']);
	} else {
		routerPathParts = routerPathParts.concat([root, 'router.js']);
	}

	return routerPathParts;
}

function writeRoute(action, name, options) {
	let routerPath = path.join.apply(null, findRouter(options)),
		source = fs.readFileSync(routerPath, 'utf-8'),
		routes = new EmberRouterGenerator(source),
		newRoutes = routes[action](name, options);

	fs.writeFileSync(routerPath, newRoutes.code());
}
