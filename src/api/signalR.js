import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
	.withUrl('http://example.com')
	.withAutomaticReconnect([0, 10, 10000])
	.build();

export default connection;
