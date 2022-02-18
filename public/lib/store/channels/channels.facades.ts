import { alertService, BaseEntityFacade } from '@redactie/utils';

import { ALERT_CONTAINER_IDS } from '../../channels.const';
import {
	channelsApiService,
	ChannelsApiService,
	ChannelSchema,
	ChannelsSearchParams,
} from '../../services/channels';

import { getAlertMessages } from './channels.messages';
import { ChannelsQuery, channelsQuery } from './channels.query';
import { channelsStore, ChannelsStore } from './channels.store';

export class ChannelsFacade extends BaseEntityFacade<
	ChannelsStore,
	ChannelsApiService,
	ChannelsQuery
> {
	public readonly meta$ = this.query.meta$;
	public readonly channels$ = this.query.channels$;
	public readonly channel$ = this.query.channel$;
	public readonly channelDraft$ = this.query.channelDraft$;

	public getChannels(siteId: string, searchParams: ChannelsSearchParams): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getChannels(siteId, searchParams)
			.then(response => {
				if (!response) {
					throw new Error('Getting channels failed!');
				}

				this.store.set(response._embedded);
				this.store.update({
					meta: response._page,
					isFetching: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetching: false,
				});
			});
	}

	public getChannel(siteId: string, uuid: string): void {
		const { isFetchingOne, contentType } = this.query.getValue();
		if (isFetchingOne || contentType?.uuid === uuid) {
			return;
		}

		this.store.setIsFetchingOne(true);
		this.service
			.getChannel(siteId, uuid)
			.then(response => {
				if (!response) {
					throw new Error(`Getting channel '${uuid}' failed!`);
				}

				this.store.update({
					channel: response,
					isFetchingOne: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingOne: false,
				});
			});
	}

	public updateChannel(siteId: string, body: ChannelSchema, alertId: string): Promise<void> {
		const { isUpdating } = this.query.getValue();

		if (isUpdating) {
			return Promise.resolve();
		}

		this.store.setIsUpdating(true);

		return this.service
			.updateChannel(siteId, body)
			.then(response => {
				if (!response) {
					throw new Error(`Updating channel '${body.uuid}' failed!`);
				}

				this.store.update({
					channel: response,
					channelDraft: response,
					isUpdating: false,
				});

				alertService.success(getAlertMessages(response).update.success, {
					containerId: alertId,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isUpdating: false,
				});

				alertService.danger(getAlertMessages(body).update.error, {
					containerId: alertId,
				});
			});
	}

	public createChannel(siteId: string, body: ChannelSchema, alertId: string): void {
		const { isCreating } = this.query.getValue();

		if (isCreating) {
			return;
		}

		this.store.setIsCreating(true);

		this.service
			.createChannel(siteId, body)
			.then(response => {
				if (!response) {
					throw new Error(`Creating channel '${body?.meta?.label}' failed!`);
				}

				this.store.update({
					channel: response,
					channelDraft: response,
					isCreating: false,
				});
				alertService.success(getAlertMessages(response).create.success, {
					containerId: alertId,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});

				alertService.danger(getAlertMessages(body).create.error, {
					containerId: alertId,
				});
			});
	}

	public async deleteChannel(siteId: string, body: ChannelSchema): Promise<void> {
		const { isRemoving } = this.query.getValue();

		if (isRemoving) {
			return Promise.resolve();
		}

		this.store.setIsRemoving(true);

		return this.service
			.deleteChannel(siteId, body.uuid as string)
			.then(() => {
				this.store.update({
					channel: undefined,
					channelDraft: undefined,
					isRemoving: false,
				});

				// Timeout because the alert should be visible on the overview page
				setTimeout(() => {
					alertService.success(getAlertMessages(body).delete.success, {
						containerId: ALERT_CONTAINER_IDS.overview,
					});
				}, 300);
			})
			.catch(error => {
				this.store.update({
					error,
					isRemoving: false,
				});

				alertService.danger(getAlertMessages(body).delete.error, {
					containerId: ALERT_CONTAINER_IDS.settings,
				});

				throw new Error('Deleting channel failed!');
			});
	}

	public setChannel(channel: ChannelSchema): void {
		this.store.update({
			channel,
		});
	}

	public setChannelDraft(channelDraft: ChannelSchema): void {
		this.store.update({
			channelDraft,
		});
	}

	public unsetChannelDraft(): void {
		this.store.update({
			channelDraft: undefined,
		});
	}

	public unsetChannel(): void {
		this.store.update({
			channel: undefined,
		});
	}
}

export const channelsFacade = new ChannelsFacade(channelsStore, channelsApiService, channelsQuery);
