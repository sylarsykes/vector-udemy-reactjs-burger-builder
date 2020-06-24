import { BaseAdminModelBuilder, BaseAdminModel } from '../../../';

const BURGER_INGREDIENTS_BASE_URL = 'burger-ingredients.json';

class BurgerIngredientModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.label = builder.label;
        this.type = builder.type;
        this.price = builder.price;
        this.position = builder.position;
    }
}

class BurgerIngredientModelBuilder extends BaseAdminModelBuilder {
    
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get type() {
        return this._type;
    }

    setType = (type) => {
        this._type = type;
        return this;
    }

    get label() {
        return this._label;
    }

    setLabel = (label) => {
        this._label = label;
        return this; 
    }

    get price() {
        return this._price;
    }

    setPrice = (price) => {
        this._price = price;
        return this;
    }

    get position() {
        return this._position;
    }

    setPosition = (position) => {
        this._position = position;
        return this; 
    }

    build = () => {
        return new BurgerIngredientModel(this);
    }

}

export default BurgerIngredientModel;
export { BURGER_INGREDIENTS_BASE_URL, BurgerIngredientModelBuilder };