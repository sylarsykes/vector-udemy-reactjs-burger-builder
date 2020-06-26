import { 
    BaseAdminModelBuilder, BaseAdminModel, CustomerModelBuilder,
    BurgerIngredientModelBuilder
} from '../../../../';

const ORDER_SUMMARY_BASE_URL = 'orders';

/**
 * Order model
 */
class OrderModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.deliveryMethod = builder.deliveryMethod;
        this.price = builder.price;
        this.customer = builder.customer;
        this.ingredients = builder.ingredients;
    }
}

/**
 * Order model builder
 */
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

    get ingredients() {
        return this._ingredients;
    }

    setIngredients = (ingredients) => {
        const burgerIngredients = [];

        if (ingredients && ingredients.length) {
            ingredients.forEach(ingredient => {
                if (ingredient.count) {
                    const burgerIngredient = new BurgerIngredientModelBuilder()
                        .setType(ingredient.burgerIngredient.type)
                        .setLabel(ingredient.burgerIngredient.label)
                        .setPrice(ingredient.burgerIngredient.price)
                        .build();

                    burgerIngredients.push(burgerIngredient);
                }
            });
        }

        this._ingredients = burgerIngredients;
        return this;
    }

    build = () => {
        return new OrderModel(this);
    }
}

export { ORDER_SUMMARY_BASE_URL, OrderModelBuilder, OrderModel };