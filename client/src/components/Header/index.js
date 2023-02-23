import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="">
          <h1>JJAMMs(T)ack</h1> 
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>          <button
            type="button"
            className=""><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span onClick={logout} className="relative text-white">Click to Logout</span>
            </span>
            </a>
          </button><br></br>
              {/* <Link to="/profile">Me</Link> */}

              {/* <button onClick={logout}>
                Logout
              </button> */}

              {/* <a href="Home" onClick={logout}>

              </a> */}
            </>
          ) : (
            <><button
            type="button"
            className=""><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white"><Link to="/login">Login</Link></span>
            </span>
            </a>
          </button>
          <button
            type="button"
            className=""><a href="#_" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white"><Link to="/Signup">Sign Up</Link></span>
            </span>
            </a>
          </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
