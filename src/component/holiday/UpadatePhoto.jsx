import React, { useCallback, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FaImage, FaTrash } from "react-icons/fa";

const UpadatePhoto = ({ handleImageAddApiCall, imageLoader }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    handleImageAddApiCall(imageFile);
    setSelectedImage(URL.createObjectURL(imageFile));
  }, []);

  const deleteImage = () => {
    setSelectedImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      {selectedImage ? (
        imageLoader ? (
          <Spinner animation="border" role="status" size="md" />
        ) : (
          <div className="image_setting ">
            <img src={selectedImage} alt="Selected" className="selectedImage" />
            <button onClick={deleteImage} className="delete-image">
              <FaTrash className="delete-icon" /> Delete image
            </button>
          </div>
        )
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="select-image ">
            <FaImage className="faimage" /> Select Image
          </p>
        </div>
      )}
    </div>
  );
};

export default UpadatePhoto;
