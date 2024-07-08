import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ImagesInput = ({ props }) => {
  const {
    handleImageChange,
    handleImageDelete,
    images = [],
    imageIconPath,
    setImages,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result) => {
    setIsDragging(false);

    if (!result.destination) {
      return;
    }

    const reorderedImages = reorder(
      images,
      result.source.index,
      result.destination.index
    );
    setImages(reorderedImages);
  };

  return (
    <div className="mb-3">
      <h6>
        <label htmlFor="image">Images*</label>
      </h6>
      <div className="image-selector">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="image-upload">
          <i className="fas fa-plus"></i>
          <img className="rec_icon" src={imageIconPath} alt="Addy" />
        </label>
        {images.length > 0 && (
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="selected-images"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {images.map((image, index) => (
                    <Draggable
                      key={index}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="img-ctn"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleImageDelete(image)}
                        >
                          <img
                            className="img"
                            src={image.src ?? URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                          />
                          {!isDragging && (
                            <div className="delete_overlay">
                              <img
                                className="delete_icon"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/plus-svgrepo-com (1).png"
                                }
                                alt="Delete"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default ImagesInput;
