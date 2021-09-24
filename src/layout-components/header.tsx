import React from 'react';
import {NavLink} from 'react-router-dom';

interface HeaderProps {

}

/** The header, contains logo and navigation at top of screen
 *
 * @param props empty props
 * @returns header TSX
 */
export function Header(props: HeaderProps) {
  return (
    <header>
      <div className="logo unselectable">
        double<span>blind</span>.me
      </div>
      <nav>
        <label htmlFor="navtoggle" className="navtogglelabel unselectable">nav↕️</label>
        <input id="navtoggle" className="navtoggle" type="checkbox"/>
        <ul>
          <li className="linkli">
            <NavLink exact to="/" className="navlink" activeClassName="active">home</NavLink>
          </li>
          <li className="linkli">
            <NavLink to="/guide" className="navlink" activeClassName="active">
              guide</NavLink>
          </li>
          <li className="linkli">
            <NavLink to="/about" className="navlink" activeClassName="active">about</NavLink>
          </li>
        </ul>

      </nav>
    </header>);
}
