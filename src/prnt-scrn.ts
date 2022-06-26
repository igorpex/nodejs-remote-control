import Jimp from 'jimp';
import robot from 'robotjs';

export const prntScrn = async () => {
    const mousePos = robot.getMousePos();
    const size = 200;
    const img = robot.screen.capture(mousePos.x - size / 2, mousePos.y - size / 2, size, size);
    const data = [];
    const bitmap = img.image;
    let i = 0, l = bitmap.length;
    for (i = 0; i < l; i += 4) {
        data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
    }

    const jImg = new Jimp({
        "data": new Uint8Array(data),
        "width": img.width,
        "height": img.height
    });

    const imgBase64 = await jImg.getBase64Async(Jimp.MIME_PNG);
    const imgString = `prnt_scrn ${imgBase64.substring(22)}`;
    return imgString
}