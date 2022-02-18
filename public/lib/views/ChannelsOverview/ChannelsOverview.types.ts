export interface ChannelsOverviewTableRow {
	id: string;
	name: string;
	service: string;
	contentType: string;
	sendMethod: string;
	status: string;
	navigate: (channelUuid: string) => void;
}
