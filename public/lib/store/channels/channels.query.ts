import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ChannelsState } from './channels.model';
import { channelsStore } from './channels.store';

export class ChannelsQuery extends BaseEntityQuery<ChannelsState> {
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public channels$ = this.selectAll();
	public channel$ = this.select(state => state.channel).pipe(
		filter(channel => !isNil(channel), distinctUntilChanged())
	);
	public channelDraft$ = this.select(state => state.channelDraft).pipe(
		filter(channelDraft => !isNil(channelDraft), distinctUntilChanged())
	);
}

export const channelsQuery = new ChannelsQuery(channelsStore);
