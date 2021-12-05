import React from 'react';
import "./style.css"

const Spinner = () => {
    return (
        <div className="flex h-screen">
            <div className="orbit-spinner m-auto">
                <div className="orbit"/>
                <div className="orbit"/>
                <div className="orbit"/>
            </div>
        </div>
    );
};

export default Spinner;