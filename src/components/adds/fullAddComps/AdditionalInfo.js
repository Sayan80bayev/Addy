import React from "react";
import AuthorSection from "./AuthorSection";
import SimilarsSection from "./SimilarsSection";
export const AdditionalInfo = ({ props }) => {
  const { userData, add, similars, email, handleDelete, id } = props;
  return (
    <div className="ctn-additional">
      <AuthorSection props={{ userData, id, email, add, handleDelete }} />
      {similars != null && similars.length > 0 && (
        <SimilarsSection similars={similars} add={add} />
      )}
    </div>
  );
};
