import { HubConnectionBuilder, JsonHubProtocol } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
	//add domain hub here
	.withUrl('https://localhost:44309/hub')
	.withHubProtocol(new JsonHubProtocol())
	.withAutomaticReconnect([0, 10, 10000])
	.build();

export default connection;
