export const htmlTemplates = {
    board: 1,
    card: 2,
    form: 3,
    button: 4,
    edit: 5,
    headers: 6,
    column: 7
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.form]: formBuilder,
    [htmlTemplates.button]: addBoardButtonBuilder,
    [htmlTemplates.edit]: formEditTitleBuilder,
    [htmlTemplates.headers]: headerColumnBuilder,
    [htmlTemplates.column]: columnBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board, edit=false) {
    if (edit) {
        return `
                    <span class="board-title" data-board-id=${board.id}>${board.title}</span>
                `;}
    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}>
                    <div class="board-header" data-board-id=${board.id}><span class="board-title" data-board-id=${board.id}>${board.title}</span>
                        <button class="add-card" data-board-id="${board.id}">Add Card</button>
                        <button class="toggle-board-button" data-board-id="${board.id}">Show</button>
                        <button class="delete-board-button" data-board-id="${board.id}"><i class="fas fa-trash-alt delete-board-button" data-board-id="${board.id}"></i></button>
                    </div>
                    <div class="board-columns" data-board-id="${board.id}"></div>
                </section>
            </div>`;
}

function headerColumnBuilder() {
    return `<div class="board-columns">
                <div class="board-column new">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content"></div>
                </div>
                
                <div class="board-column progress">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content"></div>
                </div>
                
                <div class="board-column testing">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content"></div>
                </div>
                
                <div class="board-column done">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content"></div>
                </div>
            </div>`
}

function cardBuilder(card) {
    return  `<div class="card" data-card-id="${card.id}" >
                <div class="card-remove" data-card-id="${card.id}">
                    <i class="fas fa-trash-alt card-remove" data-card-id="${card.id}"></i>
                </div>
                <div class="card-title">${card.title}</div>
             </div>`;
}

function formBuilder(){
        return `<form method="post" action="javascript:void(0)">
                    <input id='add-board-input' type="text" name="title">
                    <label for="add-board-input">Title</label>
                    <button class='formButton' type="submit">SAVE</button>
                </form>`;
    }

function formEditTitleBuilder(board){
        return `<form method="put" action="javascript:void(0)">
                    <input id='edit-board${board.id}-input' type="text" name="title" value="${board.title}">
                    <button class='formButton' data-board-id="${board.id}" type="submit">UPDATE</button>
                </form>`;
    }

function addBoardButtonBuilder(){
    return `<button id="addBoard" class="addBoard" type="submit">+ Add New Board +</button>`
}



function columnBuilder(column, boardId) {
    return `<div class="board-column" data-column-id="${column.id}" data-board-id="${boardId}">
                <div class="board-column-title" data-column-id="${column.id}" data-board-id="${boardId}">${column.title}</div>
                <div class="board-column-content" data-column-id="${column.id}" data-board-id="${boardId}"></div>
            </div>`
}