import React, { useState } from 'react';
import StructureList from '../components/logged/StructureList';
import StructureVisualizer from '../components/logged/StructureVisualizer';

const StructureOverview = () => {
    const [selectedStructure, setSelectedStructure] = useState(null);

    const structures = [
        { name: 'Linked List', elements: [1, 2, 3] },
        { name: 'Stack', elements: [4, 5, 6] },
    ];

    return (
        <div>
            <h1>Structure Overview</h1>
            <StructureList 
                structures={structures} 
                onSelect={setSelectedStructure} 
            />
            {selectedStructure && (
                <StructureVisualizer structure={selectedStructure} />
            )}
        </div>
    );
};

export default StructureOverview;
