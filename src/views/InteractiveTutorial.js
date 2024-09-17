import React, { useState } from 'react';
import CreateStructureForm from '../components/logged/CreateStructureForm';
import VisualizationTool from '../components/logged/VisualizationTool';
import ElementManager from '../components/logged/ElementManager';
import SaveStructureButton from '../components/logged/SaveStructureButton';

const InteractiveTutorial = () => {
    const [dataStructure, setDataStructure] = useState([]);

    const handleCreate = (name) => {
        // Logic to create a new structure
        console.log(`Created structure: ${name}`);
    };

    const handleAddElement = (element) => {
        setDataStructure([...dataStructure, element]);
    };

    const handleRemoveElement = (element) => {
        setDataStructure(dataStructure.filter(el => el !== element));
    };

    const handleSave = () => {
        // Logic to save the structure
        console.log('Structure saved:', dataStructure);
    };

    return (
        <div>
            <h1>Interactive Tutorial</h1>
            <CreateStructureForm onCreate={handleCreate} />
            <VisualizationTool dataStructure={dataStructure} />
            <ElementManager 
                dataStructure={dataStructure} 
                onAdd={handleAddElement} 
                onRemove={handleRemoveElement} 
            />
            <SaveStructureButton onSave={handleSave} />
        </div>
    );
};

export default InteractiveTutorial;