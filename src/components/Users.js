import React from 'react';
import { Link } from 'react-router-dom';

// 사용자 목록을 화면에 출력하는 컴포넌트
// users: Redux Store에서 전달받은 사용자 배열
const Users = ({ users }) => {
// API 응답 전에는 users가 null일 수 있음
    // 데이터가 없으면 렌더링하지 않음
    if (!users) {
        return null;
    }
    return (
        <div>
            <h2>사용자 목록</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {/* 사용자 번호를 이용해 상세 페이지 주소 생성 */}
                        <Link to={`/users/${user.id}`}>
                            {user.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Users;