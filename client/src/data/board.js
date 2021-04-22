import axios from 'axios';
import {
    ITEM_TYPE,
    MOVE_CARD,

    DELETE_CARD,

} from './types';

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
    try {
        const body = JSON.stringify(formData);

        const res = await axios.patch(`/api/cards/move/${cardId}`, body, config);

        dispatch({
            type: MOVE_CARD,
            payload: res.data,
        });

        dispatch(getActivity());
    } catch (err) {
        dispatch({
            type: BOARD_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};