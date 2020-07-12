import { 
    BaseAdminModelBuilder, BaseAdminModel, CustomerModelBuilder,
    BurgerIngredientModel, BurgerIngredientModelBuilder
} from '../../../../api';

/**
 * Order model
 * 
 * Properties:
 *      - id
 *      - deliveryMethod
 *      - price
 *      - customer
 *      - ingredients
 * 
 * @see BaseAdminModel
 * @see Customer
 * @see BurgerIngredient
 */
class OrderModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.deliveryMethod = builder.deliveryMethod;
        this.price = builder.price;
        this.userId = builder.userId;
        this.customer = builder.customer;
        this.ingredients = builder.ingredients;
    }
}

/**
 * Order ingredient model
 */
class OrderBurgerIngredientModel extends BurgerIngredientModel {

    constructor(builder) {
        super(builder);

        this.amount = builder.amount;
    }
}

/**
 * Order model builder
 * 
 * @see BaseAdminModelBuilder
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

    get userId() {
        return this._userId;
    }

    setUserId = (userId) => {
        this._userId = userId;
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
                const count = ingredient.amount || ingredient.count;
                const bIngredient = ingredient.burgerIngredient || ingredient;

                if (count) {
                    const burgerIngredient = new OrderBurgerIngredientModelBuilder()
                        .setType(bIngredient.type)
                        .setLabel(bIngredient.label)
                        .setPrice(bIngredient.price)
                        .setAmount(count)
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

/**
 * Order ingredient model builder
 */
class OrderBurgerIngredientModelBuilder extends BurgerIngredientModelBuilder {

    get amount() {
        return this._amount;
    }

    setAmount = (amount) => {
        this._amount = amount;
        return this;
    }

    build = () => {
        return new OrderBurgerIngredientModel(this);
    }
}

export { 
    OrderModelBuilder, OrderModel, OrderBurgerIngredientModelBuilder, 
    OrderBurgerIngredientModel 
};