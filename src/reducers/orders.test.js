import { orders } from '../reducers/orders';

describe('orders', () => {
	it('should return the initial state', () => {
		const expected = [];

		const result = orders([], {});

		expect(result).toEqual(expected);
	});

	it('should return the state', () => {
		const expected = [{
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
    };

		const result = orders([{
				id: 20,
				name: 'Sam',
				ingredients: ['beans', 'steak', 'carnitas']
			}], expectedAction);

		expect(result).toEqual(expected);
	});
});