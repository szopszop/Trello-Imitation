import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
import { dom } from "./dom.js";

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
