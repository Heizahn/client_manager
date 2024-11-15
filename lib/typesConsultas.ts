export type ServiceType = {
	nombre_service: string;
};

export type SectorType = {
	nombre_sector: string;
};

export type RouterType = {
	nombre: string;
};

export type ClientType = {
	id: string;
	nombre: string;
	identificacion: string;
	telefono: string;
	ipv4: string;
	saldo: number;
	estado: string;
	services: ServiceType | null; // Relación con tabla `services`
	sectors: SectorType | null; // Relación con tabla `sectors`
};

export type ClientDetailsType = ClientType & {
	direccion: string;
	routers: RouterType | null; // Relación con tabla `routers`
	dia_corte: number;
	created_at: string;
};
