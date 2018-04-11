import React, { Component } from 'react';

class CreateProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationErrors: {},
            product: {
                price: null
            }
        }
    }

    onPriceChange = (event) => {
        const price = parseFloat(event.target.value);
        if (isNaN(price)) {
            this.setState(({validationErrors}) => ({
                validationErrors: {
                    ...validationErrors,
                    price: 'Invalid price'
                }
            }));
            return;
        }
        this.setState(({product}) => ({
            product: {
                ...product,
                price
            }
        }))
    }

    onSubmit = () => {
        fetch('/products', {
            method: 'POST',
            body: JSON.stringify(this.state.product)
        });
    }

    render() {
        const {validationErrors} = this.state;
        const isSubmitDisabled = Object.keys(validationErrors).length > 0;
        return <form>
            <label>Price
                <input onChange={this.onPriceChange}/>
                <div data-testid='validationErrors_price'>{this.state.validationErrors.price}</div>
            </label>

            <button disabled={isSubmitDisabled} onClick={this.onSubmit}>Save</button>
        </form>;
    }
}

export default CreateProductPage;