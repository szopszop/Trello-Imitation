export const htmlTemplates = {
    board: 1,
    card: 2,
    form: 3,
    button: 4,
    edit: 5

}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.form]: formBuilder,
    [htmlTemplates.button]: addBoardButtonBuilder,
    [htmlTemplates.edit]: formEditTitleBuilder
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

function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" data-board-id=${board.id}>${board.title}</div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
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
                    <input id='edit-board-input' type="text" name="title" value="${board.title}">
                    <button class='formButton' type="submit">UPDATE</button>
                </form>`;
    }

function addBoardButtonBuilder(){
    return `<button id="addBoard" class="addBoard" type="submit">+ Add New Board +</button>`
}