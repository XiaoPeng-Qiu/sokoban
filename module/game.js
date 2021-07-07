import { playerMove, isWin } from './play.js';
import showUi from './ui.js'
showUi();
var over = false;

window.onkeydown = function (e) {
    if (over) {
        return;
    }
    let result = false;
    if (e.key === "ArrowUp") {
        result = playerMove('up');
    } else if (e.key === "ArrowDown") {
        result = playerMove('down');
    } else if (e.key === "ArrowLeft") {
        result = playerMove('left')
    } else if (e.key === "ArrowRight") {
        result = playerMove('right')
    }
    if (result) {
        showUi();
        if (isWin()) {
            console.log("游戏胜利");
            over = true;
        }
    }
}