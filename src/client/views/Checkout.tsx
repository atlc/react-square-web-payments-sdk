import * as React from 'react';
import { useState, useEffect } from 'react';
import LocalStorageUtils from '../services/localStorage'
import * as ReactSquareWeb from 'react-square-web-payments-sdk';

const MyPaymentForm = () => {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        LocalStorageUtils.addToCart({ id: 5, quantity: 2, price: 3.5 });
        LocalStorageUtils.addToCart({ id: 4, quantity: 2, price: 1.51 });

        const items = LocalStorageUtils.retrieveCartData();

        let price = 0;

        items.forEach(item => {
            price += item.price * item.quantity
        });

        setAmount(price);
    }, [])

    return (
        <ReactSquareWeb.PaymentForm
            /**
             * Identifies the calling form with a verified application ID generated from
             * the Square Application Dashboard.
             */
            applicationId="sandbox-sq0idb-uEZBE-_abRvIBxcmGG___A"
            /**
             * Invoked when payment form receives the result of a tokenize generation
             * request. The result will be a valid credit card or wallet token, or an error.
             */
            cardTokenizeResponseReceived={(token, buyer) => {
                console.info({ token, buyer });
            }}
            /**
             * This function enable the Strong Customer Authentication (SCA) flow
             *
             * We strongly recommend use this function to verify the buyer and reduce
             * the chance of fraudulent transactions.
             */
            createVerificationDetails={() => ({
                amount: '1.00',
                /* collected from the buyer */
                billingContact: {
                    addressLines: ['123 Main Street', 'Apartment 1'],
                    familyName: 'Doe',
                    givenName: 'John',
                    countryCode: 'GB',
                    city: 'London',
                },
                currencyCode: 'GBP',
                intent: 'CHARGE',
            })}
            /**
             * Identifies the location of the merchant that is taking the payment.
             * Obtained from the Square Application Dashboard - Locations tab.
             */
            locationId="LTGCAG10B7PXZ"
        >
            <h1>Subtotal is: {amount}</h1>
            <ReactSquareWeb.CreditCard />
        </ReactSquareWeb.PaymentForm>
    );
}

export default MyPaymentForm;