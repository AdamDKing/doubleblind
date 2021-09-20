import React from 'react';

interface ForwardButtonProps {
  styleclass: string;
  onclick: () => void;
  stop?: boolean;
}
/** Forward button used in Dblnd phases
 *
 * @param props class for style, onclick function, boolean for forwardstop
 * @returns react forward button component
 */
export function ForwardButton(props: ForwardButtonProps): JSX.Element {
  return (
    <>
      <button
        className={'forwardbutton ' + props.styleclass}
        onClick={props.onclick}
        disabled={props.stop}
      >Next phase &gt;</button>
      {props.stop ? <div className="forwardstop"></div> : '' }
    </>
  );
}
