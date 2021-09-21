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

    </header>);
}
