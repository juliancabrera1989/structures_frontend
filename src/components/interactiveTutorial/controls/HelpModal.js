import React, { useState } from "react";
import { Modal, Button, Nav, Tab, Card, Accordion } from "react-bootstrap";

const HelpModal = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState("creacion");

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="text-light">
      <Modal.Header closeButton closeVariant="white" className="bg-dark border-secondary">
        <Modal.Title className="text-info fw-bold d-flex align-items-center gap-2">
          <span>📚</span> Manual Completo del Visualizador
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light p-4">
        <Tab.Container id="help-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {/* Navegación por Pestañas */}
          <Nav variant="pills" className="nav-justified bg-body-tertiary p-1 rounded mb-4 border border-secondary">
            <Nav.Item>
              <Nav.Link eventKey="creacion" className="fw-semibold">
                1. Creación y Tipos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="operaciones" className="fw-semibold">
                2. Nodos e Índices
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="estructuras" className="fw-semibold">
                3. Reglas por Estructura
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="guardado" className="fw-semibold">
                4. Guardar en Nube
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Contenido de cada Pestaña */}
          <Tab.Content>
            
            {/* PESTAÑA 1: CREACIÓN Y TIPOS DE DATOS */}
            <Tab.Pane eventKey="creacion">
              <h5 className="text-info mb-3">Configuración Inicial</h5>
              <div className="d-flex flex-column gap-3">
                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🏷️ 1. Name (Nombre):</h6>
                    <p className="small text-secondary mb-0">
                      Asigna un identificador único a tu estructura (ej: <code>"Lista de Clientes"</code> o <code>"Pila de Deshacer"</code>). Este nombre facilitará encontrarla en tu Dashboard.
                    </p>
                  </Card.Body>
                </Card>

                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🔤 2. Data Type (Tipo de Datos):</h6>
                    <p className="small text-secondary mb-2">
                      Define qué clase de información aceptará el campo de entrada al crear cada nodo:
                    </p>
                    <ul className="small text-secondary mb-0 ps-3">
                      <li><strong className="text-warning">Numbers:</strong> Solo permite números enteros o decimales (ej: <code>10</code>, <code>42</code>, <code>-5</code>).</li>
                      <li><strong className="text-warning">Letters:</strong> Acepta un único carácter alfabético (ej: <code>'A'</code>, <code>'Z'</code>).</li>
                      <li><strong className="text-warning">Strings:</strong> Permite palabras o cadenas cortas de texto (ej: <code>"Inicio"</code>, <code>"Nodo A"</code>).</li>
                    </ul>
                  </Card.Body>
                </Card>

                <Card className="bg-body-tertiary text-light border-secondary">
                  <Card.Body>
                    <h6>🚀 3. Botón "Crear Estructura":</h6>
                    <p className="small text-secondary mb-0">
                      Limpia el lienzo actual, reinicia las referencias de memoria y prepara el selector para empezar a recibir nodos con la configuración establecida.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Tab.Pane>

            {/* PESTAÑA 2: OPERACIONES DE NODOS É ÍNDICES */}
            <Tab.Pane eventKey="operaciones">
              <h5 className="text-info mb-3">Manipulación de Nodos</h5>
              
              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">➕ Insertar Nodos</h6>
                  <ol className="small text-secondary mb-0 ps-3 d-flex flex-column gap-2">
                    <li>
                      <strong>Agregar Primer Nodo:</strong> Cuando la estructura está vacía, habilita la base e inicializa el puntero principal (<code>head</code> / <code>top</code> / <code>front</code>).
                    </li>
                    <li>
                      <strong>Agregar al Comienzo:</strong> Inserta el nuevo elemento en la primera posición y desplaza la referencia del puntero inicial.
                    </li>
                    <li>
                      <strong>Agregar al Final:</strong> Engancha el nodo al último elemento apuntado por <code>tail</code> o <code>rear</code>.
                    </li>
                  </ol>
                </div>

                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">📍 Inserción Intermedia (Uso del Selector de Índice)</h6>
                  <p className="small text-secondary mb-2">
                    Exclusivo para estructuras flexibles como <strong>Listas Enlazadas</strong>:
                  </p>
                  <ul className="small text-secondary mb-0 ps-3">
                    <li>Al haber 2 o más nodos, el desplegable <strong>"Seleccione posición"</strong> genera dinámicamente los pares de enlaces disponibles (ej: <code>Entre Nodo 0 y Nodo 1</code>).</li>
                    <li>Elige la posición deseada, ingresa el nuevo valor y presiona <strong className="text-info">Ejecutar</strong> para reasignar dinámicamente el puntero <code>next</code> del nodo anterior.</li>
                  </ul>
                </div>

                <div className="p-3 bg-body-tertiary rounded border border-secondary">
                  <h6 className="text-warning">➖ Eliminación / Desapilado (Sacar Nodos)</h6>
                  <p className="small text-secondary mb-0">
                    Dependiendo de la regla del tipo de estructura cargada, el botón de extracción borrará el nodo según la política de acceso (primer elemento, último elemento o cima).
                  </p>
                </div>
              </div>
            </Tab.Pane>

            {/* PESTAÑA 3: REGLAS POR TIPO DE ESTRUCTURA */}
            <Tab.Pane eventKey="estructuras">
              <h5 className="text-info mb-3">Comportamiento según el Tipo de Estructura</h5>
              
              <Accordion defaultActiveKey="0" flush className="border border-secondary rounded">
                <Accordion.Item eventKey="0" className="bg-body-tertiary text-light">
                  <Accordion.Header>🔗 Lista Enlazada (Linked List & Doubly Linked List)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Permite inserción libre al inicio, al final o en cualquier posición intermedia. Los punteros <code>next</code> (y <code>prev</code> en la doblemente enlazada) se dibujan y apuntan secuencialmente.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="bg-body-tertiary text-light">
                  <Accordion.Header>🥞 Pila (Stack - LIFO)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Funciona bajo el principio <strong>Last In, First Out</strong> (Último en entrar, primero en salir). Las inserciones (Push) y extracciones (Pop) solo se permiten por el extremo superior (<code>Top</code>).
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="bg-body-tertiary text-light">
                  <Accordion.Header>🚶‍♂️ Cola (Queue - FIFO)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Funciona bajo el principio <strong>First In, First Out</strong> (Primero en entrar, primero en salir). Las inserciones entran por la parte posterior (<code>Rear</code>) y las salidas se efectúan por el frente (<code>Front</code>).
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="bg-body-tertiary text-light">
                  <Accordion.Header>🔄 Doble Cola (Deque)</Accordion.Header>
                  <Accordion.Body className="small text-secondary">
                    Cola de doble extremo. Permite insertar y eliminar nodos con eficiencia $O(1)$ tanto por el frente como por el extremo final.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab.Pane>

            {/* PESTAÑA 4: GUARDADO Y SINCRONIZACIÓN */}
            <Tab.Pane eventKey="guardado">
              <h5 className="text-info mb-3">Persistencia en la Nube</h5>
              <Card className="bg-body-tertiary text-light border-secondary mb-3">
                <Card.Body>
                  <h6>☁️ Botón "Guardar en la Nube":</h6>
                  <p className="small text-secondary mb-2">
                    Una vez armada tu estructura con todos sus nodos:
                  </p>
                  <ol className="small text-secondary mb-0 ps-3">
                    <li>Asegúrate de estar autenticado con tu cuenta de usuario.</li>
                    <li>Haz clic en el botón <span className="badge bg-outline-success border border-success text-success">Guardar</span>.</li>
                    <li>El sistema capturará el nombre, tipo de estructura, tipo de datos y la secuencia exacta de nodos cargados en el lienzo.</li>
                    <li>Se enviará una petición a MongoDB para guardarla permanentemente.</li>
                    <li>Podrás reabrir, editar o eliminar esta estructura desde tu <strong>Dashboard Personal</strong> en cualquier momento.</li>
                  </ol>
                </Card.Body>
              </Card>
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="info" onClick={onHide} className="fw-bold px-4">
          ¡Entendido, ir al lienzo! 🚀
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;