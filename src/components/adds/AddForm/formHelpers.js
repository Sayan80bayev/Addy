export const validateImages = (files = []) => {
  const validImageExtensions = [".jpg", ".jpeg", ".png"];
  return files.filter((file) => {
    if (!file.type || file.type === "") {
      file.type = "image/png"; // Note: Default to PNG if type is empty
    }

    const extension = file.name.toLowerCase().slice(-4);
    return (
      validImageExtensions.includes(extension) && file.type.startsWith("image/")
    );
  });
};
export const validateFormChanges = (
  isFormChanged,
  isEditing,
  emptyFields,
  setErrorMessage
) => {
  if (!isFormChanged && isEditing) {
    setErrorMessage("No changes made to the form.");
    return false;
  }
  if (emptyFields.length > 0) {
    setErrorMessage(`Please fill out all required fields`);
    return false;
  }
  return true;
};
