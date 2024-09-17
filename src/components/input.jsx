import { useRef, useState } from "react";
import { currentUser } from "./store/data";
import { useDispatch } from "react-redux";
import { commentsActions } from "./store/store";

export default function Input({
  reply,
  comment,
  replytoReply,
  commentInput,
  replyInput,
  editting,
  commentValue,
  edittingReply,
  replyValue,
}) {
  const newCommentInput = useRef();
  const dispatch = useDispatch();
  const [commentValueState, setCommentValueState] = useState(commentValue);
  const [replyValueState, setReplyValueState] = useState(replyValue);

  let InputContent = (
    <>
      <img className="size-5" src={currentUser.avatar} alt="" />
      <textarea
        ref={newCommentInput}
        type="text"
        rows={4}
        className="w-[28rem] text-[--Dark-blue] pt-1 px-2 text-xs rounded-md border-[--Light-gray] border-2 bg-[--White] focus:border-[--Dark-blue] focus:outline-0"
      />
      <button
        onClick={handleSubmitComment}
        className="px-4 py-2 rounded-md text-[--White] text-xs bg-[--Moderate-blue] hover:opacity-55"
      >
        {commentInput ? "SEND" : "reply"}
      </button>
    </>
  );

  let inputClass =
    " max-w-[33rem] min-w-[20rem] h-28 flex items-start justify-center gap-4 bg-[--White] rounded-lg p-5  bottom-0";

  if (replytoReply) {
    inputClass =
      "w-[29.9rem] h-28 flex items-start justify-center gap-4 bg-[--White] rounded-lg p-5  bottom-0";
  }

  if (edittingReply) {
    InputContent = (
      <>
        {" "}
        <textarea
          ref={newCommentInput}
          value={replyValueState}
          onChange={handleEdittingReply}
          type="text"
          rows={4}
          className="w-full text-[--Dark-blue] pt-1 px-2 text-xs rounded-md border-[--Light-gray] border-2 bg-[--White] focus:border-[--Dark-blue] focus:outline-0 "
        />
        <button
          onClick={handleSubmitComment}
          className="px-4 py-2 rounded-md text-[--White] text-xs bg-[--Moderate-blue] hover:opacity-55 "
        >
          UPDATE
        </button>
      </>
    );
    inputClass =
      "w-[24rem]  h-28 flex flex-col items-end gap-2 justify-center  bg-[--White] rounded-lg   bottom-0";
  }
  if (editting) {
    InputContent = (
      <>
        {" "}
        <textarea
          ref={newCommentInput}
          value={commentValueState}
          onChange={handleEditting}
          type="text"
          rows={4}
          className="w-[28rem] text-[--Dark-blue] pt-1 px-2 text-xs rounded-md border-[--Light-gray] border-2 bg-[--White] focus:border-[--Dark-blue] focus:outline-0 "
        />
        <button
          onClick={handleSubmitComment}
          className="px-4 py-2 rounded-md text-[--White] text-xs bg-[--Moderate-blue] hover:opacity-55 "
        >
          UPDATE
        </button>
      </>
    );
    inputClass =
      "w-full  h-28 flex flex-col items-end gap-2 justify-center  bg-[--White] rounded-lg   bottom-0";
  }

  function handleSubmitComment() {
    if (commentInput) {
      if (newCommentInput.current.value != "") {
        dispatch(
          commentsActions.onAddNewComment({
            userName: currentUser.userName,
            avatar: currentUser.avatar,
            content: newCommentInput.current.value,
          })
        );
      }
    }
    if (replyInput) {
      if (newCommentInput.current.value != "") {
        dispatch(
          commentsActions.onAddReplyToComment({
            replyTo: comment.userName,
            commentId: comment.content,
            userName: currentUser.userName,
            avatar: currentUser.avatar,
            content: newCommentInput.current.value,
          })
        );
      }
    }
    if (replytoReply) {
      if (newCommentInput.current.value != "") {
        dispatch(
          commentsActions.onAddReplyToReply({
            replyTo: reply.userName,
            commentId: comment.content,
            replyId: reply.content,
            userName: currentUser.userName,
            avatar: currentUser.avatar,
            content: newCommentInput.current.value,
          })
        );
      }
    }
    if (editting) {
      if (newCommentInput.current.value != "") {
        dispatch(
          commentsActions.onUpdateComment({
            updatedComment: commentValueState,
            commentId: comment.content,
          })
        );
      }
    }
    if (edittingReply) {
      if (newCommentInput.current.value != "") {
        dispatch(
          commentsActions.onUpdateReply({
            updatedReply: replyValueState,
            commentId: comment.content,
            replyId: reply.content,
          })
        );
      }
    }
    newCommentInput.current.value = "";
  }

  function handleEditting() {
    setCommentValueState(newCommentInput.current.value);
  }
  function handleEdittingReply() {
    setReplyValueState(newCommentInput.current.value);
  }

  return (
    <div action="submit" className={inputClass}>
      {InputContent}
    </div>
  );
}
