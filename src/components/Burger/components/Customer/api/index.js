import { BaseModelBuilder, BaseModel } from '../../../../';

/**
 * Address model
 */
class AddressModel extends BaseModel {

    constructor(builder) {
        super(builder);

        this.street = builder.street;
        this.zipCode = builder.zipCode;
        this.country = builder.country;
    }
}

/**
 * Customer model
 */
class CustomerModel extends BaseModel {

    constructor(builder) {
        super(builder);

        this.name = builder.name;
        this.surname = builder.surname;
        this.email = builder.email;
        this.address = builder.address;
    }
}

/**
 * Address model builder
 */
class AddressModelBuilder extends BaseModelBuilder {

    get street() {
        return this._street;
    }

    setStreet = (street) => {
        this._street = street;
        return this;
    }

    get zipCode() {
        return this._zipCode;
    }

    setZipCode = (zipCode) => {
        this._zipCode = zipCode;
        return this;
    }

    get country() {
        return this._country;
    }

    setCountry = (country) => {
        this._country = country;
        return this;
    }

    build = () => {
        return new AddressModel(this);
    }
}

/**
 * Customer model builder
 */
class CustomerModelBuilder extends BaseModelBuilder {

    get name() {
        return this._name;
    }

    setName = (name) => {
        this._name = name;
        return this;
    }

    get surname() {
        return this._surname;
    }

    setSurname = (surname) => {
        this._surname = surname;
        return this;
    }

    get email() {
        return this._email;
    }

    setEmail = (email) => {
        this._email = email;
        return this;
    }

    get address() {
        return this._address;
    }

    setAddress = (address) => {
        const addressBuilder = new AddressModelBuilder();
        const _address = addressBuilder
            .setStreet(address.street)
            .setZipCode(address.zipcode)
            .setCountry(address.country)
            .build();

        this._address = _address;
        return this;
    }

    build = () => {
        return new CustomerModel(this);
    }
}

export { 
    AddressModelBuilder, AddressModel, CustomerModelBuilder, 
    CustomerModel 
};