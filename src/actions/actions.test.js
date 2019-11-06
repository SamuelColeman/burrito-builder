import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_ORDERS', () => {
    const orders = [{
			id: 20,
			name: 'Sam',
			ingredients: ['beans', 'steak', 'carnitas']
		}];
    const expectedAction = {
    	type: 'SET_ORDERS',
    	orders: [{
			id: 20,
			name: 'Sam',
			ingredients: ['beans', 'steak', 'carnitas']
		}]
    }

    const result = actions.setOrders(orders);

    expect(result).toEqual(expectedAction);
  });
});