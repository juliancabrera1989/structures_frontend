import React, { useState } from "react";
import { Modal, Button, Nav, Tab, Card, Accordion } from "react-bootstrap";

const HelpModal = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState("creacion");

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="text-light">
      <Modal.Header closeButton closeVariant="white" className="bg-dark border-secondary">
        <Modal.Title className="text-info fw-bold d-flex align-items-center gap-2">
          <span>📚</span> Visualizer Complete Manual
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light p-4">
        <Tab.Container id="help-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {/* Navigation Tabs */}
          <Nav variant="pills" className="nav-justified bg-body-tertiary p-1 rounded mb-4 border border-secondary">
            <Nav.Item>
              <Nav.Link eventKey="creacion" className="fw-semibold">
                1. Creation & Types
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="operaciones" className="fw-semibold">
                2. Nodes & Indexes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="estructuras" className="fw-semibold">
                3. Structure Rules
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="guardado" className="fw-semibold">
                4. Save to Cloud
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Tab Content */}
          <Tab.Content>
            
            {/* TAB 1: CREATION & DATA TYPES */}
            <Tab.Pane eventKey="creacion">
              <h5 className="text-info mb-3">Initial Configuration</h5>
              <div className="d-flex flex-column gap-3">
                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🏷️ 1. Name:</h6>
                    <p className="small text-secondary mb-0">
                      Assign a unique identifier to your structure (e.g., <code>"Customer List"</code> or <code>"Undo Stack"</code>). This name will make it easy to find in your Dashboard.
                    </p>
                  </Card.Body>
                </Card>

                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🔤 2. Data Type:</h6>
                    <p className="small text-secondary mb-2">
                      Defines what kind of information the input field will accept when creating each node:
                    </p>
                    <ul className="small text-secondary mb-0 ps-3">
                      <li><strong className="text-warning">Numbers:</strong> Only allows integers or decimals (e.g., <code>10</code>, <code>42</code>, <code>-5</code>).</li>
                      <li><strong className="text-warning">Letters:</strong> Accepts a single alphabetic character (e.g., <code>'A'</code>, <code>'Z'</code>).</li>
                      <li><strong className="text-warning">Strings:</strong> Allows words or short text strings (e.g., <code>"Start"</code>, <code>"Node A"</code>).</li>
                    </ul>
                  </Card.Body>
                </Card>

                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🚀 3. "Create Structure" Button:</h6>
                    <p className="small text-secondary mb-0">
                      Clears the current canvas, resets memory references, and prepares the selector to start accepting nodes with the established configuration.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Tab.Pane>

            {/* TAB 2: NODE OPERATIONS & INDICES */}
            <Tab.Pane eventKey="operaciones">
              <h5 className="text-info mb-3">Node Manipulation</h5>
              
              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">➕ Insert Nodes</h6>
                  <ol className="small text-secondary mb-0 ps-3 d-flex flex-column gap-2">
                    <li>
                      <strong>Add First Node:</strong> When the structure is empty, enables the base and initializes the main pointer (<code>head</code> / <code>top</code> / <code>front</code>).
                    </li>
                    <li>
                      <strong>Add to Start:</strong> Inserts the new element at the first position and shifts the initial pointer reference.
                    </li>
                    <li>
                      <strong>Add to End:</strong> Hooks the node to the last element pointed to by <code>tail</code> or <code>rear</code>.
                    </li>
                  </ol>
                </div>

                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">📍 Intermediate Insertion (Index Selector Usage)</h6>
                  <p className="small text-secondary mb-2">
                    Exclusive to flexible structures like <strong>Linked Lists</strong>:
                  </p>
                  <ul className="small text-secondary mb-0 ps-3">
                    <li>When there are 2 or more nodes, the <strong>"Select position"</strong> dropdown dynamically generates available link pairs (e.g., <code>Between Node 0 and Node 1</code>).</li>
                    <li>Choose the desired position, enter the new value, and press <strong className="text-info">Execute</strong> to dynamically reassign the previous node's <code>next</code> pointer.</li>
                  </ul>
                </div>

                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">➖ Deletion / Popping (Remove Nodes)</h6>
                  <p className="small text-secondary mb-0">
                    Depending on the loaded structure type rule, the removal button will delete the node according to its access policy (first element, last element, or top).
                  </p>
                </div>
              </div>
            </Tab.Pane>

            {/* TAB 3: RULES BY STRUCTURE TYPE */}
            <Tab.Pane eventKey="estructuras">
              <h5 className="text-info mb-3">Behavior by Structure Type</h5>
              
              <Accordion defaultActiveKey="0" flush className="border border-secondary rounded">
                <Accordion.Item eventKey="0" className="bg-body-tertiary text-light">
                  <Accordion.Header>🔗 Linked List (Singly & Doubly Linked List)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Allows free insertion at the beginning, end, or any intermediate position. The <code>next</code> pointers (and <code>prev</code> in doubly linked) are drawn and point sequentially.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="bg-body-tertiary text-light">
                  <Accordion.Header>🥞 Stack (LIFO)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Operates under the <strong>Last In, First Out</strong> principle. Insertions (Push) and removals (Pop) are only allowed from the top end (<code>Top</code>).
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="bg-body-tertiary text-light">
                  <Accordion.Header>🚶‍♂️ Queue (FIFO)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Operates under the <strong>First In, First Out</strong> principle. Insertions enter from the rear (<code>Rear</code>) and removals take place from the front (<code>Front</code>).
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="bg-body-tertiary text-light">
                  <Accordion.Header>🔄 Double-Ended Queue (Deque)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Double-ended queue. Allows inserting and deleting nodes with O(1) efficiency from both the front and rear ends.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab.Pane>

            {/* TAB 4: SAVE & SYNC */}
            <Tab.Pane eventKey="guardado">
              <h5 className="text-info mb-3">Cloud Persistence</h5>
              <Card className="bg-body-tertiary text-light border-secondary mb-3">
                <Card.Body>
                  <h6>☁️ "Save to Cloud" Button:</h6>
                  <p className="small text-secondary mb-2">
                    Once your structure is built with all its nodes:
                  </p>
                  <ol className="small text-secondary mb-0 ps-3">
                    <li>Make sure you are authenticated with your user account.</li>
                    <li>Click the <span className="badge bg-outline-success border border-success text-success">Save</span> button.</li>
                    <li>The system will capture the name, structure type, data type, and exact sequence of nodes loaded on the canvas.</li>
                    <li>A request will be sent to MongoDB to save it permanently.</li>
                    <li>You can reopen, edit, or delete this structure from your <strong>Personal Dashboard</strong> at any time.</li>
                  </ol>
                </Card.Body>
              </Card>
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="info" onClick={onHide} className="fw-bold px-4">
          Got it, take me to canvas! 🚀
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;