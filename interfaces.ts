export interface Client {
	id: string;
	nombre: string;
	identificacion: string;
	telefono: string;
	sector: string;
	ipv4: string;
	plan: string;
	saldo: number;
	estado: string;
}

export interface ClientDetails extends Client {
	direccion: string;
	router: string;
	created_at: string;
	dia_corte: number;
}

export interface Router {
	id: string;
	nombre: string;
	ip: string;
	sector: string;
	clientes: number;
	estado: boolean;
}
