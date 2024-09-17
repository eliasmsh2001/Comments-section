import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import Replies from "./replies";
import { useDispatch } from "react-redux";
import { commentsActions } from "./store/store";
import { currentUser } from "./store/data";
import Input from "./input";

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  let content = (
    <p className="text-[--Grayish-Blue] font-semibold ">{comment.content}</p>
  );

  let commentAction = (
    <button
      className="  flex items-center gap-1 font-bold text-[--Moderate-blue]"
      onClick={handleReply}
    >
      <img src={replyIcon} alt="" />
      Reply
    </button>
  );

  if (comment.userName === currentUser.userName) {
    commentAction = (
      <div className="flex gap-3">
        <button
          className="  flex items-center gap-1 font-bold text-[--Soft-Red]"
          onClick={() => handleDelete(comment.content)}
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

  if (comment.isEditting) {
    content = (
      <Input
        editting={comment.isEditting}
        commentValue={comment.content}
        comment={comment}
      />
    );
  }

  function handleDelete(comment) {
    dispatch(commentsActions.onDeleteComment(comment));
  }

  function scoreHandeler(vote) {
    if (vote === "upVote") {
      dispatch(commentsActions.onUpVote(comment.content));
    }
    if (vote === "downVote") {
      dispatch(commentsActions.onDownVote(comment.content));
    }
  }

  function handleReply() {
    dispatch(commentsActions.onReplyToComment(comment.content));
  }

  function handleEdit() {
    dispatch(commentsActions.onEdit(comment.content));
  }
  return (
    <>
      <li className="flex w-full bg-[--White] text-[.7rem] pr-8 py-4 rounded-md">
        <div className="flex flex-col bg-[--Light-gray] h-16 mx-3 min-w-8 max-w-8 rounded-lg items-center justify-between">
          <button
            onClick={() => scoreHandeler("upVote")}
            className="w-full min-h-5 flex items-center justify-center"
          >
            <img src={plusIcon} alt="" />
          </button>
          <h1 className="text-xs text-[--Moderate-blue] font-bold">
            {comment.score}
          </h1>
          <button
            onClick={() => scoreHandeler("downVote")}
            className="w-full min-h-5 flex items-center justify-center"
          >
            <img src={minusIcon} alt="" />
          </button>
        </div>
        <div className="w-full">
          <div className="w-full flex items-center mb-2 justify-between">
            <div className="flex gap-2 items-center">
              <img className="size-5 " src={comment.avatar} alt="" />
              <h1 className="text-[--Dark-blue] font-bold">
                {comment.userName}
              </h1>
              <h2 className="text-[--Grayish-Blue] font-semibold">
                {comment.createdAt}
              </h2>
            </div>
            {commentAction}
          </div>
          {content}
        </div>
      </li>
      {comment.replyInput && (
        <li>
          <Input replyInput comment={comment} />
        </li>
      )}

      {comment.replies.length > 0 && (
        <div className="flex">
          <span className="min-h-full w-1 bg-[--Grayish-Blue] opacity-10  mx-7  mt-4"></span>
          <ul className="flex flex-col gap-2">
            {comment.replies.map((item) => {
              return <Replies key={item.id} reply={item} comment={comment} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
}
