import { SectorType } from './lib/typesConsultas';

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

export interface ClientDetailsHeader {
	id: string;
	nombre: string;
	saldo: number;
	estado: boolean;
	direccion: string;
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
	sectors: SectorType | null; // Relación con tabla `sectors`
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
	nombre_sector: string;
	created_at: string;
	clientes: number;
	estado: boolean;
}

export interface Service extends DataSelectService {
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
}

export interface DataSelectRouter extends DataSelect {
	nombre: string;
}

export interface DataSelectSector extends DataSelect {
	nombre_sector: string;
}

export interface DataSelectService extends DataSelect {
	nombre_service: string;
	tipo: string;
}

export interface ServiceReceivable {
	id: string;
	motivo: string;
	created_at: string;
	monto: number;
	deuda: number;
	estado: boolean;
}

export interface PaymentStruct {
	id: string;
	motivo: string;
	created_at: string;
	tipo: string;
	monto_ref: number;
	monto_bs: number;
	referencia: string;
	estado: boolean;
	created_by: string;
	recibido_por: string;
}

export interface DataSelectProfile {
	id: string;
	name: string;
}

export interface ServicePayment {
	id: string;
	motivo: string;
}

export interface ClientPayment {
	nombre: string;
	identificacion: string;
	service_receivable: ServicePayment[] | null;
}

export interface PayValues {
	cliente: string;
	created_by: string;
	tipo: string;
	monto_ref: number;
	monto_bs: number;
	referencia: string;
	motivo: string;
	recibido_por: string;
	service_receivable_id: string;
}
