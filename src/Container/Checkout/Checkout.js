import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../Component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients:null,
        totalPrice: 0
    }

    //Mise à jour des ingredients et prix pour affichage en page de checkout
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'Price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            } 
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    //Gestion du bouton annulation
    CheckoutAnnulationHandler = () => {
        this.props.history.goBack();
    }

    //Gestion du bouton continuez
    CheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutAnnulation={this.CheckoutAnnulationHandler}
                    onCheckoutContinue={this.CheckoutContinueHandler}
                    />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;