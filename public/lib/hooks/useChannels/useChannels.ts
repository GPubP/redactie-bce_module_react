import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { ChannelSchema } from '../../services/channels';
import { channelsFacade } from '../../store/channels';

const useChannels = (): [
	LoadingState,
	ChannelSchema[] | null | undefined,
	Page | null | undefined
] => {
	const [loading] = useObservable(channelsFacade.isFetching$, LoadingState.Loading);
	const [channels] = useObservable(channelsFacade.channels$, null);
	const [channelsPaging] = useObservable(channelsFacade.meta$, null);
	const [error] = useObservable(channelsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, channels, channelsPaging];
};

export default useChannels;
