import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import { currentUser } from "./store/data";
import { useDispatch } from "react-redux";
import { commentsActions } from "./store/store";
import Input from "./input";

export default function Replies({ reply, comment }) {
  const dispatch = useDispatch();
  const tagName = `@${reply.replyingTo} `;
  let inputContent = (
    <p className="text-[--Grayish-Blue] font-semibold">
      <span className="text-[--Moderate-blue] font-bold">{tagName}</span>{" "}
      {reply.content}
    </p>
  );

  if (reply.isEditting) {
    inputContent = (
      <Input
        edittingReply={reply.isEditting}
        replyValue={reply.content}
        comment={comment}
        reply={reply}
      />
    );
  }

  let replyAction = (
    <button
      className="  flex items-center gap-1 font-bold text-[--Moderate-blue]"
      onClick={handleReply}
    >
      <img src={replyIcon} alt="" />
      Reply
    </button>
  );

  if (reply.userName === currentUser.userName) {
    replyAction = (
      <div className="flex gap-3">
        <button
          className="  flex items-center gap-1 font-bold text-[--Soft-Red] "
          onClick={handleDelete}
        >
          <img className="size-2" src={deleteIcon} alt="" />
          Delete
        </button>
        <button
          className=" flex items-center gap-1 font-bold text-[--Moderate-blue]"
          onClick={handleEdit}
        >
          <img className="size-2" src={editIcon} alt="" />
          Edit
        </button>
      </div>
    );
  }

  function handleDelete() {
    dispatch(
      commentsActions.onDeleteReply({
        comment: comment.content,
        reply: reply.content,
      })
    );
  }

  function handleReply() {
    dispatch(
      commentsActions.onReplyToReply({
        comment: comment.content,
        reply: reply.content,
      })
    );
  }

  function scoreHandeler(vote) {
    if (vote === "upVote") {
      dispatch(
        commentsActions.onUpVoteReply({
          comment: comment.content,
          reply: reply.content,
        })
      );
    }
    if (vote === "downVote") {
      dispatch(
        commentsActions.onDownVoteReply({
          comment: comment.content,
          reply: reply.content,
        })
      );
    }
  }

  function handleEdit() {
    dispatch(
      commentsActions.onEditReply({
        comment: comment.content,
        reply: reply.content,
      })
    );
  }

  return (
    <>
      <li className="flex w-full bg-[--White] text-[.7rem] pr-8 py-4 rounded-md">
        <div className="flex flex-col bg-[--Light-gray] h-16 mx-3  min-w-8 rounded-lg items-center justify-between">
          <button
            onClick={() => scoreHandeler("upVote")}
            className="w-full min-h-5 flex items-center justify-center"
          >
            <img src={plusIcon} alt="" />
          </button>
          <h1 className="text-xs text-[--Moderate-blue] font-bold">
            {reply.score}
          </h1>
          <button
            onClick={() => scoreHandeler("downVote")}
            className="w-full min-h-5 flex items-center justify-center"
          >
            <img src={minusIcon} alt="" />
          </button>
        </div>
        <div className="">
          <div className="w-full flex items-center mb-2 gap-2 relative justify-between">
            <div className="flex gap-2 items-center">
              <img className="size-5 " src={reply.avatar} alt="" />
              <h1 className="text-[--Dark-blue] font-bold">{reply.userName}</h1>
              <h2 className="text-[--Grayish-Blue] font-semibold">
                {reply.createdAt}
              </h2>
            </div>
            {replyAction}
          </div>
          {inputContent}
        </div>
      </li>
      {reply.replyInput && (
        <li>
          <Input reply={reply} replytoReply comment={comment} />
        </li>
      )}
    </>
  );
}
