import { 
    BaseAdminModelBuilder, BaseAdminModel, BurgerIngredientModelBuilder
} from '../../';

const BURGER_BASE_URL = 'burgers';

/**
 * Burger model
 */
class BurgerModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.name = builder.name;
        this.price = builder.price;
        this.ingredients = builder.ingredients;
    }
}

/**
 * Burger model builder
 */
class BurgerModelBuilder extends BaseAdminModelBuilder {

    get name() {
        return this._name;
    }

    name = (name) => {
        this._name = name;
        return this;
    }

    get price() {
        return this._price;
    }

    price = (price) => {
        this._price = price;
        return this;
    }

    get ingredients() {
        return this._ingredients;
    }

    ingredients = (ingredients) => {
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
        return new BurgerModel(this);
    }

}


export { 
    BURGER_BASE_URL,  BurgerModel, BurgerModelBuilder 
};