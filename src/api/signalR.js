import { HubConnectionBuilder, JsonHubProtocol } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
	.withUrl('https://example.com')
	.withHubProtocol(new JsonHubProtocol())
	.withAutomaticReconnect([0, 10, 10000])
	.build();

export default connection;
