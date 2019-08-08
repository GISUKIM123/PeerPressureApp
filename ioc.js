import { asFunction } from 'awilix';
const APP_CONSTANT = require('./util/constants/constants');
const { createContainer, asClass, asFucntion, InjectionMode } = require('awilix');
const eventEmitter = require('./eventEmitter/eventEmitter');

const unitOfWork = require('./classes/unitOfWork/unitOfWork');
const repositoryFactory = require('./classes/Repository/repositoryFactory');
const keyGenerator = require('./classes/keyGenereator/keyGenerator');

// QueryService
const queryService = require('./classes/queryService/queryService');
// Repository
const userRepository = require('./classes/Repository/user/userRepository');

// bus
const bus = require('./classes/bus/bus');
const userBus = require('./classes/bus/user/userBus');

// Controllers
const userController = require('./controller/userController');

// ModelDataControllers
const userModelDataController = require('./controller/user/userModelDataController');

// Mappers
const userMapper = require('./mappers/user/userMapper');

// Command
const CommandServiceLocater = require('./command/commandServiceLocater/commandServiceLocater');
const addUserCommandHandler = require('./command/user/addUserCommand/addUserCommandHandler');
const addUserPostCommandHandler = require('./command/user/addUserCommand/addUserPostCommand');

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
    eventEmitter: asClass(eventEmitter),
    unitOfWork: asClass(unitOfWork),
    repositoryFactory: asClass(repositoryFactory),
    keyGenerator: asClass(keyGenerator),

    // QueryService
    queryService: asClass(queryService),
    // Repository
    userRepository: asClass(userRepository),

    // Bus
    bus: asClass(bus),
    userBus: asClass(userBus),
    // Controllers
    userController: asClass(userController),
    userModelDataController: asClass(userModelDataController),
    // Mappers
    userMapper: asClass(userMapper),

    // Command
    commandServiceLocater: asFunction(() => {
        var preCommandHandlers = {};
        var commandHandlers = {[APP_CONSTANT.ADD_USER_COMMAND]: addUserCommandHandler};
        var postCommandHandlers =  {[APP_CONSTANT.ADD_USER_COMMAND]: addUserPostCommandHandler};   

        return new CommandServiceLocater(preCommandHandlers   ,
                                         commandHandlers      ,
                                         postCommandHandlers  );
    }),
});

global.container = container;