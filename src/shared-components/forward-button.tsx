import React from 'react';

interface ForwardButtonProps {
  styleclass: string;
  onclick: () => void;
}
/** Forward button used in Dblnd phases
 *
 * @param props class for style, onclick function
 * @returns react forward button component
 */
export function ForwardButton(props: ForwardButtonProps): JSX.Element {
  return (
    <button
      className={'forwardbutton ' + props.styleclass}
      onClick={props.onclick}
    >Next phase &gt;</button>
  );
}
