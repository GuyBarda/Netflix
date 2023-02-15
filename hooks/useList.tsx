import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';

import { Movie } from '../typings';

export default function useList(uid: string | undefined) {
    const [list, setList] = useState<DocumentData[] | Movie[]>([]);

    useEffect(() => {
        if (!uid) return;

        return onSnapshot(
            collection(db, 'customers', uid, 'myList'),
            ({ docs }) => {
                setList(
                    docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            }
        );
    }, [db, uid]);

    return list;
}
