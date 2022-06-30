import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {socket} from "../main.js";
import {columnsManager} from "./columnManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = await htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `.board-title[data-board-id="${board.id}"]`,
                "click",
                editTitle
            );
            domManager.addEventListener(
                `.add-card[data-board-id="${board.id}"]`,
                'click',
                addNewCard
            );
        }
    },
    addNewBoardButton: async function () {
        const add = htmlFactory(htmlTemplates.button)
        const content = add()
        domManager.addChild("#form", content);
        domManager.addEventListener(
            `.addBoard`,
            "click",
            this.addBoard
        )
    },
    addBoard: async function () {
        let addButton = document.getElementById('addBoard')
        addButton.remove()
        const boardTitle = htmlFactory(htmlTemplates.form);
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
        const boardId = boards[boards.length - 1].id
        const content = boardBuilder(boards[boards.length - 1]);
        domManager.addChild("#root", content);
        domManager.addEventListener(
            `.toggle-board-button[data-board-id="${boardId}"]`,
            "click",
            showHideButtonHandler
        );
        domManager.addEventListener(
            `.board[data-board-id="${boardId}"]`,
            "click",
            editTitle
        );
    },
    reloadBoards: async function () {
        const boardsIdToLoad = checkForLoadedContent();
        console.log(boardsIdToLoad, 'board to load')
        const boards = document.querySelectorAll('section.board');
        boards.forEach(board => {
            board.remove();
        });
        await this.loadBoards();

        boardsIdToLoad.forEach(boardId => {
            loadBoardContent(boardId);
            // domManager.toggleCSSClasses(`.fas[data-board-id="${boardId}"]`, 'fa-chevron-down', 'fa-chevron-up');
        });
    },
};

async function addNewCard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId

    const addCardPopup = document.querySelector('#create-card');
    const addCardForm = document.querySelector('#create-card-form');
    const addCardTitle = document.querySelector('#card-title');
    const addCardStatus = document.querySelector('#card-status');
    const addCardSubmit = document.querySelector('#submit-card');

    addCardPopup.style.display = 'flex'

    addCardSubmit.addEventListener('click', async event => {
        const title = addCardTitle.value
        const status = addCardStatus.value

        await dataHandler.addNewCard(boardId, title, status)
        await cardsManager.loadCards(boardId)
        addCardPopup.style.display = 'none'

    })


}
//
//
// async function showHideButtonHandler(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     if (clickEvent.target.innerText === 'Show') {
//         await cardsManager.loadCards(boardId);
//         clickEvent.target.innerText = 'Hide'
//     } else {
//         const boardColumns = document.querySelector(`.board[data-board-id="${boardId}"]`).children[1].children
//         Array.from(boardColumns).forEach(column => {
//             const content = column.children
//             const contentArray = Array.from(content)
//             for (let i = 1; i <= contentArray.length; i += 2) {
//                 contentArray[i].innerHTML = ''
//             }
//         });
//         clickEvent.target.innerText = 'Show'
//     }
// }
async function saveForm() {
    const title = document.getElementById('add-board-input').value
    await dataHandler.createNewBoard(title);
    boardsManager.displayNewBoard();
    socket.send('aaaaaaaaaaaaaaaaaaaa');

}

async function editTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const board = await dataHandler.getBoard(boardId)
    const editFunc = htmlFactory(htmlTemplates.edit)
    const input = editFunc(board)
    clickEvent.target.outerHTML = input
    domManager.addEventListener(
        `.formButton[data-board-id="${board.id}"]`,
        "click",
        changeTitle
    );
}

async function changeTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const board = await dataHandler.getBoard(boardId)
    const newTitle = document.getElementById(`edit-board${boardId}-input`).value;
    await dataHandler.renameBoard(newTitle, boardId);
    const updateBoard = htmlFactory(htmlTemplates.board)
    clickEvent.target.parentElement.outerHTML = updateBoard({'title': newTitle, 'id': boardId}, true)
    await dataHandler.renameBoard(newTitle, board.id)
    await domManager.addEventListener(
        `.board-title[data-board-id="${boardId}"]`,
        "click",
        editTitle
    );
}

function checkForLoadedContent() {
    const openedBoardsId = [];
    const boardsContent = document.querySelectorAll('div.board-columns');
    boardsContent.forEach(boardContent => {
        if (boardContent.hasChildNodes()) {
            openedBoardsId.push(boardContent.dataset.boardId);
            boardContent.innerHTML = '';
        }
    });
    return openedBoardsId
}

// async function loadBoardContent(boardId) {
//     await cardsManager.loadCards(boardId);
// }



function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(clickEvent.target.innerHTML)
    if (domManager.hasChild(`.board-columns[data-board-id="${boardId}"]`)) {
        domManager.removeAllChildren(`.board-columns[data-board-id="${boardId}"]`);
        clickEvent.target.innerHTML = 'Show'
    } else {
        loadBoardContent(boardId);
        clickEvent.target.innerHTML = 'Hide'
    }
}


function loadBoardContent(boardId) {
    columnsManager.loadColumns(boardId)
        .then(() => {
            cardsManager.loadCards(boardId)

        })
        .catch(err => console.log(err));
}