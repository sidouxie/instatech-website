import React from "react";
import { useDispatch } from "react-redux";
import { IoTrash } from "react-icons/io5";
import { deletePost } from "../actions/post.actions";

function DeleteCard(props) {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
          console.log(props.id);
        }
      }}
    >
      <IoTrash size="2rem" color="#b289ff" cursor="pointer" />
    </div>
  );
}

export default DeleteCard;
