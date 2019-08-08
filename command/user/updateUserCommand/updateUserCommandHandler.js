const Enums = require('../../../util/constants/enums');

class UpdateUserCommandHandler extends UpdateCommandHandler {
    constructor() {
        super(unitOfWork);
    }
    
    onHandle(command) {
        super.onHandle(Enums.entities.USER, command.modelToUpdate);
    }
}

module.exports = UpdateUserCommandHandler;