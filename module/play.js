import * as map from './map.js';


/**
 * 按照指定的方向，让玩家移动一步
 * @param {*} direction 
 */
export function playerMove(direction) {
    //得到玩家位置
    var playerPoint = getPlayerPoint();
    //获取玩家下一个位置
    var nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);
    if (nextInfo.value === map.WALL) {
        return false; //下一个位置是墙,不能移动
    }
    //下一个位置是空白位置，可以移动。
    if (nextInfo.value === map.SPACE) {
        exchange(playerPoint, nextInfo);
        return true;
    } else {
        //下一个位置是箱子
        var nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
        if (nextNextInfo.value === map.SPACE) {
            //可以移动
            exchange(nextInfo, nextNextInfo);
            exchange(playerPoint, nextInfo);
            return true;
        } else {
            return false;
        }
    }
}


export function isWin() {
    //是否每个正确位置都有箱子
    for (let i = 0; i < map.correct.length; i++) {
        const element = map.correct[i];
        if (map.content[element.row][element.col] !== map.BOX) {
            return false;
        }
    }
    return true;
}




/**
 * 交换位置
 * @returns 
 */
function exchange(point1, point2) {
    var temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}


/**
 * 得到玩家的位置
 */
function getPlayerPoint() {

    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if (map.content[row][col] === map.PLAYER) {
                return {
                    row,
                    col
                }
            }
        }

    }
}



/**
 * 得到某个位置在指定方向上的下一个位置的信息（行，列，内容）
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction 
 */
function getNextInfo(row, col, direction) {
    if (direction === 'left') {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    } else if (direction === 'right') {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    } else if (direction === 'up') {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    } else if (direction === 'down') {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}