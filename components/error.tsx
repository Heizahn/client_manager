'use client';
import { toast } from 'react-toastify';

export default function ErrorMessage({ error }: { error: string }) {
	toast.error(error);
	return <></>;
}
