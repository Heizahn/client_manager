'use server';
import {
	ClientPayment,
	CreateClient,
	PaymentStruct,
	ServiceReceivable,
	AllCount,
} from '@/interfaces';
import { createClient, createClientDetails, createClientTables } from './supabase/client';
import { createClient as createClientServer } from './supabase/server';
import { unstable_noStore as noStore } from 'next/cache';
import { ClientDetailsType, ClientType } from './typesConsultas';
import { redirect } from 'next/navigation';

export async function fetchAllClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();

	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion, telefono, ipv4, saldo, estado, services(nombre_service), sectors(nombre_sector)',
		)
		.order('nombre');

	if (error) {
		throw new Error(error.message);
	}
	if (!data) {
		return [];
	}
	return data as unknown as ClientType[];
}

export async function fetchSolventsClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();

	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion, telefono, ipv4, saldo, estado, services(nombre_service), sectors(nombre_sector)',
		)
		.gte('saldo', 0)
		.order('nombre')
		.eq('estado', true);

	if (error) {
		throw new Error(error.message);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
}

export async function fetchDefaultersClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre_sector), services(nombre_service)',
		)
		.lt('saldo', 0)
		.eq('estado', true)
		.order('nombre');

	if (error) {
		throw new Error(error.message);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
}

export async function fetchSuspendedClients(): Promise<ClientType[]> {
	noStore();
	const supabase = await createClientTables();
	const { data, error } = await supabase
		.from('clients')
		.select(
			'id, nombre, identificacion,telefono, ipv4, saldo, estado, sectors(nombre_sector), services(nombre_service)',
		)
		.eq('estado', false)
		.order('nombre');

	if (error) {
		console.error(error);
	}
	if (!data) {
		return [];
	}

	return data as unknown as ClientType[];
}

export async function fetchCountClients(): Promise<AllCount> {
	noStore();
	const supabase = await createClient();
	const { data } = await supabase.from('clients').select('id, saldo, estado');

	const allCount = {
		all: data?.length || 0,
		solvent: data?.filter((client) => client.saldo >= 0 && client.estado).length || 0,
		defaulter: data?.filter((client) => client.saldo < 0 && client.estado).length || 0,
		suspended: data?.filter((client) => !client.estado).length || 0,
	};

	return allCount;
}

export async function fetchClientById(id: string): Promise<ClientDetailsType> {
	noStore();
	const supabase = await createClientDetails();
	const { data, error } = await supabase
		.from('clients')
		.select(
			`
			id, 
			nombre, 
			identificacion, 
			telefono, 
			direccion, 
			ipv4, 
			saldo, 
			estado, 
			created_at, 
			dia_corte, 
			routers(
				nombre
				),
			services(
				nombre_service
				),
			sectors(
				nombre_sector
				)
		`,
		)
		.eq('id', id);

	if (error) {
		throw new Error('Cliente no valido');
	}

	return data[0] as unknown as ClientDetailsType;
}

export async function fetchClientStatusById(
	id: string,
): Promise<{ saldo: number; estado: boolean; nombre: string; direccion: string }> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select('saldo, estado, nombre, direccion')
		.eq('id', id);

	if (error) {
		throw new Error('Error al buscar el cliente');
	}

	if (data.length === 0) {
		redirect('/dashboard/404');
	}

	return data[0] as unknown as {
		saldo: number;
		estado: boolean;
		nombre: string;
		direccion: string;
	};
}

export async function fetchCreateClient(values: CreateClient): Promise<string> {
	noStore();

	const supabase = await createClient();
	const supabaseServer = await createClientServer();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	if (!user) {
		throw new Error('No user found');
	}
	const { id } = user;
	const { error } = await supabase.from('clients').insert({ ...values, created_by: id });
	if (error) {
		throw new Error(error.message);
	}

	return 'Cliente creado exitosamente';
}

export async function fetchServicesReceivable(clientId: string): Promise<ServiceReceivable[]> {
	noStore();
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('service_receivable')
		.select('id, motivo, created_at, monto, deuda, estado')
		.eq('client_id', clientId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error(error);
	}

	if (!data) {
		return [];
	}

	return data;
}

export async function fetchClientPayment(clientId: string) {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('clients')
		.select(
			`
      nombre, 
      identificacion, 
      service_receivable(id, motivo)
    `,
		)
		.eq('id', clientId)
		.filter('service_receivable.estado', 'eq', true)
		.lt('service_receivable.deuda', 0)
		.order('created_at', { referencedTable: 'service_receivable', ascending: true });

	if (error) {
		throw new Error('Error al obtener los pagos');
	}

	if (!data) {
		return null;
	}

	return data[0] as unknown as ClientPayment;
}

export async function fetchPaysByClient(clientId: string): Promise<PaymentStruct[]> {
	noStore();
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('payments')
		.select(
			'motivo, created_at, tipo, monto_ref, monto_bs, referencia, estado, created_by, recibido_por',
		)
		.eq('client_id', clientId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error(error);
		throw new Error('Error al obtener los pagos');
	}

	const { data: dataCreator } = await supabase
		.from('profiles')
		.select('name')
		.eq('id', data?.[0]?.created_by);

	const { data: dataRecibido } = await supabase
		.from('profiles')
		.select('name')
		.eq('id', data?.[0]?.recibido_por);

	return data?.map((payment) => {
		return {
			...payment,
			created_by: dataCreator?.[0]?.name as string,
			recibido_por: dataRecibido?.[0]?.name as string,
		};
	}) as unknown as PaymentStruct[];
}
