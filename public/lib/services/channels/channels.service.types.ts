import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { EmbeddedResponse, SearchParams } from '@redactie/utils';

export interface ChannelsSearchParams extends Omit<SearchParams, 'search'> {
	search?: string[];
}

export interface ChannelsRouteProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export type ChannelsSchema = EmbeddedResponse<ChannelSchema>;

export interface ChannelQueryConditionField {
	fieldType?: string;
	dataType?: string;
	preset?: string | null;
	group: string;
	label: string;
	type: string;
	_id: string;
}

export interface ChannelQueryOperator {
	label: string;
	value: any;
}

export interface ChannelQueryCondition {
	field: ChannelQueryConditionField;
	operator: ChannelQueryOperator;
	label?: string;
	value: string;
	uuid: string;
}

export interface ChannelQueryOptionsOrderByValidation {
	required: boolean;
}

export interface ChannelQueryOptionsOrderBy {
	dataType: string;
	group: string;
	indexed?: boolean;
	label: string;
	max?: number;
	min?: number;
	multiLanguage?: boolean;
	operators: ChannelQueryOperator[];
	type?: string;
	uuid?: string;
	validation?: ChannelQueryOptionsOrderByValidation;
	_id: string;
}

export interface ChannelQueryOptions {
	limit: number;
	offset: number;
	order?: string;
	orderBy?: ChannelQueryOptionsOrderBy;
}

export interface ChannelQuery {
	conditions: ChannelQueryCondition[];
	options: ChannelQueryOptions;
	page?: string;
	viewType: 'static' | 'dynamic';
}

export interface ChannelMeta {
	label: string;
	safeLabel?: string;
	description: string;
	created?: string;
	lastModified?: string;
	deleted?: boolean;
	site?: string;
}

export interface ChannelSchema {
	query: ChannelQuery;
	meta: ChannelMeta;
	contentType: string;
	sendMethod: string;
	service: string;
	status: string;
	uuid?: string;
}
