import { PaymentStruct } from '@/interfaces';
import PaymentRow from './paymentRow';

export default function PaymentsTable({ paymentClient }: { paymentClient: PaymentStruct[] }) {
	return (
		<div className='w-full max-h-[calc(100vh_-_7.5rem)] overflow-y-auto scrollbar-none rounded-b-md'>
			<table className='w-full table-auto bg-gray-800 '>
				<thead className='sticky top-0 bg-gray-800 mt-2'>
					<tr className='text-left text-lg '>
						<th className='pl-4 py-2'>Motivo</th>
						<th>Fecha Creación</th>
						<th>Tipo de Pago</th>
						<th>Creado Por</th>
						<th>Recibido Por</th>
						<th>Monto (REF)</th>
						<th>Monto (Bs)</th>
						<th>Referencia</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{paymentClient.length > 0 ? (
						paymentClient.map((payment: PaymentStruct) => (
							<PaymentRow key={payment.id} payment={payment} />
						))
					) : (
						<tr>
							<td colSpan={8}>
								<div className='pl-4'>
									<p>No hay pagos</p>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
