from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
from util import json_response

import queires

app = Flask(__name__)



@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()


@app.route("/api/board/<boardId>")
@json_response
def get_board(boardId):
    print(queries.get_board(boardId))
    return queries.get_board(boardId)


@app.route("/api/boards", methods=['POST'])
@json_response
def add_board():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        json = request.json
        title = json.get('payload')
        return queries.add_board(title)
    else:
        return 'Content-Type not supported!'


@app.route("/api/boards", methods=['PUT'])
@app.route("/api/boards")
@app.route("/get-boards")
@json_response
def update_board():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        json = request.json
        new_title = json.get('payload')
        id_ = json.get('id')
        return queries.rename_board(new_title, id_)
    else:
        return 'Content-Type not supported!'


@app.route("/api/boards/<int:board_id>/cards/")
    return queires.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
