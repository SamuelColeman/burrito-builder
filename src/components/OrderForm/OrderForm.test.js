import React from 'react';
import { shallow } from 'enzyme';
import { OrderForm, mapStateToProps, mapDispatchToProps } from './OrderForm';
import { setOrders } from '../../actions';
import { postOrders } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('OrderForm', () => {
	let wrapper;
	let mockIngredients = ['beans', 'steak'];
	let mockOrders = [{id: 20, name: 'Sam', ingredients: ['Beans']}];

	postOrders.mockImplementation(() => {
        return Promise.resolve(mockOrders);
      });

	beforeEach(() => {
    wrapper = shallow(<OrderForm ingredients={mockIngredients}/>)
 	});

  it('should match snapshot with correct data passing through', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update local state when handleNameChange is invoked', () => {
  	const mockEvent = {target: {name: 'name', value: 'Sam'}};
  	wrapper.instance().handleNameChange(mockEvent);
  	expect(wrapper.state('name')).toEqual('Sam');
  });

  it('should update local state when handleIngredientChange is invoke', () => {
  	const mockEvent = {preventDefault: jest.fn(), target: {name: 'Beans'}};
  	wrapper.instance().handleIngredientChange(mockEvent);
  	expect(wrapper.state('ingredients')).toEqual(['Beans']);
  });

  it('should update local state when no ingredients have been selected and handleSubmit is invoked', () => {
  	const mockEvent = {preventDefault: jest.fn()};
  	wrapper.instance().handleSubmit(mockEvent);
  	expect(wrapper.state('error')).toEqual('Burritos need at least one ingredient!');
  })

  it('should invoke clearInputs, postOrders, and update local state when handleSubmit is invoked', async () => {
  	wrapper.instance().clearInputs = jest.fn();
  	const mockIngredientEvent = {preventDefault: jest.fn(), target: {name: 'Beans'}};
  	wrapper.instance().handleIngredientChange(mockIngredientEvent);
  	const mockNameEvent = {target: {name: 'name', value: 'Sam'}};
  	wrapper.instance().handleNameChange(mockNameEvent);
  	wrapper.instance().handleSubmit(mockIngredientEvent);
  	expect(wrapper.instance().clearInputs).toHaveBeenCalled();
  	expect(wrapper.state('ingredients')).toEqual(['Beans']);
  	await expect(postOrders).toHaveBeenCalledWith( wrapper.state('name'), wrapper.state('ingredients') );
  });

  it('should invoke handleIngredientChange when button is clicked', () => {
  	wrapper.instance()
  	const mockEvent = {preventDefault: jest.fn(), target: {name: 'Beans'}};
  	wrapper.instance().handleIngredientChange = jest.fn();
  	wrapper.instance().forceUpdate();
  	wrapper.find('button').at(0).simulate('click', mockEvent);
  	expect(wrapper.instance().handleIngredientChange).toHaveBeenCalledWith(mockEvent);
  });

  it('map state to props gives the orders in state', () => {
		const mockState = { orders: [{ 
			id: 20,
			name: 'Sam',
			ingredients: ['beans', 'steak']
		}]};

		const expected = {
			orders: mockState.orders
		};

		const mappedState = mapStateToProps(mockState);

		expect(mappedState).toEqual(expected);
	});
});