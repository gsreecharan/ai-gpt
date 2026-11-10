import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply(null);
      return;
    }

    const words = reply.split(" ");
    let idx = 0;
    setLatestReply("");

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= words.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && (
        <h1 style={{ marginTop: "12rem", color: "#888", textAlign: "center" }}>
          What can I help with today?
        </h1>
      )}
      <div className="chats">
        {prevChats?.map((chat, idx) => {
          const isLatestAssistant =
            idx === prevChats.length - 1 &&
            chat.role === "assistant" &&
            latestReply !== null;

          return (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {isLatestAssistant ? latestReply : chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Chat;