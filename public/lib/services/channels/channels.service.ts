import { parseSearchParams, SearchParams } from '@redactie/utils';

import { api, DEFAULT_SEARCH_PARAMS } from '../api';

import { ChannelSchema, ChannelsSchema, ChannelsSearchParams } from './channels.service.types';

export class ChannelsApiService {
	public async getChannels(
		siteId: string,
		searchParams: ChannelsSearchParams = DEFAULT_SEARCH_PARAMS
	): Promise<ChannelsSchema | null> {
		try {
			const response: ChannelsSchema = await api
				.get(`sites/${siteId}/channels?${parseSearchParams(searchParams as SearchParams)}`)
				.json();

			if (!response._embedded) {
				throw new Error('Failed to get views');
			}

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async getChannel(siteId: string, uuid: string): Promise<ChannelSchema | null> {
		try {
			const response: ChannelSchema = await api
				.get(`sites/${siteId}/channels/${uuid}`)
				.json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async updateChannel(
		siteId: string,
		channel: ChannelSchema
	): Promise<ChannelSchema | null> {
		try {
			const response: ChannelSchema = await api
				.put(`sites/${siteId}/channels/${channel.uuid}`, {
					json: channel,
				})
				.json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async createChannel(
		siteId: string,
		channel: ChannelSchema
	): Promise<ChannelSchema | null> {
		try {
			const response: ChannelSchema = await api
				.post(`sites/${siteId}/channels`, {
					json: channel,
				})
				.json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async deleteChannel(siteId: string, channelId: string): Promise<void> {
		return api.delete(`sites/${siteId}/channels/${channelId}`).json();
	}
}

export const channelsApiService = new ChannelsApiService();
