import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface ChannelsRouteProps<
	Params extends {
		[K in keyof Params]?: string;
	} = Record<string, string | undefined>
> extends RouteConfigComponentProps<Params> {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface ChannelsMatchProps {
	siteId: string;
	viewUuid?: string;
}
