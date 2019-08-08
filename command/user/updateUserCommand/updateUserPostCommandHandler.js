const Enums = require('../../../util/constants/enums');

class UpdateUserPostCommandHandler extends UpdatePostCommandHandler {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    
    onHandle(command) {
        // unitOfWork.getRepository().add(command.newUser);

        // update other data along the way user created. 
    }
}

module.exports = UpdateUserPostCommandHandler;