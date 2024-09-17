import React, { useState } from 'react';

const ElementManager = ({ dataStructure, onAdd, onRemove }) => {
    const [element, setElement] = useState('');

    const handleAdd = () => {
        onAdd(element);
        setElement('');
    };

    const handleRemove = () => {
        onRemove(element);
        setElement('');
    };

    return (
        <div>
            <h3>Manage Elements</h3>
            <input 
                type="text" 
                value={element} 
                onChange={(e) => setElement(e.target.value)} 
            />
            <button onClick={handleAdd}>Add Element</button>
            <button onClick={handleRemove}>Remove Element</button>
        </div>
    );
};

export default ElementManager;