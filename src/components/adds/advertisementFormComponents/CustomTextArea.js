import "overlayscrollbars/styles/overlayscrollbars.css";

function CustomTextArea({ formData, handleChange }) {
  return (
    <div className="form-input" id="description-container">
      <textarea
        id="description"
        name="description"
        value={formData.description}
        placeholder="Think about description"
        onChange={handleChange}
        style={{
          // overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          resize: "none",
          height: "200px",
        }}
      />
    </div>
  );
}

export default CustomTextArea;
