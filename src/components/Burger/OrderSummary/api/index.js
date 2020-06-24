import { 
    BaseAdminModelBuilder, BaseAdminModel, CustomerModelBuilder 
} from '../../../';

const ORDER_SUMMARY_BASE_URL = '/orders.json';

class OrderModelBuilder extends BaseAdminModelBuilder {

    get deliveryMethod() {
        return this._deliveryMethod;
    }

    setDeliveryMethod = (deliveryMethod) => {
        this._deliveryMethod = deliveryMethod;
        return this;
    }

    get price() {
        return this._price;
    }

    setPrice = (price) => {
        this._price = price;
        return this;
    }

    get customer() {
        return this._customer;
    }

    setCustomer = (customer) => {
        const customerBuilder = new CustomerModelBuilder();
        const _customer = customerBuilder
            .setName(customer.name)
            .setSurname(customer.surname)
            .setEmail(customer.email)
            .setAddress(customer.address)
            .build();
        
            this._customer = _customer;
            return this;
    }

    build = () => {
        return new OrderModel(this);
    }

}

class OrderModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.deliveryMethod = builder.deliveryMethod;
        this.price = builder.price;
        this.customer = builder.customer;
    }
}

export { ORDER_SUMMARY_BASE_URL, OrderModelBuilder, OrderModel };