/**
 * Base model
 * 
 * Properties:
 *      - id
 */
class BaseModel {

    constructor(builder) {
        this.id = builder.id; 
    }
}

/**
 * BaseAdmin model
 * 
 * Properties:
 *      - id
 *      - createDate
 *      - createUser
 *      - updateDate
 *      - updateUser
 */
class BaseAdminModel extends BaseModel {

    constructor(builder) {
        super(builder);

        this.createDate = builder.createDate;
        this.createUser = builder.createUser;
        this.updateDate = builder.updateDate;
        this.updateUser = builder.updateUser;
    }
}

/**
 * BaseModelCollection
 * 
 * Properties:
 *      - results
 */
class BaseModelCollection extends Array {

    constructor() {
        super();

        this.results = [];
    }
}

/**
 * BaseModel builder
 */
class BaseModelBuilder {

    get id() {
        return this._id;
    }

    setId = (id) => {
        this._id = id;
        return this;
    }

    build = () => {
        return new BaseModel(this);
    }
}

/**
 * BaseAdminModel builder
 */
class BaseAdminModelBuilder extends BaseModelBuilder {

    get createDate() {
        return this._createDate;
    }

    setCreateDate = (createDate) => {
        this._createDate = createDate;
        return this;
    }

    get createUser() {
        return this._createUser;
    }

    setCreateUser = (createUser) => {
        this._createUser = createUser;
        return this;
    }

    get updateDate() {
        return this._updateDate;
    }

    setUpdateDate = (updateDate) => {
        this._updateDate = updateDate;
        return this;
    }

    get updateUser() {
        return this._updateUser;
    }

    setUpdateUser = (updateUser) => {
        this._updateUser = updateUser;
        return this;
    }

    build = () => {
        return new BaseAdminModel(this);
    }
}

export { 
    BaseModelBuilder, BaseAdminModelBuilder, BaseModel, 
    BaseAdminModel, BaseModelCollection 
};