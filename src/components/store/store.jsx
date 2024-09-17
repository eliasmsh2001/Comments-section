import { configureStore, createSlice } from "@reduxjs/toolkit";
import { comments } from "../store/data";

const commentsSlicer = createSlice({
  name: "comments",
  initialState: {
    comments,
    message: { isShown: false, target: undefined },
    commentIndex: undefined,
    replyIndex: undefined,
  },
  reducers: {
    onAddNewComment(state, action) {
      const newComment = action.payload;
      state.comments.push({
        id: newComment.userName,
        userName: newComment.userName,
        avatar: newComment.avatar,
        content: newComment.content,
        createdAt: "Just now",
        score: 0,
        replies: [],
        replyInput: false,
        isEditting: false,
      });
    },
    onUpVote(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId
      );
      state.comments[commentIndex].score++;
    },
    onDownVote(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId
      );
      state.comments[commentIndex].score--;
    },
    onUpVoteReply(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId.comment
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === commentId.reply
      );
      state.comments[commentIndex].replies[replyIndex].score++;
    },
    onDownVoteReply(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId.comment
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === commentId.reply
      );
      state.comments[commentIndex].replies[replyIndex].score--;
    },
    onConfirmDelete(state) {
      if (state.message.target === "comment") {
        state.comments.splice(state.commentIndex, 1);
      } else if (state.message.target === "reply") {
        state.comments[state.commentIndex].replies.splice(state.replyIndex, 1);
      }
      state.message.isShown = false;
      state.message.target = undefined;
      state.commentIndex = null;
      state.replyIndex = null;
    },
    onCancelDelete(state) {
      state.message.isShown = false;
      state.message.target = undefined;
      state.commentIndex = null;
      state.replyIndex = null;
    },

    onDeleteComment(state, action) {
      const commentId = action.payload;
      state.message.isShown = true;
      state.message.target = "comment";
      state.commentIndex = state.comments.findIndex(
        (item) => item.content === commentId
      );
    },
    onDeleteReply(state, action) {
      const commentId = action.payload;
      state.message.isShown = true;
      state.message.target = "reply";
      state.commentIndex = state.comments.findIndex(
        (item) => item.content === commentId.comment
      );
      state.replyIndex = state.comments[state.commentIndex].replies.findIndex(
        (item) => item.content === commentId.reply
      );
    },
    onReplyToComment(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId
      );
      state.comments[commentIndex].replyInput =
        !state.comments[commentIndex].replyInput;
    },
    onReplyToReply(state, action) {
      const commentId = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === commentId.comment
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === commentId.reply
      );
      state.comments[commentIndex].replies[replyIndex].replyInput =
        !state.comments[commentIndex].replies[replyIndex].replyInput;
    },
    onAddReplyToComment(state, action) {
      const newReply = action.payload;
      console.log(newReply);
      const commentIndex = state.comments.findIndex(
        (item) => item.content === newReply.commentId
      );
      state.comments[commentIndex].replies.push({
        id: newReply.userName,
        userName: newReply.userName,
        avatar: newReply.avatar,
        content: newReply.content,
        createdAt: "Just now",
        score: 0,
        replies: [],
        replyInput: false,
        isEditting: false,
        replyingTo: newReply.replyTo,
      });
      state.comments[commentIndex].replyInput =
        !state.comments[commentIndex].replyInput;
    },
    onAddReplyToReply(state, action) {
      const data = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === data.commentId
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === data.replyId
      );
      console.log(data);
      state.comments[commentIndex].replies.push({
        id: data.userName,
        userName: data.userName,
        avatar: data.avatar,
        content: data.content,
        createdAt: "Just now",
        score: 0,
        replies: [],
        replyInput: false,
        isEditting: false,
        replyingTo: data.replyTo,
      });
      state.comments[commentIndex].replies[replyIndex].replyInput =
        !state.comments[commentIndex].replies[replyIndex].replyInput;
    },
    onEdit(state, action) {
      const data = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === data
      );
      state.comments[commentIndex].isEditting =
        !state.comments[commentIndex].isEditting;
    },
    onUpdateComment(state, action) {
      const data = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === data.commentId
      );
      state.comments[commentIndex].content = data.updatedComment;
      state.comments[commentIndex].isEditting =
        !state.comments[commentIndex].isEditting;
    },
    onEditReply(state, action) {
      const data = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === data.comment
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === data.reply
      );
      state.comments[commentIndex].replies[replyIndex].isEditting =
        !state.comments[commentIndex].replies[replyIndex].isEditting;
    },
    onUpdateReply(state, action) {
      const data = action.payload;
      const commentIndex = state.comments.findIndex(
        (item) => item.content === data.commentId
      );
      const replyIndex = state.comments[commentIndex].replies.findIndex(
        (item) => item.content === data.replyId
      );
      state.comments[commentIndex].replies[replyIndex].content =
        data.updatedReply;
      state.comments[commentIndex].replies[replyIndex].isEditting =
        !state.comments[commentIndex].replies[replyIndex].isEditting;
    },
  },
});

const store = configureStore({
  reducer: commentsSlicer.reducer,
});

export default store;
export const commentsActions = commentsSlicer.actions;
