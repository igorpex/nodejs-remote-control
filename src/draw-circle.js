export const drawCircle = (robot, r) => {
    const mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x + r, mousePos.y);
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = mousePos.x + (r * Math.cos(i));
        const y = mousePos.y + (r * Math.sin(i));
        robot.dragMouse(x, y);
    };
    robot.mouseToggle('up');
}
