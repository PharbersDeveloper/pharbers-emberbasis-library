/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable node/no-extraneous-require */
'use strict';

const fs = require('fs'),
	path = require('path'),
	chalk = require('chalk'),
	stringUtil = require('ember-cli-string-utils'),
	EmberRouterGenerator = require('ember-router-generator'),
	isModuleUnificationProject = require('../module-unification').isModuleUnificationProject

let pathOptions = "";

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
		pathOptions = options;

		return {
			__route_name__() {
				if (options.pod) {
					return 'route';
				}
				return options.locals.moduleName;
			},
			__controller_name__() {
				if (options.pod) {
					return 'controller';
				}
				return options.locals.moduleName;
			},
			__service_route_name__() {
				if (options.pod) {
					return 'service';
				}
				return options.locals.moduleName + '-route';
			},
			__service_controller_name__() {
				if (options.pod) {
					return 'service';
				}
				return options.locals.moduleName + '-controller';
			},
			__route__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'routes';
			},
			__controller__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName);
				}
				return 'controllers';
			},
			__service_route__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName + '-route');
				}
				return 'services';
			},
			__service_controller__() {
				if (options.pod) {
					return path.join(options.podPath, options.locals.moduleName + '-controller');
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

function appendBusinessRoute(name, options, pathOptions) {
	let routerPath = path.join.apply(null, findBusinessFile(name, options, pathOptions, 'routes')),
		source = fs.readFileSync(routerPath, 'utf-8'), newSource = '';

	newSource = source.replace('"service": "service",', `${name}_route: service(),\n\t${name}_controller: service(),`);
	fs.writeFileSync(routerPath, newSource);
}

function appendBusinessController(name, options, pathOptions) {
	let routerPath = path.join.apply(null, findBusinessFile(name, options, pathOptions, 'controllers')),
		source = fs.readFileSync(routerPath, 'utf-8'), newSource = '';

	newSource = source.replace('"service": "service",', `${name}_controller: service(),`);
	fs.writeFileSync(routerPath, newSource);
}

function updateRouter(action, options) {
	let entity = options.entity,
		actionColorMap = {
			add: 'green',
			remove: 'red'
		},
		color = actionColorMap[action] || 'gray';

	if (action !== 'remove') {
		appendBusinessRoute.call(this, entity.name, options, pathOptions);
		appendBusinessController.call(this, entity.name, options, pathOptions);
	}

	if (this.shouldTouchRouter(entity.name, options)) {
		writeRoute(action, entity.name, options);

		this.ui.writeLine('updating router');
		this._writeStatusToUI(chalk[color], action + ' route', entity.name);
	}
}

function findBusinessFile(name, options, pathOptions, type) {
	let routerPathParts = [options.project.root],
		root = isModuleUnificationProject(options.project) ? 'src' : 'app',
		moduleName = "";

	if (pathOptions.pod) {
		root += `/${path.join(pathOptions.podPath, pathOptions.locals.moduleName)}`;
		if (type === 'routes') {
			moduleName = 'route.js';
		} else {
			moduleName = 'controller.js';
		}
	} else {
		root += `/${type}/`;
		moduleName = name + ".js";
	}

	if (options.dummy && options.project.isEmberCLIAddon()) {
		routerPathParts = routerPathParts.concat(['tests', 'dummy', root, moduleName]);
	} else {
		routerPathParts = routerPathParts.concat([root, moduleName]);
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
