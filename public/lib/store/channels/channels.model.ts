import { BaseEntityState, Page } from '@redactie/utils';

import { ChannelSchema } from '../../services/channels';

export interface InternalState {
	readonly view: ChannelSchema | null;
}

export type ChannelModel = ChannelSchema;

export interface ChannelsState extends BaseEntityState<ChannelModel, string> {
	meta?: Page;
	view?: ChannelModel;
	viewDraft?: ChannelModel;
}
