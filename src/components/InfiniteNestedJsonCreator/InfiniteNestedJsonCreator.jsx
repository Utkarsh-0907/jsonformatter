import React, { useState } from "react";
import "./styles/InfiniteNestedJsonCreator.css";

const generateUniqueId = () =>
  `id_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;

const RecursiveJsonItem = ({
  item,
  onAddChild,
  onRemove,
  onEdit,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState(item.key);
  const [editValue, setEditValue] = useState(item.value);
  const [localKey, setLocalKey] = useState("");
  const [localValue, setLocalValue] = useState("");

  const handleAddChild = () => {
    if (!localKey || !localValue) {
      alert("Please enter both key and value");
      return;
    }
    onAddChild(item.id, {
      id: generateUniqueId(),
      key: localKey,
      value: localValue,
      children: [],
    });
    setLocalKey("");
    setLocalValue("");
  };

  const handleEdit = () => {
    if (!editKey || !editValue) {
      alert("Please enter both key and value");
      return;
    }
    onEdit(item.id, editKey, editValue);
    setIsEditing(false);
  };

  return (
    <div className={`nested-item depth-${depth}`}>
      <div className="nested-item-header">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editKey}
              onChange={(e) => setEditKey(e.target.value)}
              placeholder="Edit Key"
            />
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Edit Value"
            />
            <button onClick={handleEdit} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="nested-item-title">
              {item.key}: {item.value}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="toggle-btn"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onRemove(item.id)} className="remove-btn">
              Remove
            </button>
          </>
        )}
      </div>
      {isExpanded && !isEditing && (
        <div className="nested-item-content">
          <div className="child-inputs">
            <input
              type="text"
              placeholder="Child Key"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Child Value"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
            />
            <button onClick={handleAddChild} className="add-btn">
              Add Child
            </button>
          </div>
          {item.children.map((child) => (
            <RecursiveJsonItem
              key={child.id}
              item={child}
              onAddChild={onAddChild}
              onRemove={onRemove}
              onEdit={onEdit}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const InfiniteNestedJsonCreator = () => {
  const [jsonData, setJsonData] = useState([]);
  const [currentKey, setCurrentKey] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [preview, setPreview] = useState("");

  const addTopLevelItem = () => {
    if (!currentKey || !currentValue) {
      alert("Please enter both key and value");
      return;
    }
    setJsonData((prev) => [
      ...prev,
      {
        id: generateUniqueId(),
        key: currentKey,
        value: currentValue,
        children: [],
      },
    ]);
    setCurrentKey("");
    setCurrentValue("");
  };

  const addChildRecursively = (parentId, newChild) => {
    const updateChildren = (items) =>
      items.map((item) =>
        item.id === parentId
          ? { ...item, children: [...item.children, newChild] }
          : { ...item, children: updateChildren(item.children) }
      );
    setJsonData((prev) => updateChildren(prev));
  };

  const removeItemRecursively = (itemId) => {
    const filterItems = (items) =>
      items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          ...item,
          children: filterItems(item.children),
        }));
    setJsonData((prev) => filterItems(prev));
  };

  const editItemRecursively = (itemId, newKey, newValue) => {
    const updateItems = (items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, key: newKey, value: newValue }
          : { ...item, children: updateItems(item.children) }
      );
    setJsonData((prev) => updateItems(prev));
  };

  const createJsonPreview = () => setPreview(JSON.stringify(jsonData, null, 2));

  return (
    <div className="json-creator-container">
      <div className="top-level-inputs">
        <input
          type="text"
          placeholder="Key"
          value={currentKey}
          onChange={(e) => setCurrentKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        <button onClick={addTopLevelItem} className="add-top-btn">
          Add Top-Level Item
        </button>
      </div>
      <div className="nested-items">
        {jsonData.map((item) => (
          <RecursiveJsonItem
            key={item.id}
            item={item}
            onAddChild={addChildRecursively}
            onRemove={removeItemRecursively}
            onEdit={editItemRecursively}
          />
        ))}
      </div>
      <button onClick={createJsonPreview} className="create-json-btn">
        Create JSON
      </button>
      {preview && <pre className="json-preview">{preview}</pre>}
    </div>
  );
};

export default InfiniteNestedJsonCreator;
