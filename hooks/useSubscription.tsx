import { useState, useEffect } from 'react';
import {
    onCurrentUserSubscriptionUpdate,
    Subscription,
} from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import payments from '../lib/stripe';

export default function useSubscription(user: User | null) {
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    useEffect(() => {
        if (!user) return;
        onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
            setSubscription(
                snapshot.subscriptions.filter(
                    ({ status }) => status === 'active' || status === 'trialing'
                )[0]
            );
        });
    }, [user]);

    return subscription;
}
