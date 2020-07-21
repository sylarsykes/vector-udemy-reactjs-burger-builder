import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LOGOUT_ROUTE  } from '../../../../../containers/routes';
import { NavigationItemsFC, NavigationItemFC } from '..';

configure({
    adapter: new Adapter()
});

describe('<NavigationItemsFC />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItemsFC />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItemFC)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItemFC)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItemFC link={LOGOUT_ROUTE}>Logout</NavigationItemFC>)).toEqual(true);
    });
});