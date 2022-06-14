import data_manager


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
        SET title = (%(new_title)s)
        WHERE id = %(board_id)s;
        """, {"new_title": title,
              "board_id": id_})
