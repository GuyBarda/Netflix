import {
    createCheckoutSession,
    getStripePayments,
} from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from '../firebase';

const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers',
});

const loadCheckout = async (priceId: string) => {
    try {
        const { url } = await createCheckoutSession(payments, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        window.location.assign(url);
    } catch ({ message }) {
        console.log(message);
    }
};

const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'us-central1');
    const functionRef = httpsCallable(
        instance,
        'ext-firestore-stripe-payments-createPortalLink'
    );
    try {
        const { data }: any = await functionRef({
            returnUrl: `${window.location.origin}/account`,
        });
        window.location.assign(data.url);
    } catch ({ message }) {
        console.log(message);
    }
};

export { loadCheckout, goToBillingPortal };
export default payments;
