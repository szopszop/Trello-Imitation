from flask import Flask, render_template, url_for, session, request, jsonify, redirect
from flask_socketio import SocketIO
from flask_cors import CORS
import mimetypes
import queries
import auth
import os
import psycopg2

from util import json_response
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)


mimetypes.add_type('application/javascript', '.js')
app.secret_key = '0e7481098709f45cf9c22425be8d2112150d342e7cfb0bd4'
load_dotenv()


@socketio.on('message')
def handle_msg(msg):
    socketio.send('Syncing...')


@app.route("/")
def index():
    user = queries.get_user_by_username((session.get('username')))
    return render_template('index.html', user=user)


@app.route("/api/cards/<board_id>", methods=['POST'])
@json_response
def save_card(board_id):
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        json = request.json
        title = json.get('title')
        status = json.get('status')
        queries.add_new_card(board_id, title, status)
    else:
        return 'Content-Type not supported!'


@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()


@app.route("/api/boards/<board_id>")
@json_response
def get_board(board_id):
    return queries.get_board(board_id)


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


@app.route("/api/boards/<board_id>", methods=['PUT'])
@json_response
def update_board(board_id):
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        json = request.json
        new_title = json.get('title')
        id_ = json.get('id')
        return queries.rename_board(new_title, id_)
    else:
        return 'Content-Type not supported!'


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route('/register', methods=['POST'])
def post_register_page():
    user_data = request.get_json()
    print(user_data)
    username = user_data['username']
    password_1 = user_data['password']
    password_2 = user_data['password2']
    if not queries.get_user_by_username(username):
        if password_1 == password_2:
            new_user = {'username': username,
                        'password': auth.hash_password(password_1)}
            queries.add_new_user(new_user)
            session['username'] = username
            return jsonify({'url': request.root_url}), 200
        return jsonify({'url': request.root_url}), 403
    return jsonify({'url': request.root_url}), 409


@app.route('/login', methods=['POST'])
def post_login_page():
    user_data = request.get_json()
    username = user_data['username']
    password = user_data['password']
    user = queries.get_user_by_username(username)
    if user and auth.verify_password(password, user['password']):
        session['username'] = username
        return jsonify({'url': request.root_url}), 200
    return jsonify({'url': request.root_url}), 401


@app.route('/logout', methods=['POST'])
def post_logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/api/statuses')
@json_response
def get_statuses():
    return queries.get_statuses()


def main():
    socketio.run(app, debug=True)
    # app.run(debug=True)


    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
