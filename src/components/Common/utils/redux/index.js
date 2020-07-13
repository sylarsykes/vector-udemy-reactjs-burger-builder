import { bindActionCreators } from 'redux';
import { 
    useSelector, useDispatch, shallowEqual 
} from 'react-redux';
import { useMemo } from 'react';

const useActions = (actions, deps) => {
    const dispatch = useDispatch();

    return useMemo(() => {
            if (Array.isArray(actions)) {
                return actions.map(a => bindActionCreators(a, dispatch))
            }
            return bindActionCreators(actions, dispatch);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps ? [ dispatch, ...deps ] : [ dispatch ]
    );
}

const useShallowEqualSelector = (selector) => useSelector(selector, shallowEqual);

export { useActions, useShallowEqualSelector };