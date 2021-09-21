import React from 'react';

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
      {/* <nav>
        <ul>
          <li className="linkli">
            <a>
            home
            </a>
          </li>
          <li className="linkli">
            <a>
            guide
            </a>
          </li>
          <li className="linkli">
            <a>
            about
            </a>
          </li>
        </ul>
      </nav> */}
    </header>);
}
