export async function authenticate(prevState: string | undefined, formData: FormData) {
	try {
		console.log(formData);
	} catch (error) {
		if (error instanceof Error) {
			return error.message;
		}
	}
}
