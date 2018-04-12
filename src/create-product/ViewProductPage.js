import React, { Component } from 'react';

class ViewProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    async componentDidMount() {
        const result = await fetch(`/products/${this.props.match.params.id}`);
        const product = await result.json();
        this.setState({product});
    }

    render() {
        const product = this.state.product;
        if (!product) {
            return null;
        }

        return (
            <main>
                <label>Name:
                    <div>{product.name}</div>
                </label>

                <label>Price:
                    <div>{product.price}</div>
                </label>
            </main>
        );
    }
}

export default ViewProductPage;