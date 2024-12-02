import React, { useState } from "react";

const JsonItemForm = ({
  onSubmit,
  initialKey = "",
  initialValue = "",
  submitButtonText = "Add Item",
  placeholderKey = "Key",
  placeholderValue = "Value",
}) => {
  const [localKey, setLocalKey] = useState(initialKey);
  const [localValue, setLocalValue] = useState(initialValue);

  const handleSubmit = () => {
    if (!localKey || !localValue) {
      alert("Please enter both key and value");
      return;
    }

    onSubmit({
      key: localKey,
      value: localValue,
    });

    setLocalKey("");
    setLocalValue("");
  };

  return (
    <div className="json-item-form">
      <input
        type="text"
        placeholder={placeholderKey}
        value={localKey}
        onChange={(e) => setLocalKey(e.target.value)}
      />
      <input
        type="text"
        placeholder={placeholderValue}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className={`add-btn ${
          submitButtonText === "Add Child" ? "add-child-btn" : "add-top-btn"
        }`}
      >
        {submitButtonText}
      </button>
    </div>
  );
};

export default JsonItemForm;
