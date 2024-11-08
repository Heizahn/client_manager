export default function Detail({ title, label }: { title: string; label: string }) {
	return (
		<p className='text-base'>
			<strong className='ml-2'>{title}</strong> {label}
		</p>
	);
}
