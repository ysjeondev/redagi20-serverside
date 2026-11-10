import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul>
            <li>
                <Link to="/red">Red</Link>
            </li>
            
            <li>
                <Link to="/blue">Blue</Link>
            </li>

           {/* 사용자 목록 페이지 이동 */}
            <li>
                <Link to="/users">Users</Link>
            </li>
        </ul>
    );
};
export default Menu;