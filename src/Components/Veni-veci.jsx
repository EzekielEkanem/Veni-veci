import React, { useState } from 'react';

const Veniveci = ({ onSubmit }) => {
    return (
        <div>
            <button type="submit" className="discover-button" onClick={onSubmit}>
                🔀 Discover!
            </button>
        </div>
    )
}

export default Veniveci