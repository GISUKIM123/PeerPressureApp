class UpdateCommandHandler {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    onHandle(entityName, context) {
        this.unitOfWork.getRepository(entityName).update(context);
    }
}

module.exports = UpdateCommandHandler;