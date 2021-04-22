
import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData';
import './Navbar.css'
import {IconContext} from 'react-icons'
function Navbar() {
    // Setting sidebar state to be false, when false it minimizes, if true it expands. 
    const [sidebar, setSidebar] = useState(false)

    // Function to toggle from true to false for the sidebar. 
    const showSidebar = () => setSidebar(!sidebar)

	return (
		<div>
            <IconContext.Provider value={{color: 'black'}}>
			<div className="navbar">
				<Link to={window.location.pathname} className="menu-bars">
					<FaIcons.FaBars onClick={showSidebar} />
				</Link>
			</div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
		</div>
	);
}

export default Navbar;
