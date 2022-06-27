import robot from 'robotjs';

export const drawRectangle = (sideX: number, sideY: number) => {
    const mousePos = robot.getMousePos();
    let start = { x: mousePos.x - sideX / 2, y: mousePos.y - sideY / 2 };
    robot.moveMouseSmooth(start.x, start.y);
    robot.mouseToggle('down');
    robot.moveMouseSmooth(start.x, start.y + sideY);
    robot.moveMouseSmooth(start.x + sideX, start.y + sideY);
    robot.moveMouseSmooth(start.x + sideX, start.y);
    robot.moveMouseSmooth(start.x, start.y);
    robot.mouseToggle('up');
    robot.moveMouseSmooth(mousePos.x, mousePos.y);
}