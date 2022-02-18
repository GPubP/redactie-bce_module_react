import { LoadingState } from '@redactie/utils';

import { ChannelSchema } from '../../services/channels';

export type UseChannel = {
	fetchingState: LoadingState;
	upsertingState: LoadingState;
	removingState: LoadingState;
	channel: ChannelSchema | unknown;
};
