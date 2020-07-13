
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export {
    authReducer, burgerBuilderReducer, ordersReducer
} from './containers';