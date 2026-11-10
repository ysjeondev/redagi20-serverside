import axios from 'axios';

// 1. 액션 타입 정의
const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

// 2. 액션 생성 함수
const getUsersPending = () => ({
    type: GET_USERS_PENDING
});
const getUsersSuccess = payload => ({
    type: GET_USERS_SUCCESS,
    payload
});
const getUsersFailure = error => ({
    type: GET_USERS_FAILURE,
    payload: error,
    error: true
});

// 3. Redux Thunk 비동기 액션
export const getUsers = () => async dispatch => {
    dispatch(getUsersPending());
    try {
        // JSONPlaceholder 사용자 목록 요청
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        // 요청 성공 시 Redux Store 업데이트
        dispatch(getUsersSuccess(response.data));
    } catch (error) {
        // 요청 실패 시 에러 저장
        dispatch(getUsersFailure(error));
    }
};

// 4. 초기 상태
const initialState = {
    users: null,
    loading: false,
    error: null
};

// 5. 리듀서
export default function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
