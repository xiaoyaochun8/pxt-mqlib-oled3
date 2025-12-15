/**
 * mqOled blocks
 */
//% groups=['oled-汉字库']
namespace mqlib{
//     let arrWordBank:number[][] = []
//     arrWordBank = [
// /* 0 充 */ [ 0x04, 0x04, 0x84, 0xc4, 0xa4, 0x9c, 0x85, 0x86, 0x84, 0x84, 0xa4, 0xc4, 0x84, 0x04, 0x04, 0x00, 0x00, 0x80, 0x80, 0x40, 0x30, 0x0f, 0x00, 0x00, 0x00, 0x7f, 0x80, 0x80, 0x81, 0xf0, 0x00, 0x00, ],
// /* 1 电 */ [ 0x00, 0x00, 0xf8, 0x88, 0x88, 0x88, 0x88, 0xff, 0x88, 0x88, 0x88, 0x88, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x08, 0x08, 0x08, 0x08, 0x7f, 0x88, 0x88, 0x88, 0x88, 0x9f, 0x80, 0xf0, 0x00, ],
// /* 2 中 */ [ 0x00, 0x00, 0xf0, 0x10, 0x10, 0x10, 0x10, 0xff, 0x10, 0x10, 0x10, 0x10, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x04, 0x04, 0x04, 0x04, 0xff, 0x04, 0x04, 0x04, 0x04, 0x0f, 0x00, 0x00, 0x00, ]
//     ];
    let screen1024 = pins.createBuffer(1024);
    let _screen1025 = pins.createBuffer(1025);
    function getWordBank():number[][]{
        let arrWordBank: number[][] = []
        arrWordBank = [
/* 0 充 */[0x04, 0x04, 0x84, 0xc4, 0xa4, 0x9c, 0x85, 0x86, 0x84, 0x84, 0xa4, 0xc4, 0x84, 0x04, 0x04, 0x00, 0x00, 0x80, 0x80, 0x40, 0x30, 0x0f, 0x00, 0x00, 0x00, 0x7f, 0x80, 0x80, 0x81, 0xf0, 0x00, 0x00,],
/* 1 电 */[0x00, 0x00, 0xf8, 0x88, 0x88, 0x88, 0x88, 0xff, 0x88, 0x88, 0x88, 0x88, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x08, 0x08, 0x08, 0x08, 0x7f, 0x88, 0x88, 0x88, 0x88, 0x9f, 0x80, 0xf0, 0x00,],
/* 2 中 */[0x00, 0x00, 0xf0, 0x10, 0x10, 0x10, 0x10, 0xff, 0x10, 0x10, 0x10, 0x10, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x04, 0x04, 0x04, 0x04, 0xff, 0x04, 0x04, 0x04, 0x04, 0x0f, 0x00, 0x00, 0x00,]
        ];
        return arrWordBank;
    }
    /*
     * arr 字符串
     * posX 列，1~128
     * posY 行，1~4
     */
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block="获取字模数据1024 $arr $posX $posY"
    //% posX.min=1 posX.max=128 posX.defl=1
    //% posY.min=1 posY.max=4 posY.defl=1
    function getFontData1024(arr: number[], posX = 1, posY = 1):Buffer {
        let arrWordBank: number[][] = getWordBank();
        //let screen1024 = pins.createBuffer(1024);
        screen1024.fill(0);
        let line:number = 0;
        for (let ci=0; ci<arr.length; ci++) {
            line = Math.floor(ci / 8);
            let iWordBankIndex = arr[ci];
            // let cnt = arrWordBank[iWordBankIndex].length;
            let index = 0;
            for (let i = 0; i < 16; i++) {
                index = i;
                //字符换行，8字符
                index += 128 * line;
                //字模偏移，16x16
                index += ci * 16;
                //列偏移，128列
                index += (posX - 1) % 128;
                //行偏移，4行
                index += (posY - 1) * 256;
                //上半
                screen1024[index] = arrWordBank[iWordBankIndex][i];
                //下半
                screen1024[index + 128] = arrWordBank[iWordBankIndex][i + 16];
            }
        }
        return screen1024;
    }
    /*
     * arr 字符串
     * posX 列，1~128
     * posY 行，1~4
     */
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block="获取字模数据1025 $arr $posX $posY"
    //% posX.min=1 posX.max=128 posX.defl=1
    //% posY.min=1 posY.max=4 posY.defl=1
    function getFontData1025(arr: number[]=[], posX = 1, posY = 1):Buffer {
        let screen1024:Buffer = getFontData1024(arr, posX, posY);
        screen1024 = getFontData1024(arr, posX, posY);
        //let _screen1025 = pins.createBuffer(1025);
        _screen1025.fill(0);
        _screen1025[0] = 0x40; //64
        for (let i = 0; i < 1024; i++) {
            if(screen1024[i]){
                _screen1025[i + 1] = screen1024[i];
            }else{
                //_screen1025[i + 1] = 0;
            }
        }
        return _screen1025;
    }
    //% subcategory="oled"
    //% group='oled-汉字库'
    //% block="在第几行 $posY 第几列 $posX 显示【充电中】"
    //% posX.min=1 posX.max=128 posX.defl=1
    //% posY.min=1 posY.max=4 posY.defl=1
    export function TestShowWords(posX:number = 1, posY:number = 1) {
        let arr:number[] = [0, 1, 2];
        getFontData1025(arr, posX, posY);
        pins.i2cWriteBuffer(60, _screen1025);
    }
}