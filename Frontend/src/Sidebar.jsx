import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);
    const API_URL = import.meta.env.VITE_BACKEND_URL || "https://ai-gpt-backend.onrender.com";
    const getAllThreads = async () => {
        try {
            const response = await fetch(`${API_URL}/api/thread`);
            const res = await response.json();
            if (Array.isArray(res)) {
                const filteredData = res.map(thread => ({
                    threadId: thread.threadId,
                    title: thread.title
                }));
                setAllThreads(filteredData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`${API_URL}/api/thread/${newThreadId}`);
            const res = await response.json();
            if (Array.isArray(res)) {
                setPrevChats(res);
                setNewChat(false);
                setReply(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${API_URL}/api/thread/${threadId}`, {
                method: "DELETE",
            });
            const res = await response.json();

            // Updated Threads Re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="sidebar">
            {/* new chat button */}
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

            {/* history */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li 
                            key={idx} 
                            onClick={() => changeThread(thread.threadId)} 
                            className={thread.threadId === currThreadId ? "highlighted" : ""}
                        >
                            <span>{thread.title}</span>
                            <i 
                                className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); // Fixed spelling: stopPropagation
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>

            {/* sign */}
            <div className="sign">
                <p>By G Sree Charan &hearts; </p>
            </div>
        </section>
    );
}

export default Sidebar;