import axios from '../../../config/axios';
import { createDate, createUser } from '../utils';
import { BURGER_INGREDIENTS_BASE_URL } from '../../../src/api/BurgerIngredients';

const burgerIngredients = [
    {
        label: 'Bread top',
        type: 'bread-top',
        price: 0.4,
        position: 1,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Pickles',
        type: 'pickles',
        price: 0.3,
        position: 2,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Bacon',
        type: 'bacon',
        price: 0.5,
        position: 3,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Salad',
        type: 'salad',
        price: 0.5,
        position: 4,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Cheese',
        type: 'cheese',
        price: 0.4,
        position: 5,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Meat',
        type: 'meat',
        price: 1,
        position: 6, 
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Bread bottom',
        type: 'bread-bottom',
        price: 0.4,
        position: 7,
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
    }
];

burgerIngredients.forEach((ingredient) => {
    axios.post(BURGER_INGREDIENTS_BASE_URL, ingredient)
        .then(response => {
            
        })
        .catch(error => {
            
        });
});