import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Users from '../components/Users';
import { getUsers } from '../modules/users';

// 서버 사이드 렌더링에서 API 요청을 미리 처리할 컴포넌트
import { Preloader } from '../lib/PreloadContext';

// =====================================================
// UsersContainer 컴포넌트
// =====================================================
// users    : Redux Store에 저장된 사용자 목록
// getUsers : 사용자 목록을 가져오는 Redux Thunk 함수
// =====================================================
const UsersContainer = ({ users, getUsers }) => {
    // =================================================
    // 1. 클라이언트에서 사용자 목록 가져오기
    // =================================================
    // 브라우저에서 컴포넌트가 마운트되면 실행된다.
    //
    // 서버 사이드 렌더링에서는 useEffect가 실행되지 않는다.
    // =================================================
    useEffect(() => {
    // 이미 사용자 데이터가 있으면 API 재요청 방지
        if (users) {
            return;
        }
    // 사용자 목록 API 요청
        getUsers();
    }, [getUsers, users]);
    
    // =================================================
    // 2. 화면 렌더링
    // =================================================
    return (
        <>
            {/* 실제 사용자 목록을 보여주는 컴포넌트 */}
            <Users users={users} />
            {/* =========================================
                서버 사이드 렌더링용 Preloader
                서버에서는 getUsers()를 실행하여
                Promise를 PreloadContext에 등록한다.
                브라우저에서는 Context가 null이므로
                별도의 API 요청을 실행하지 않는다.
               ========================================= */}
            <Preloader resolve={getUsers} />
        </>
    );
};

// =====================================================
// 3. Redux Store와 컴포넌트 연결
// =====================================================
export default connect(
    state => ({
        users: state.users.users
    }),
    {
        getUsers
    }
)(UsersContainer);
