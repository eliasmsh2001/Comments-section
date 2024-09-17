import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { commentsActions } from "./store/store";

export default function ConfirmWindow({ open }) {
  const dialog = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }

    return () => dialog.current.close();
  }, [open]);

  function onDelete() {
    dispatch(commentsActions.onConfirmDelete());
  }
  function onCancel() {
    dispatch(commentsActions.onCancelDelete());
  }
  return createPortal(
    <dialog
      ref={dialog}
      id="modal"
      className="max-w-72 rounded-sl shadow-lg bg-transparent "
    >
      <section className="w-full h-full rounded-lg bg-[--Very-light-gray] p-5">
        <h1 className="font-semibold text-lg text-[--Dark-blue]">
          Delete comment
        </h1>
        <p className="text-xs py-3 text-[--Grayish-Blue] font-medium">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone
        </p>
        <p className="flex gap-3">
          <button
            onClick={onCancel}
            className="bg-[--Grayish-Blue] py-3 px-6 rounded-md text-xs font-semibold text-[--White]"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onDelete}
            className="bg-[--Soft-Red] py-3 px-6 rounded-md text-xs font-semibold text-[--White] "
          >
            YES, DELETE
          </button>
        </p>
      </section>
    </dialog>,
    document.getElementById("modal")
  );
}
