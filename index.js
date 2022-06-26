import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: 80 });
// const messageStream = createWebSocketStream(server, { decodeStrings: false, encoding: 'utf8' });

function onConection(ws) {
    ws.on('message', onMessage);
}

function onMessage(message) {
    let command = message.toString('utf8').split(' ')[0];
    let params = message.toString('utf8').split(' ').slice(1);
    console.log('command:', command);
    console.log('parameters:', params);

    var mousePos = robot.getMousePos();
    switch (command) {

        case 'mouse_left':
            { console.log('mouse_left') }
            robot.moveMouseSmooth(mousePos.x - params[0], mousePos.y);
            break;
        case 'mouse_right':
            { console.log('mouse_right') }
            robot.moveMouseSmooth(mousePos.x + params[0], mousePos.y);
            break;
        case 'mouse_up':
            robot.moveMouseSmooth(mousePos.x, mousePos.y - params[0]);
            { console.log('mouse_up') }
            break;
        case 'mouse_down':
            robot.moveMouseSmooth(mousePos.x, mousePos.y + params[0]);
            { console.log('left command') }
            break;

        case 'draw_square':
            { console.log('draw_square') }
            break;
        case 'draw_circle':
            { console.log('draw_circle') }
            break;
        case 'draw_rectangle':
            { console.log('draw_rectangle') }
            break;
        case 'mouse_position':
            { console.log('mouse_position:', mousePos) }
            let coordinates = `mouse_position ${mousePos.x},${mousePos.y}`;
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(coordinates);
                }
            })
            // answer: mouse_position {x px},{y px}
            break;
        case 'prnt_scrn':
            { console.log('prnt_scrn') }
            //answer: prnt_scrn {base64 string (png buf)}
            break;
        default:
            break;
    }
    // if (message === 'exit') {
    //     ws.close()
    // } else {
    //     server.clients.forEach(client => {
    //         console.log(message)
    //     })
    // }
}

server.on('connection', onConection);