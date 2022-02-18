import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		create: 'views_create',
		update: 'views_update',
		read: 'views_read',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
