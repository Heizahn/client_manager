import * as yup from 'yup';

export const schemaRouter = yup.object({
	nombre: yup
		.string()
		.required('*')
		.min(3, 'Mínimo 3 caracteres')
		.max(15, 'Máximo 15 caracteres'),
	ip: yup.string().required('*'),
	sector: yup.string().required('*'),
});
