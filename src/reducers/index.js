
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export {
    burgerBuilderReducer, ordersReducer
} from './containers';