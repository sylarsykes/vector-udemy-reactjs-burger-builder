/**
 * User model
 * 
 * Properties:
 *      - userUID
 *      - email
 *      - password
 * 
 * @see BaseModel
 */
class UserModel {

    constructor(builder) {
        this.userUID = builder.userUID;
        this.email = builder.email;
        this.password = builder.password;
        this.returnSecureToken = builder.returnSecureToken;
    }
}

/**
 * User model builder
 * 
 * @see BaseModelBuilder
 */
class UserModelBuilder {

    get userUID() {
        return this._userUID;
    }

    setUserUID = (userUID) => {
        this._userUID = userUID;
        return this;
    }

    get email() {
        return this._email;
    }

    setEmail = (email) => {
        this._email = email;
        return this;
    }

    get password() {
        return this._password;
    }

    setPassword = (password) => {
        this._password = password;
        return this;
    }

    get returnSecureToken() {
        return this._returnSecureToken;
    }

    setReturnSecureToken = (returnSecureToken) => {
        this._returnSecureToken = returnSecureToken;
        return this;
    }

    build = () => {
        return new UserModel(this);
    }
}

export { UserModel, UserModelBuilder };