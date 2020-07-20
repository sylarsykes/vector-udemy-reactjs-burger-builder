import { BaseAdminModelBuilder, BaseAdminModel } from '../../../../api';

/**
 * BurgerIngredient model
 * 
 * Properties:
 *      - id
 *      - label
 *      - type
 *      - price
 *      - position
 * 
 * @see BaseAdminModel
 */
class BurgerIngredientModel extends BaseAdminModel {

    constructor(builder) {
        super(builder);

        this.label = builder.label;
        this.type = builder.type;
        this.price = builder.price;
        this.position = builder.position;
    }
}

/**
 * BurgerIngredient model builder
 * 
 * @see BaseAdminModelBuilder
 */
class BurgerIngredientModelBuilder extends BaseAdminModelBuilder {
    
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

export { BurgerIngredientModel, BurgerIngredientModelBuilder };