import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	DataLoader,
	FilterItem,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT } from '../../channels.const';
import { ChannelsMatchProps, ChannelsRouteProps } from '../../channels.types';
import { FilterForm, FilterFormState } from '../../components';
import rolesRightsConnector from '../../connectors/rolesRights';
import translationsConnector from '../../connectors/translations';
import { useChannels, useRoutesBreadcrumbs } from '../../hooks';
import { DEFAULT_SEARCH_PARAMS } from '../../services/api';
import { ChannelsSearchParams } from '../../services/channels';
import { channelsFacade } from '../../store/channels';

import { ChannelsOverviewTableRow } from './ChannelsOverview.types';
import { CHANNELS_OVERVIEW_COLUMNS, OVERVIEW_QUERY_PARAMS_CONFIG } from './channelsOverview.const';

const ChannelsOverview: FC<ChannelsRouteProps<ChannelsMatchProps>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */

	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [query, setQuery] = useAPIQueryParams(OVERVIEW_QUERY_PARAMS_CONFIG, false);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const { navigate } = useNavigate(SITES_ROOT);
	const [t] = translationsConnector.useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [loadingState, channels, channelsPaging] = useChannels();

	useEffect(() => {
		if (
			loadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState, mySecurityRightsLoadingState]);

	useEffect(() => channelsFacade.getChannels(siteId, query as ChannelsSearchParams), [
		query,
		siteId,
	]);

	/**
	 * Functions
	 */
	const onSubmit = ({ name }: FilterFormState): void => {
		setQuery({ search: name });
	};

	const createFilters = ({ name }: FilterFormState): FilterItem[] => {
		return [
			...(name
				? [
						{
							key: 'search',
							valuePrefix: 'Naam',
							value: name,
						},
				  ]
				: []),
		].filter(f => !!f.value);
	};

	const deleteAllFilters = (): void => {
		setQuery({ ...DEFAULT_SEARCH_PARAMS, search: undefined });
	};

	const deleteFilter = (item: FilterItem): void => {
		setQuery({ [item.key as string]: '' });
	};

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			page: pageNumber,
			skip: (pageNumber - 1) * DEFAULT_SEARCH_PARAMS.limit,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery({
			...parseOrderByToObj({ ...orderBy, key: `meta.${orderBy.key}` }),
		});
	};

	const filterFormState: FilterFormState = { name: query.search ?? '' };
	const activeSorting: OrderBy = parseObjToOrderBy({
		sort: query.sort ? query.sort.split('.')[1] : '',
		direction: query.direction ?? 1,
	});
	const activeFilters = createFilters(filterFormState);

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!Array.isArray(channels)) {
			return null;
		}

		// TODO match with api
		const channelsRows: ChannelsOverviewTableRow[] = channels.map(channel => ({
			id: channel.uuid as string,
			name: channel.meta.label,
			contentType: channel.contentType,
			sendMethod: channel.sendMethod,
			service: channel.service,
			status: channel.status,
			navigate: (channelUuid: string) =>
				navigate(MODULE_PATHS.detailConfig, { siteId, viewUuid: channelUuid }),
		}));

		return (
			<>
				<div className="u-margin-bottom">
					<AlertContainer containerId={ALERT_CONTAINER_IDS.overview} />
				</div>
				<FilterForm
					initialState={filterFormState}
					onCancel={deleteAllFilters}
					onSubmit={onSubmit}
					deleteActiveFilter={deleteFilter}
					activeFilters={activeFilters}
				/>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--sm"
					columns={CHANNELS_OVERVIEW_COLUMNS(t, mySecurityrights)}
					rows={channelsRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={channelsPaging?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
					loadDataMessage="Verzendkanalen ophalen"
					noDataMessage={t(translationsConnector.CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Verzendkanalen">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<rolesRightsConnector.api.components.SecurableRender
						userSecurityRights={mySecurityrights}
						requiredSecurityRights={[rolesRightsConnector.securityRights.create]}
					>
						<Button
							iconLeft="plus"
							onClick={() => navigate(`${MODULE_PATHS.createSettings}`, { siteId })}
						>
							{t(translationsConnector.CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
						</Button>
					</rolesRightsConnector.api.components.SecurableRender>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default ChannelsOverview;
