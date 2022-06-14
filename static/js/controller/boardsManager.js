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
            domManager.addEventListener(
                `.board[data-board-id="${board.id}"]`,
                "click",
                editTitle
            );
        }
    },
    addNewBoardButton: async function(){
        let add = htmlFactory(htmlTemplates.button)
        const content = add()
        domManager.addChild("#form", content);
        domManager.addEventListener(
                `.addBoard`,
                "click",
                this.addBoard
            )
    },
    addBoard: async function(){
        let addButton = document.getElementById('addBoard')
        addButton.remove()
        let boardTitle = htmlFactory(htmlTemplates.form);
        const content = boardTitle();
        domManager.addChild("#form", content);
        domManager.addEventListener(
                `.formButton`,
                "click",
                saveForm
            )
    },
    displayNewBoard: async function () {
        const boards = await dataHandler.getBoards();
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(boards[boards.length - 1]);
        domManager.addChild("#root", content);
        domManager.addEventListener(
            `.toggle-board-button[data-board-id="${content.id}"]`,
            "click",
            showHideButtonHandler
        );
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

async function saveForm() {
    const title = document.getElementById('add-board-input').value
    await dataHandler.createNewBoard(title);
    boardsManager.displayNewBoard();
}

async function editTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const board = await dataHandler.getBoard(boardId)
    const editFunc = htmlFactory(htmlTemplates.edit)
    const input = editFunc(board)
    clickEvent.target.innerHTML = input
}
