import React from 'react';

const StructureList = ({ structures, onSelect }) => {
    return (
        <div>
            <h2>Available Structures</h2>
            <ul>
                {structures.map((structure, index) => (
                    <li key={index}>
                        <button onClick={() => onSelect(structure)}>
                            {structure.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StructureList;