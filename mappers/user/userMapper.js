class UserMapper {
    constructor() {

    }

    mapToEntity(model, entity) {
        entity.firstName = model.firstName;
        entity.lastName = model.lastName;
        entity.email = model.email;
    }

    mapToApiModel(model, entity) {
        model.firstName = entity.firstName;
        model.lastName = entity.lastName;
        model.email = entity.email;
    }
}

module.exports = UserMapper;