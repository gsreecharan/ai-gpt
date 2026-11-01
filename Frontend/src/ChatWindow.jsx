import "./ChatWindow.css";
import Chat from "./Chat"
function ChatWindow() {
    return(
        <div className="chatWindow">
            <div className="navbar">
                <span>AI GPT <i class="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                    <span><i class="fa-solid fa-user"></i></span>
                </div>
            </div>
            <Chat></Chat>

            <div className="chatInput">
                <div className="userInput">
                    <input placeholder="Ask Anything">
                    </input>
                    <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    AI GPT can make mistakes. Check Important Info.See Cookie Preferences.
                </p>
            </div>
        </div>
        
    )
}

export default ChatWindow;