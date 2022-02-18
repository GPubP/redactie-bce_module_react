import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { ChannelModel, ChannelsState } from './channels.model';

@StoreConfig({ name: 'channels', idKey: 'uuid' })
export class ChannelsStore extends BaseEntityStore<ChannelsState, ChannelModel> {}

export const channelsStore = new ChannelsStore();
