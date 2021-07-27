import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPicture } from "../actions/user.actions";
import { IoImagesOutline } from "react-icons/io5";

function UploadImage({ uid }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    e.preventDefault();
    if (file === null) {
      alert("mettez une photo avant d'envoyer");
    } else {
      const data = new FormData();
      data.append("file", file);
      data.append("userId", uid);

      dispatch(uploadPicture(data, uid));
    }
  };

  return (
    <>
      <div className="icone-upload">
        <form action="" onSubmit={handlePicture}>
          <label>
            <IoImagesOutline size="1.5rem" color="fff" cursor="pointer" />
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name="file"
              accept={[".JPG", ".JPEG", ".PNG"]}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </form>
      </div>
      {file && (
        <button className="btn-upload" type="submit" onClick={handlePicture}>
          Envoyer
        </button>
      )}
    </>
  );
}

export default UploadImage;
