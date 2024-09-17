import React, { useState } from 'react';

const CreateStructureForm = ({ onCreate }) => {
    const [structureName, setStructureName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(structureName);
        setStructureName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name your Data Structure:</label>
                <input 
                    type="text" 
                    value={structureName} 
                    onChange={(e) => setStructureName(e.target.value)} 
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateStructureForm;