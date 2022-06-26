import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import { drawCircle } from './draw-circle.js';
import { drawRectangle } from './draw-rectangle.js';
import { prntScrn } from './prnt-scrn.js'
import { Duplex } from 'stream';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: 8080 });
let messageStream: Duplex;

function onConection(ws: WebSocket): void {
    // add event listener to messages
    ws.on('message', onMessage);
    // create message streams
    server.clients.forEach(client => {
        messageStream = createWebSocketStream(client, { decodeStrings: false, encoding: 'utf8' });
    })
}

async function onMessage(message: Buffer) {
    const command = message.toString('utf8').split(' ')[0];
    let params = message.toString('utf8').split(' ').slice(1).map(item => Number(item));
    robot.setMouseDelay(10);
    const mousePos = robot.getMousePos();
    switch (command) {
        case 'mouse_left':
            robot.moveMouse(mousePos.x - params[0], mousePos.y);
            break;
        case 'mouse_right':
            robot.moveMouse(mousePos.x + params[0], mousePos.y);
            break;
        case 'mouse_up':
            robot.moveMouse(mousePos.x, mousePos.y - params[0]);
            break;
        case 'mouse_down':
            robot.moveMouse(mousePos.x, mousePos.y + params[0]);
            break;
        case 'draw_square':
            const side = params[0];
            drawRectangle(side, side);
            break;
        case 'draw_circle':
            const r = params[0];
            drawCircle(r);
            break;
        case 'draw_rectangle':
            const sideX = params[0];
            const sideY = params[1];
            drawRectangle(sideX, sideY);
            break;
        case 'mouse_position':
            let coordinates = `mouse_position ${mousePos.x},${mousePos.y}`;
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    messageStream = createWebSocketStream(client, { decodeStrings: false, encoding: 'utf8' });
                    messageStream.write(coordinates);
                }
            })
            break;

        case 'prnt_scrn':
            const imgString = await prntScrn();
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    messageStream = createWebSocketStream(client, { decodeStrings: false });
                    messageStream.write(imgString);
                }
            })
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