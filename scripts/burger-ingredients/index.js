import axios, { BASE_URL } from '../../config/axios';
import { BURGER_INGREDIENTS_BASE_URL } from '../../src/components';

const burgerIngredients = [
    {
        label: 'Bread top',
        type: 'bread-top',
        price: 0.4,
        position: 1,
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Pickles',
        type: 'pickles',
        price: 0.3,
        position: 2,
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Bacon',
        type: 'bacon',
        price: 0.5,
        position: 3,
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Salad',
        type: 'salad',
        price: 0.5,
        position: 4,
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Cheese',
        type: 'cheese',
        price: 0.4,
        position: 5,
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Meat',
        type: 'meat',
        price: 1,
        position: 6, 
        createDate: new Date(),
        createUser: 'admin-user',
        updateDate: null,
        updateUser: null,
    },
    {
        label: 'Bread bottom',
        type: 'bread-bottom',
        price: 0.4,
        position: 7,
        createDate: new Date(),
        createUser: 'admin-user',
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