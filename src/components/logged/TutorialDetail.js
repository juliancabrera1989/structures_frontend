import React from 'react';

const TutorialDetail = ({ tutorial }) => {
    return (
        <div>
            <h2>{tutorial.title}</h2>
            <p>{tutorial.description}</p>
            <div>
                {/* Tutorial content, interactive guides, or other elements */}
            </div>
        </div>
    );
};

export default TutorialDetail;