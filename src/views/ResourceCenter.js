import React from "react";
import DocumentationList from "../components/resourceCenter/DocumentationList";
import VideoTutorialList from "../components/resourceCenter/VideoTutorialList";
import ExternalResourceList from "../components/resourceCenter/ExternalResourceList";

const ResourceCenter = () => {
  return (
    <div className="container mt-5 text-light">
      <div className="border-bottom border-secondary pb-3 mb-5 text-center">
        <h2 className="fw-bold text-info">Resources Center</h2>
        <p className="text-secondary mb-0">
          Learn theorical foundations, real applications within compilers/graphs and support tutorials.
        </p>
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">📘 Theory guides & documentation</h4>
        <DocumentationList />
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">🎥 Videotutorials</h4>
        <VideoTutorialList />
      </div>

      <div className="mb-5">
        <h4 className="mb-3 text-warning">🌍 Official documentation & external resources</h4>
        <ExternalResourceList />
      </div>
    </div>
  );
};

export default ResourceCenter;