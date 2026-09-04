// import React from "react";
// import { ListGroup, Badge } from "react-bootstrap";

// const resources = [
//   { id: 1, title: "MDN Data Structures", link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects" },
//   { id: 2, title: "GeeksForGeeks Linked Lists", link: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
// ];

// const ExternalResourceList = () => {
//   return (
//     <ListGroup>
//       {resources.map((res) => (
//         <ListGroup.Item
//           key={res.id}
//           className="d-flex justify-content-between align-items-center"
//         >
//           <a href={res.link} target="_blank" rel="noopener noreferrer">
//             {res.title}
//           </a>
//           <Badge bg="info">External</Badge>
//         </ListGroup.Item>
//       ))}
//     </ListGroup>
//   );
// };

// export default ExternalResourceList;


import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import resourcesData from "../../data/resourcesData.json";

const ExternalResourceList = () => {
  return (
    <ListGroup>
      {resourcesData.external.map((res) => (
        <ListGroup.Item
          key={res.id}
          className="d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
        >
          <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-info text-decoration-none fw-semibold">
            {res.title} ↗
          </a>
          <Badge bg="outline-info" className="border border-info text-info">{res.badge}</Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ExternalResourceList;