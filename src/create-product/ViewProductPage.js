import React, { Component } from 'react';

class ViewProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            fetchStatus: null 
        }
    }

    async componentDidMount() {
        const result = await fetch(`/products/${this.props.match.params.id}`);
        const fetchStatus = result.status;
        if (result.ok) {
            const product = await result.json();
            this.setState({product, fetchStatus});
        } else {
            const product = null;
            this.setState({product, fetchStatus});
        }
    }

    render() {
        const {product, fetchStatus} = this.state;
        if (fetchStatus === 404) {
            return <main>Product not found</main>;
        }
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