import { useSelector } from "react-redux";
import "./App.css";
import Comment from "./components/comment";
import Input from "./components/input";
import ConfirmWindow from "./components/confirmWindow";

function App() {
  const comments = useSelector((state) => state.comments);
  const messageIsShow = useSelector((state) => state.message.isShown);

  return (
    <>
      <section className="w-screen max-h-[75vh]  flex flex-col items-center justify-center mt-5   ">
        <ul className="max-w-[35rem] h-full p-3 overflow-auto flex flex-col gap-3">
          {comments.map((item) => {
            return <Comment key={item.id} comment={item} />;
          })}
        </ul>
      </section>
      <section className="w-screen flex justify-center items-center fixed bottom-0">
        <Input commentInput />
      </section>
      <ConfirmWindow open={messageIsShow} />
    </>
  );
}

export default App;
