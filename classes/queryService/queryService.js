class QueryService {
    constructor(entityContext) {
        this.entityContext = entityContext;
    }

    getAll() {
        return this.getQueryableData();
    }

    getQueryableData() {
        return this.entityContext.getCollection().asQueryable();
    }

    getWithQueryableArgs(args) {
        return this.getQueryableData().filter(args);
    }

}

module.exports = QueryService;