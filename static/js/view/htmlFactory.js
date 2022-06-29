export const htmlTemplates = {
    board: 1,
    card: 2,
    form: 3,
    button: 4,
    edit: 5,
    cardForm: 6
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.form]: formBuilder,
    [htmlTemplates.button]: addBoardButtonBuilder,
    [htmlTemplates.edit]: formEditTitleBuilder,
    [htmlTemplates.cardForm]: addCardFormBuilder
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
                
                <div class="board-header"><span class="board-title" data-board-id=${board.id}>${board.title}</span>
                    <button class="add-card" data-board-id="${board.id}">Add Card</button>
                    <button class="toggle-board-button" data-board-id="${board.id}">Show</button>
                </div>
            
            <div class="board-columns">
                <div class="board-column new">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content">
                    </div>
                </div>
                
                <div class="board-column progress">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content">
                    </div>
                </div>
                
                <div class="board-column testing">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content">
                    </div>
                </div>
                
                <div class="board-column done">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content">
                        
                    </div>
                </div>
            </div>
    
    </section>
</div>`;
}

function cardBuilder(card) {
    return  `<div class="card" data-card-id="${card.id}" >${card.title}</div>`;
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

function addCardFormBuilder(){
    return `<form class="form" id="create-card-form">
        <div class="popup-header">Create New Card</div>
        <label for="card-title">Card<br>Title:</label>
        <input id="card-title" type="text" required="">
        <label for="card-status">Status:</label>
        <select name="card-status" id="card-status">
            
                <option value="1">new</option>
            
                <option value="2">in progress</option>
            
                <option value="3">testing</option>
            
                <option value="4">done</option>
            
        </select>
        <button type="submit">Create</button>
    </form>`
}