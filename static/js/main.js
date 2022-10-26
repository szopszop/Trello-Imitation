import { dom } from "./dom.js";
import {boardsManager} from "./controller/boardsManager.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

    boardsManager.addBoard();
    boardsManager.addNewBoardButton();
}

init();
