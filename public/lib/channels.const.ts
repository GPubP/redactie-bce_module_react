import { ContextHeaderTab } from '@redactie/utils';

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites', '/:tenantId/sites/:siteId'],
};

export const VIEW_DETAIL_TAB_MAP: {
	[key in 'settings' | 'config' | 'preview']: ContextHeaderTab;
} = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: true,
		disabled: false,
	},
	config: {
		name: 'Configuratie',
		target: 'configuratie',
		active: false,
		disabled: false,
	},
	preview: {
		name: 'Voorbeeld',
		target: 'voorbeeld',
		active: false,
		disabled: false,
	},
};

export const SITES_ROOT = 'sites';
export const VIEW_DETAIL_TABS: ContextHeaderTab[] = [
	VIEW_DETAIL_TAB_MAP.settings,
	VIEW_DETAIL_TAB_MAP.config,
	VIEW_DETAIL_TAB_MAP.preview,
];
export const urlSiteParam = 'siteId';
export const TENANT_ROOT = '/:tenantId/sites';
export const CONTENT_DETAIL_PATH = `/:${urlSiteParam}/content/content-types/:contentTypeId/content/:contentUuid/overzicht`;
export const MODULE_PATHS = {
	dashboard: `/:${urlSiteParam}/content`,
	root: `/:${urlSiteParam}/channels`,
	overview: `/:${urlSiteParam}/channels/overzicht`,
	create: `/:${urlSiteParam}/channels/aanmaken`,
	createSettings: `/:${urlSiteParam}/channels/aanmaken/instellingen`,
	detail: `/:${urlSiteParam}/channels/:viewUuid`,
	detailSettings: `/:${urlSiteParam}/channels/:viewUuid/instellingen`,
	detailConfig: `/:${urlSiteParam}/channels/:viewUuid/configuratie`,
	detailConfigStatic: `/:${urlSiteParam}/channels/:viewUuid/configuratie/statisch`,
	detailConfigDynamic: `/:${urlSiteParam}/channels/:viewUuid/configuratie/dynamisch`,
	detailDynamicConditions: `/:${urlSiteParam}/channels/:viewUuid/configuratie/dynamisch/voorwaarden`,
	detailDynamicOptions: `/:${urlSiteParam}/channels/:viewUuid/configuratie/dynamisch/sorteer-opties`,
	detailPreview: `/:${urlSiteParam}/channels/:viewUuid/voorbeeld`,
};

export const ALERT_CONTAINER_IDS = {
	settings: 'settings',
	config: 'config',
	overview: 'overview',
};
