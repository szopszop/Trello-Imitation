import {boardsManager} from "./controller/boardsManager.js";

export const socket = io();
socket.connect('https://promancc.herokuapp.com/');

function init() {
    boardsManager.loadBoards();
    boardsManager.addNewBoardButton();


    //manual sync
    // const refreshButton = document.querySelector('#manual-sync');
    // refreshButton.addEventListener('click', () => {
    //     // boardsManager.reloadBoards(userId);
    // });

    //live sync
    socket.on('message', function(msg) {
        console.log(msg);
        // boardsManager.reloadBoards(userId);
    });
}

init();