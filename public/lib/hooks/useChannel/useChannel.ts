import { LoadingState, useObservable } from '@redactie/utils';

import { channelsFacade } from '../../store/channels';

import { UseChannel } from './useChannel.types';

const useChannel = (): UseChannel => {
	const isFetching = useObservable(channelsFacade.isFetchingOne$, LoadingState.Loading);
	const isUpdating = useObservable(channelsFacade.isUpdating$, LoadingState.Loaded);
	const isCreating = useObservable(channelsFacade.isCreating$, LoadingState.Loaded);
	const isRemoving = useObservable(channelsFacade.isRemoving$, LoadingState.Loaded);
	const channel = useObservable(channelsFacade.channel$);
	const error = useObservable(channelsFacade.error$);

	const upsertingState = [isUpdating, isCreating].includes(LoadingState.Loading)
		? LoadingState.Loading
		: LoadingState.Loaded;

	const fetchingState = error ? LoadingState.Error : isFetching;
	const removingState = error ? LoadingState.Error : isRemoving;

	return {
		fetchingState,
		upsertingState,
		removingState,
		channel,
	};
};

export default useChannel;
