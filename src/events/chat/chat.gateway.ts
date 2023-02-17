
import {
    MessageBody, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:['*']})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    
    @WebSocketServer()
    server: any;

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string) {
        console.log(data)
        this.server.emit('receive_message', data);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
