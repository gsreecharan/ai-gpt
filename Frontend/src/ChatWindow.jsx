import { useContext, useState } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext.jsx";
import { CircleLoader } from "react-spinners";

function ChatWindow() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "https://ai-gpt-backend.onrender.com";
  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    setAllThreads,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setPrompt("");
    setNewChat(false);
    setLoading(true);

    setPrevChats((prev) => [
      ...(prev || []),
      { role: "user", content: userMessage },
    ]);

    const options = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(`${API_URL}/api/chat`, options);
      const res = await response.json();

      if (res && res.reply) {
        setReply(res.reply);

        setPrevChats((prev) => [
          ...(prev || []),
          { role: "assistant", content: res.reply },
        ]);

        const threadList = await fetch(`${API_URL}/api/thread`);
        const listData = await threadList.json();
        if (Array.isArray(listData)) {
          setAllThreads(
            listData.map((t) => ({
              threadId: t.threadId,
              title: t.title || "Untitled Chat",
            }))
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          AI GPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </div>
        </div>
      )}

      <Chat />

      <CircleLoader color="#fff" loading={loading} />

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask Anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          AI GPT can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;