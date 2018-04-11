
import React from 'react';
import {render, Simulate, wait} from 'react-testing-library';
import CreateProductPage from './CreateProductPage';

describe('Create product page', () => {
    describe('User enters a non-number into the price field', () => {
        let rendered;

        beforeEach(() => {
            rendered = render(<CreateProductPage/>);
            Simulate.change(rendered.getByLabelText('Price'), {target: {value: 'abc'}});
        });

        it('should display a validation error', () => {
            expect(rendered.getByTestId('validationErrors_price').textContent).toContain('Invalid price');
        });

        it('should disable the save button', () => {
            expect(rendered.getByText('Save').disabled).toEqual(true);
        });

        describe('user corrects the error', () => {
            beforeEach(() => {
                Simulate.change(rendered.getByLabelText('Price'), {target: {value: '12.25'}});
            });

            it('should not display a validation error', () => {
                expect(rendered.getByTestId('validationErrors_price').textContent).toEqual('');
            });
    
            it('should enable the save button', () => {
                expect(rendered.getByText('Save').disabled).toEqual(false);
            });
        });
    });

    describe('User enters valid data and hits save', () => {
        let rendered;
        let preventDefault;

        beforeEach(() => {
            rendered = render(<CreateProductPage/>);
            preventDefault = jest.fn();
            Simulate.change(rendered.getByLabelText('Price'), {target: {value: '12.34'}});
            Simulate.submit(rendered.container.querySelector('form'), {preventDefault});
        });

        it('should prevent the default submit', () => {
            expect(preventDefault.mock.calls).not.toHaveLength(0);
        });

        it('should send a request to the /products url', () => {
            expect(global.fetch.mock.calls[0][0]).toEqual('/products');
        });

        it('should submit as a post', () => {
            expect(global.fetch.mock.calls[0][1].method).toEqual('POST');
        });

        it('should submit the price in the JSON body', () => {
            const payload = JSON.parse(global.fetch.mock.calls[0][1].body);
            expect(payload.price).toBeCloseTo(12.34);
        });
    });
});