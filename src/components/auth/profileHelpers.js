export const validateNewPasswordHelper = ({ formData, setMessage }) => {
  const { password, newPassword, confirmPassword } = formData;

  const allFieldsFilled = password && newPassword && confirmPassword;
  const allFieldsEmpty = !password && !newPassword && !confirmPassword;

  if (!allFieldsFilled && !allFieldsEmpty) {
    setMessage({ value: "Please fill all the gaps to change the password" });
    return false;
  }

  if (allFieldsEmpty) {
    return true;
  }

  if (newPassword !== confirmPassword) {
    setMessage({ value: "Passwords do not match" });
    return false;
  }

  if (newPassword.length < 8) {
    setMessage({ value: "Password must be at least 8 characters long" });
    return false;
  }

  return true;
};

export const prepareFormDataHelper = async ({
  formData,
  imageUrl,
  avatarUpdated,
  newPassword,
}) => {
  const updatedFormData = {
    ...formData,
    newPassword: newPassword,
  };
  const formDataToSend = new FormData();
  const userDataBlob = new Blob([JSON.stringify(updatedFormData)], {
    type: "application/json",
  });

  formDataToSend.append("user", userDataBlob);
  if (imageUrl && avatarUpdated) {
    const blob = await fetch(imageUrl).then((res) => res.blob());
    formDataToSend.append("avatar", blob, "avatar.png");
  } else {
    formDataToSend.append("avatar", new Blob());
  }

  return formDataToSend;
};
