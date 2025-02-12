const Enums = require('../../../util/constants/enums');

class AddUserCommandHandler extends AddCommandHandler {
    constructor() {
        super(unitOfWork);
    }
    
    onHandle(command) {
        super.onHandle(Enums.entities.USER, command.newUser)
    }
}

module.exports = AddUserCommandHandler;