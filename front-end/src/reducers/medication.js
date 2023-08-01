import {
  GET_MEDICATIONS,
  ADD_MEDICATION,
  MEDICATION_ERROR,
  UPDATE_MEDICATION,
  DELETE_MEDICATION
} from '../actions/types';

const initialState = {
  medications: [],
  medication: null,
  loading: true,
  error: {}
};

function medicationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDICATIONS:
      return {
        ...state,
        medications: payload,
        loading: false
      };
    case ADD_MEDICATION:
    case UPDATE_MEDICATION:
      return {
        ...state,
        medications: [payload, ...state.medications],
        loading: false
      };
    case DELETE_MEDICATION:
      return {
        ...state,
        medications: state.medications.filter(
          (medication) => medication._id !== payload
        ),
        loading: false
      };
    case MEDICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}

export default medicationReducer;
