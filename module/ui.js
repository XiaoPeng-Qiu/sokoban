//该模块用于将地图显示到页面上
import * as map from "./map.js";

var divContainer = document.getElementById("game");

//每一个小块的宽度
var pieceWidth = 45;
//每一小块的高度
var pieceHeight = 45;


/**
 * 根据行和列，创建一个div添加到页面中
 * @param {*} row 
 * @param {*} col 
 * @returns 
 */
function setOnePiece(row, col) {
    //拿到行和列的值
    var value = map.content[row][col];

    var div = document.createElement("div");
    div.className = "item";
    divContainer.appendChild(div);

    //调整位置
    div.style.left = col * pieceWidth + "px";
    div.style.top = row * pieceHeight + "px";

    //判断是否为正确的位置
    var correct = isCorrect(row, col);

    //判断得出class的具体样式
    if (value === map.PLAYER) {
        //玩家
        div.classList.add('player');
    } else if (value === map.WALL) {
        //墙
        div.classList.add('wall');
    } else if (value === map.BOX) {
        // 正确盒子和普通盒子
        if (correct) {
            div.classList.add('correct-box');
        } else {
            div.classList.add('box');
        }
    } else {
        //空白部分判断
        if (correct) {
            div.classList.add('correct')
        } else {
            return;
        }
    }
}



/**
 * 根据是否为正确的盒子
 * @param {*} row 
 * @param {*} col 
 */
function isCorrect(row, col) {
    return map.correct.find(p => p.row === row && p.col === col) !== undefined;
}



//渲染盒子的位置
function setContent() {
    divContainer.innerHTML = "";
    //遍历地图内容，设置元素
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            setOnePiece(row, col);
        }

    }

}


//设置div的宽度
function setDivContainer() {
    divContainer.style.width = pieceWidth * map.rowNumber + "px";
    divContainer.style.height = pieceHeight * map.colNumber + "px";
}

export default function () {
    //1.设置div的宽高
    setDivContainer();
    //2.渲染页面内容
    setContent();
}
