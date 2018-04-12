
import React from 'react';
import {render, Simulate, wait} from 'react-testing-library';
import ViewProductPage from './ViewProductPage';

describe('View product page', () => {
    let props;

    beforeEach(() => {
        props = {
            match: {
                params: {
                    id: 'abcd'
                }
            }
        };
    });

    describe('the response returns successfully', () => {
        let product;
        let rendered;

        beforeEach(() => {
            product = {
                price: 12.34,
                name: 'Great Widget'
            };
            fetch.mockResponse(JSON.stringify(product));
            rendered = render(<ViewProductPage {...props}/>);
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

    describe('the response returns a 404', () => {
        let rendered;

        beforeEach(() => {
            fetch.mockResponse('', {status: 404});
            rendered = render(<ViewProductPage {...props}/>);
        });

        it('should display a not found message', () => {
            expect(rendered.container.textContent).toContain('Product not found');
        });
    });
});