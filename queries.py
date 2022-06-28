import data_manager
from data import database_common

def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_board(board_id):
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE id = %(board_id)s
        ;
        """, {"board_id": board_id}, fetchall=False
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_board(title):
    data_manager.execute_dml_statement(
        """
        INSERT INTO boards(title)
        VALUES (%(new_title)s);
        """, {"new_title": title})


def rename_board(title, id_):
    data_manager.execute_dml_statement(
        """
        UPDATE boards
        SET title = %(new_title)s
        WHERE id = %(board_id)s;
        """, {"new_title": title,
              "board_id": id_})


@database_common.connection_handler
def get_user_by_username(cursor, username):
    query = """SELECT *
        FROM users
        WHERE username = %(username)s
        """
    cursor.execute(query, {'username': username})
    return cursor.fetchone()


@database_common.connection_handler
def add_new_user(cursor, new_user):
    query = """INSERT INTO users(username, password)
            VALUES(%(username)s, %(password)s)
            """
    cursor.execute(query, {'username': new_user['username'], 'password': new_user['password']})