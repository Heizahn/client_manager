import All from '@/components/filters/all';
import Defaulters from '@/components/filters/defaulters';
import Solvents from '@/components/filters/solvents';
import Suspended from '@/components/filters/suspended';

export default function HeaderClient() {
	return (
		<div className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-4 z-10 mb-2'>
			<div className='flex flex-row '>
				<All />
				<Solvents />
				<Defaulters />
				<Suspended />
			</div>
			<div>
				<button className='hover:underline underline-offset-4 px-3 transition-all duration-300 ease-linear'>
					Nuevo Cliente
				</button>
			</div>
		</div>
	);
}
