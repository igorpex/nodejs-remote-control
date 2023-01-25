import { left, mouse, right, Point, straightTo } from "@nut-tree/nut-js";

export async function drawCircle(r: number) {
    const mousePos = await mouse.getPosition();
    await mouse.move(right(r));
    const defMouseSpeed = mouse.config.mouseSpeed;
    const defDelay = mouse.config.autoDelayMs;
    mouse.config.mouseSpeed = 5000;
    mouse.config.autoDelayMs = 10;
    for (let i = 0; i <= Math.PI * 2; i += 0.04) {
        const x = mousePos.x + (r * Math.cos(i));
        const y = mousePos.y + (r * Math.sin(i));
        const target = new Point(x, y)
        await mouse.drag(straightTo(target));
    };
    mouse.config.mouseSpeed = defMouseSpeed;
    mouse.config.autoDelayMs = defDelay;
    await mouse.move(left(r));
}
