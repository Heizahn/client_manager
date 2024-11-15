'use client';
import { useStoreClientView } from '@/store/storeClientView';
import { useState } from 'react';
import SkeletonPayment from './skeletonPayment';

export default function PaymentsTable({ clientId }: { clientId: string }) {
	const { payments } = useStoreClientView();
	const [loading, setLoading] = useState(true);

	return payments && loading && <SkeletonPayment />;
}
