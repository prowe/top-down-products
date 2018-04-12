
import React from 'react';
import {render, Simulate, wait} from 'react-testing-library';
import ViewProductPage from './ViewProductPage';

describe('View product page', () => {
    let product;
    let rendered;

    beforeEach(() => {
        product = {
            price: 12.34,
            name: 'Great Widget'
        };
        fetch.mockResponse(JSON.stringify(product));
        const match = {
            params: {
                id: 'abcd'
            }
        };
        rendered = render(<ViewProductPage match={match}/>);
    });

    it('should call the correct url', () => {
        expect(fetch.mock.calls[0][0]).toEqual('/products/abcd');
    });

    it('should display the price', () => {
        expect(rendered.getByLabelText('Price').textContent).toContain('12.34');
    });

    it('should display the name', () => {
        expect(rendered.getByLabelText('Name').textContent).toContain('Great Widget');
    });
});