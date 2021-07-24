import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "./AppContext";
import {
  IoEllipsisVerticalCircleOutline,
  IoCloseOutline,
  IoTrashBin,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../actions/post.actions";

function EditDeleteComment({ comment, postId }) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <>
      <div className="edit-comment">
        {isAuthor && edit === false && (
          <span onClick={() => setEdit(!edit)}>
            <IoEllipsisVerticalCircleOutline
              size="2rem"
              color="#4f259e"
              style={{ cursor: "pointer" }}
            />
          </span>
        )}
        {isAuthor && edit && (
          <form action="" onSubmit={handleEdit} className="edit-comment-form">
            <label htmlFor="text" onClick={() => setEdit(!edit)}>
              <IoCloseOutline
                size="2rem"
                color="#4f259e"
                cursor="pointer"
                title="Annuler"
              />
            </label>
            <br />
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.text}
            />
            <button type="submit" title="Validez la modification">
              valider
            </button>
            <div className="delete-btn">
              <span
                onClick={() => {
                  if (
                    window.confirm("Voulez-vous supprimez ce commentaire ?")
                  ) {
                    handleDelete();
                  }
                }}
              >
                <IoTrashBin
                  size="1.5rem"
                  color="#4f259e"
                  cursor="pointer"
                  title="Supprimez le commentaire"
                />
              </span>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default EditDeleteComment;
