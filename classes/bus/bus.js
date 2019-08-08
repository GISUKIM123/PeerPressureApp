class Bus {
    constructor(eventEmitter, unitOfWork, commandServiceLocater) {
        this.eventEmitter = eventEmitter;
        this.unitOfWork = unitOfWork;
        this.commandServiceLocater = commandServiceLocater;
    }
    
    send(commandString, command) {
        var preHandler = this.commandServiceLocater.getPreCommandHandler(command);
        var handler = commandServiceLocater.getCommandHanlder(command);
        var postHandler = commandServiceLocater.getPostCommandHanlder(command);

        this.registerOnEventEmitter(preHandler, handler, postHandler);
    }

    registerOnEventEmitter(preHandler, handler, postHandler) {
        this.eventEmitter.register(commandString, () => {
            preHandler.onHandle(); // 1

            process.nextTick(handler.onHandle()); // 2

            setImmediate((command) => { // 3
                postHandler.onHandle();
            });
        });

        this.eventEmitter.emit(commandString);
    }

    commit() {
        //TODO: save changes of work related to db. 
        this.unitOfWork.commit();
    }
}

module.exports = Bus;