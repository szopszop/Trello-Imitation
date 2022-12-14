export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}`);
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet(`/api/statuses`);
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    addNewCard: async function (boardId, cardText, status) {
        return await apiPost(`/api/cards/${boardId}`, {'id': boardId, 'title': cardText, 'status': status})
    },
    createNewBoard: async function (boardTitle) {
       return await apiPost("/api/boards", boardTitle)
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    renameBoard: async function (boardTitle, boardId){
        return await apiPut(`/api/boards/${boardId}`, {'title': boardTitle, 'id': boardId})
    },
    deleteBoard: async function (boardId){
        return await apiDelete(`/api/boards/${boardId}`, {'id': boardId})
    },
    deleteCard: async function (cardId){
        return await apiDelete(`/api/cards/${cardId}`, {'id': cardId})
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'payload': payload, 'id': payload.id, 'title': payload.title, 'status': payload.status})
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url, payload) {
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'id': payload.id})
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'title': payload.title, 'id': payload.id})
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPatch(url) {
}
