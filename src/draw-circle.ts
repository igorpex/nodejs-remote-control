import robot from 'robotjs';

export const drawCircle = (r: number) => {
    const mousePos = robot.getMousePos();
    robot.moveMouseSmooth(mousePos.x + r, mousePos.y);
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = mousePos.x + (r * Math.cos(i));
        const y = mousePos.y + (r * Math.sin(i));
        robot.dragMouse(x, y);
    };
    robot.mouseToggle('up');
    robot.moveMouseSmooth(mousePos.x, mousePos.y);
}
