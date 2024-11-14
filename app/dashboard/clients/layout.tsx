import All from '@/components/filters/all';
import Defaulters from '@/components/filters/defaulters';
import Solvents from '@/components/filters/solvents';
import Suspended from '@/components/filters/suspended';
import ShowFormNewClient from '@/components/newClient/showFormNewClient';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col md:overflow-hidden mt-2'>
			<div className='flex flex-row justify-between items-center p-3 rounded-md bg-gray-800  sticky top-0 z-10'>
				<div className='flex flex-row '>
					<All />
					<Solvents />
					<Defaulters />
					<Suspended />
				</div>
			</div>
			{children}
		</div>
	);
}
