import {boardsManager} from "./controller/boardsManager.js";

export const socket = io();
socket.connect('https://promancc.herokuapp.com/');

function init() {
    boardsManager.loadBoards();
    boardsManager.addNewBoardButton();


    // manual sync
    const refreshButton = document.querySelector('#reload');
    refreshButton.addEventListener('click', () => {
        boardsManager.reloadBoards();
    });

    //live sync
    socket.on('message', function(msg) {
        console.log(msg);
        boardsManager.reloadBoards();
    });
}

init();