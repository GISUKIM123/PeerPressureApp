const Enums = require('../../../util/constants/enums');

class DeleteUserCommandHandler extends DeleteCommandHandler {
    constructor() {
        super(unitOfWork);
    }

    onHandle(command) {
        super.onHandle(Enums.entities.USER, command.modelToBeDeleted);
    }
}

module.exports = DeleteUserCommandHandler;