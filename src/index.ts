import { httpServer } from './http_server/index.js';
import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { drawCircle } from './draw-circle.js';
import { drawRectangle } from './draw-rectangle.js';
import { prntScrn } from './prnt-scrn.js'
import { Duplex } from 'stream';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port! Click http://localhost:${HTTP_PORT}`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: 8080 });
console.log(`Start WebSocket server on the ${WS_PORT} port!`);

function sendMessage(messageToSend: string) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            const messageStream: Duplex = createWebSocketStream(client, { decodeStrings: false, encoding: 'utf8' });
            messageStream.write(messageToSend);
            messageStream.destroy;
        }
    })
}

function sendImage(imgString: string) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            const messageStream: Duplex = createWebSocketStream(client, { decodeStrings: false });
            messageStream.write(imgString);
            messageStream.destroy;
        }
    })
}

function onConection(ws: WebSocket): void {
    ws.on('message', onMessage);
}

async function onMessage(message: Buffer) {
    const command = message.toString('utf8').split(' ')[0];
    let params = message.toString('utf8').split(' ').slice(1).map(item => Number(item));
    // console.log("Command:", command);
    switch (command) {
        case 'mouse_left':
            await mouse.move(left(params[0]));
            sendMessage('mouse_left');
            break;
        case 'mouse_right':
            await mouse.move(right(params[0]));
            sendMessage('mouse_right');
            break;
        case 'mouse_up':
            await mouse.move(up(params[0]));
            sendMessage('mouse_up');
            break;
        case 'mouse_down':
            await mouse.move(down(params[0]));
            sendMessage('mouse_down');
            break;
        case 'draw_square':
            const side = params[0];
            drawRectangle(side, side);
            sendMessage('draw_square');
            break;
        case 'draw_circle':
            const r = params[0];
            drawCircle(r);
            sendMessage('draw_circle');
            break;
        case 'draw_rectangle':
            const sideX = params[0];
            const sideY = params[1];
            await drawRectangle(sideX, sideY);
            sendMessage('draw_rectangle');
            break;
        case 'mouse_position':
            const position = await mouse.getPosition();
            const coordinates = `mouse_position ${position.x},${position.y}`;
            sendMessage(coordinates);
            break;
        case 'prnt_scrn':
            const imgString = await prntScrn();
            sendImage(imgString);
            break;
        default:
            break;
    }
}

server.on('connection', onConection);

function handleExit() {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.close();
        }
    })
    console.log('Websockets closed. Exit.');
    process.exit(0);
}

process.on('SIGINT', () => handleExit());  // CTRL+C
process.stdin.on('end', () => handleExit());

export {
    httpServer, server, onConection, onMessage
}