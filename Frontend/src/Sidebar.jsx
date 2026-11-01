import "./Sidebar.css";

function Sidebar(){
    return (
        <section className="sidebar">
            {/* new chat button */}
            <button>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

            {/* history */}
            <ul className="history">
                <li>thread 1</li>
                <li>thread 2 </li>
                <li>thread 3</li>
            </ul>

            {/* sign */}
            <div className="sign">
                <p>By G Sree Charan &hearts; </p>
            </div>
        </section>
    )
}

export default Sidebar;
