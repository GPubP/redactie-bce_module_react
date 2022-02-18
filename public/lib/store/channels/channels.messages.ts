import { ChannelSchema } from '../../services/channels';

export const getAlertMessages = (data: ChannelSchema): Record<string, any> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `De nieuwe view "${data.meta?.label}" is succesvol aangemaakt`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Het aanmaken van de view "${data.meta?.label}" is mislukt`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `De view "${data.meta?.label}" is bewaard`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Het bewaren van de view "${data.meta.label}" is mislukt`,
		},
	},
	delete: {
		success: {
			title: 'Verwijderd',
			message: `De view "${data.meta?.label}" is verwijderd`,
		},
		error: {
			title: 'Verwijderen mislukt',
			message: `Het verwijderen van de view "${data.meta.label}" is mislukt`,
		},
	},
});
