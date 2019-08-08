class CommandServiceLocater {
    constructor(preCommandHandlers, commandHandlers, postCommandHandlers) {
        this.commandPreHandlers = preCommandHandlers;
        this.commandHandlers = commandHandlers;
        this.commandPostHandlers = postCommandHandlers;
    }

    getCommandPreHandler(command) {
        var className = command.constructor.name;
        
        return this.commandPreHandlers[className];
    }

    getCommandHanlder(command) {
        var className = command.constructor.name;

        return this.commandHandlers[className];
    }

    getCommandPostHandler(command) {
        var className = command.constructor.name;

        return this.commandPostHandlers[className];
    }
}

module.exports = CommandServiceLocater;