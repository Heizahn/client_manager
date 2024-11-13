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
export interface CreateRouter {
	nombre: string;
	ip: string;
	sector: string;
}
export interface Sector {
	id: string;
	nombre: string;
	created_at: string;
	clientes: number;
	estado: boolean;
}

export interface Service {
	id: string;
	nombre: string;
	tipo: string;
	clientes: number;
	costo: number;
	estado: boolean;
}

export interface CreateService {
	nombre: string;
	tipo: string;
	costo: number;
}
