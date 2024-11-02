import ShowPayment from './pay';

const clients = [
	{
		nombre: 'Lorianny',
		phone_number: '04125403745',
	},
];

export default function Page() {
	return (
		<div>
			<h2>Clients</h2>
			<ul>
				{clients.map((client) => (
					<li key={client.phone_number}>
						{client.nombre} - {client.phone_number} -{' '}
						<ShowPayment client={client} />
					</li>
				))}
			</ul>
		</div>
	);
}
