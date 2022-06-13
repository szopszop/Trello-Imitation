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


@app.route("/", methods=["POST"])
def index_post_board():
    title = request.form['title']
    new_board = queries.add_board(title)
    """
    This is a one-pager which shows all the boards and cards
    """
    boards = queries.get_boards
    return render_template('index.html')


@app.route("/api/boards")
@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


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
