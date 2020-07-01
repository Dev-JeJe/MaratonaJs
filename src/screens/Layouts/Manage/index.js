import React from 'react';

const Layout = ({children}/* prop*/) => {
    /* const {children = prop}*/
    return (
        <div className="layout">
            <nav className="navbar navbar-expnd-lg bg-primary text-light">
                <div className="container d-flex w-100 justify-content-between">
                    <div>
                        <span>BACK</span>
                    </div>
                    <div className="text-center">
                        <strong>Links</strong>
                    </div>
                    <div>
                        <span>Exit</span>
                    </div>
                </div>
            </nav>
            <div className="container">{children}</div>
        </div>
    );
};

export default Layout;