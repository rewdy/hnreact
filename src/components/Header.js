import React from 'react';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="AppHeader">
                <h1>Hackernews <span role="img" aria-label="Christmas tree">🎄</span></h1>
                <p>Just a react-based HackerNews viewer.</p>
            </header>
        );
    }
}

export default Header;