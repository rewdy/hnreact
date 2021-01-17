import React from 'react';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="AppHeader">
                <h1>Hackernews</h1>
                <p>Just a lil HackerNews viewer.</p>
            </header>
        );
    }
}

export default Header;