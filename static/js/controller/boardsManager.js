import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    addBoard: async function(){
        let boardTitle = htmlFactory(htmlTemplates.form);
        const content = boardTitle();
        await dataHandler.createNewBoard(boardTitle);
        domManager.addChild("#form", content);
        domManager.addEventListener(
                `.formButton`,
                "click",
                saveForm
            )
    }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function saveForm(clickEvent) {

    const formBoard = clickEvent.target.dataset.formBoard;
    dataHandler.createNewBoard()
}

