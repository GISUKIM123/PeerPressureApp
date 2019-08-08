const APP_CONSTANTS = require('../../util/constants/constants');
const AddUserCommand = require('../../command/user/addUserCommand/addUserCommand');

class UserModelDataController {
    constructor(userMapper, bus, keyGenerator, queryService){
        this.userMapper = userMapper;
        this.bus = bus;
        this.keyGenerator = keyGenerator;
        this.queryService = queryService;
    }

    /** 
     * Get a user object by userId given.
     * @param {*string} id 
     */
    getById(id) {
        var users = this.queryService.getAll();
        return users.find( user => user.id == id );
    }

    /**
     * Get a full list of users.
     */
    getAll() {
        return this.queryService.getAll();
    }

    /**
     * Filter a list of users by a UserFilterModel
     * @param {UserFilterModel} userFilterModel 
     */
    filter(userFilterModel) {
        var filteredEntities = this.queryService.getWithQueryableArgs( this.mapToFilterArgs(userFilterModel) );
        filteredEntities.forEach( entity => {
            var model = new User();
            this.userMapper.mapToApiModel(model, model);
            return yield model;
        });
    }

    /**
     * Create a new user with UserModel given.
     * @param {UserModel} userModel 
     */
    insert(userModel) {
        var newEntity = new User();
        userModel.PKeyId = keyGenerator.generateKey();
        this.userMapper.mapToEntity(userModel, newEntity);

        this.bus.send( APP_CONSTANTS.ADD_USER_COMMAND, new AddUserCommand(newEntity) );

        this.userMapper.mapToApiModel(userModel, newEntity);
    }

    /**
     * Update a user with UserModel given.
     * @param {UserModel} userModel 
     */
    update(modelToUpdate) {
        var entity = this.getById(modelToUpdate.id);
        this.userMapper.mapToEntity(modelToUpdate, entity);

        this.bus.send( APP_CONSTANTS.UPDATE_USER_COMMAND, new UpdateUserCommand(entity) );
    }

    /**
     * Delete a user pamenentally by a UserModel given.
     * @param {UserModel} userModel 
     */
    delete(userModel) {
        var entityToDelete = this.getById(userModel.id);

        this.bus.send(APP_CONSTANTS.DELETE_USER_COMMAND, new DeleteUserCommand(entityToDelete) );
    }

    /**
     * Convert userFilterModel to UserModel.
     * @param {UserFilterModel} userFilterModel 
     */
    mapToFilterArgs(userFilterModel) {
        return new User.fromJson(userFilterModel);
    }
}

module.exports = UserModelDataController;