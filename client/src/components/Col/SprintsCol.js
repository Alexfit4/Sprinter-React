import React from "react";

const SprintsCol = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";
    
    return (
        <div className={`col${className}`}>
            {children}
        </div>
    );
};

export default SprintsCol;