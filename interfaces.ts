export interface ClientOrigin {
	nombre: string;
	identificacion: string;
	telefono: string;
	sector: string;
	ipv4: string;
	plan: string;
}

export interface CreateClient extends ClientOrigin {
	direccion: string;
	router: string;
	dia_corte: number;
}

export interface Client extends ClientOrigin {
	id: string;
	saldo: number;
	estado: boolean;
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

export interface CreateRouterSchema {
	nombre: string;
	sector: string;
	part1: string;
	part2: string;
	part3: string;
	part4: string;
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

export interface DataSelect {
	id: string;
	nombre: string;
	tipo?: string;
}
