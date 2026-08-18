import React, { useState } from "react";

const CreateStructureForm = () => {
  const [structureName, setStructureName] = useState("");
  const [structureType, setStructureType] = useState("linkedlist");
  const [dataType, setDataType] = useState("number");

  // no submit handler — the actual "initialize" button lives in ElementManager
  return (
    <form style={{ marginBottom: "1rem" }}>
      <div>
        <label>Name your Data Structure: </label>
        <input
          type="text"
          value={structureName}
          onChange={(e) => setStructureName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Choose Structure Type: </label>
        <select
          value={structureType}
          onChange={(e) => setStructureType(e.target.value)}
        >
          <option value="linkedlist">Linked List</option>
          <option value="doublylinkedlist">Doubly Linked List</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="deque">Double-Ended Queue</option>
        </select>
      </div>

      <div>
        <label>Choose Data Type: </label>
        <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option value="number">Numbers</option>
          <option value="letter">Letters</option>
          <option value="string">Strings</option>
        </select>
      </div>

      {/* no initialize button here — it is the vanilla controller's job */}
    </form>
  );
};

export default CreateStructureForm;
