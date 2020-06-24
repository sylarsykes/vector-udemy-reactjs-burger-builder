class BaseModel {

    constructor(builder) {
        this.id = builder.id; 
    }
}

class BaseAdminModel extends BaseModel {

    constructor(builder) {
        super(builder);

        this.createDate = builder.createDate;
        this.createUser = builder.createUser;
        this.updateDate = builder.updateDate;
        this.updateUser = builder.updateUser;
    }
}

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

class BaseAdminModelBuilder extends BaseModelBuilder {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

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

export { BaseModelBuilder, BaseAdminModelBuilder, BaseModel, BaseAdminModel };