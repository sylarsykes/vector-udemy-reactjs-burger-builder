// @see https://immutable-js.github.io/immutable-js/

import { ArrayModel } from 'objectmodel';
import { fromJS } from 'immutable';
import { 
    BaseAdminModel, DeliverersModel, DessertsModel, 
    DrinksModel, CustomersModel, BurgersModel, CustomBurgersModel
} from '../';

export const ORDERS_BASE_URL = 'orders';

/**
 * Available situations for one order
 */
const AvailableSituationsOrdersMap = fromJS({
    RECEIVED: 'received',
    IN_PROGRESS: 'inProgress',
    IN_TRANSIT: 'inTransit',
    DELIVERED: 'delivered',
    CANCELED: 'canceled' 
});
export const AvailableSituationsOrders = AvailableSituationsOrdersMap.toObject();

/**
 * Situations for one order
 */
export const SituationsOrders = [
    'received',
    'inProgress',
    'inTransit',
    'delivered',
    'canceled'
];

/**
 * Available delivery methods for one order
 */
const AvailableDeliveryMethodOrdersMap = fromJS({
    CHEAPEST: 'cheapest',
    FASTEST: 'fastest'
});

export const AvailableDeliveryMethodOrders = AvailableDeliveryMethodOrdersMap.toObject();

/**
 * Delivery methods for one order
 */
export const DeliveryMethodOrders = [
    'cheapest',
    'fastest'
];

/**
 * Orders model
 * 
 * Properties:
 *      -   situation
 *      -   deliveryMethod
 *      -   subtotalPrice
 *      -   deliveryFee
 *      -   totalPrice
 *      -   deliverer
 *      -   delivererId
 *      -   customer
 *      -   customerUserId
 *      -   desserts
 *      -   drinks
 *      -   burgers
 * 
 * @see BaseAdminModel
 * @see ArrayModel
 * @see DeliverersModel
 * @see CustomersModel
 * @see DessertsModel
 * @see DrinksModel
 * @see BurgersModel
 * 
 */
export class OrdersModel extends BaseAdminModel.extend({
    situation: SituationsOrders,
    deliveryMethod: DeliveryMethodOrders,
    subtotalPrice: Number,
    deliveryFee: [Number],
    totalPrice: Number,
    deliverer: DeliverersModel,
    delivererId: String,
    customer: CustomersModel,
    customerUserId: String,
    desserts: [ArrayModel(DessertsModel)],
    drinks: [ArrayModel(DrinksModel)],
    burgers: [ArrayModel(BurgersModel), ArrayModel(CustomBurgersModel)] 
}) {

}

/**
 * Build orders model
 *  
 * @param {object} properties
 *      Json object with properties
 *          -   situation
 *          -   deliveryMethod
 *          -   subtotalPrice
 *          -   deliveryFee
 *          -   totalPrice
 *          -   deliverer
 *          -   delivererId
 *          -   customer
 *          -   customerUserId
 *          -   desserts
 *          -   drinks
 *          -   burgers
 * 
 * @see BaseAdminModel.build
 */
OrdersModel.build = (properties) => {
    return new OrdersModel(properties);
};