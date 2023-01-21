import { down, left, mouse, right, up } from "@nut-tree/nut-js";
export async function drawRectangle(sideX: number, sideY: number) {
    await mouse.drag(right(sideX));
    await mouse.drag(down(sideY));
    await mouse.drag(left(sideX));
    await mouse.drag(up(sideY));
}