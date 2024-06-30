import React, { useEffect, useRef } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";

function CustomTextArea({ formData, handleChange }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: "os-theme-dark", // Example theme
        textarea: {
          dynWidth: true, // Automatically adjust width
        },
        scrollbars: {
          autoHide: "leave", // or "move", "scroll"
        },
        overflow: {
          x: "hidden",
          y: "visible",
        },
      }}
    >
      <textarea
        className="form-input"
        id="description"
        name="description"
        value={formData.description}
        placeholder="Think about description"
        onChange={handleChange}
        style={{
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          resize: "none",
          height: "200px",
        }}
      />
    </OverlayScrollbarsComponent>
  );
}

export default CustomTextArea;
