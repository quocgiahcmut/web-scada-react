import { HubConnectionBuilder, JsonHubProtocol } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
	//add domain hub here
	.withUrl('https://example.com/hub')
	.withHubProtocol(new JsonHubProtocol())
	.withAutomaticReconnect([0, 10, 10000])
	.build();

export default connection;
