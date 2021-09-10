import React, {useState} from 'react';
interface BackButtonProps {
  styleclass: string;
  onclick: () => void;
  backguard?: string;
}
/** Back button used in Dblnd phases
 *
 * @param props class for style, onclick function, a string message to guard the back button
 * @returns react back button component, with optional backguard
 */
export function BackButton(props: BackButtonProps): JSX.Element {
  const [backguardHidden, setBackguardHidden] = useState(!props.backguard);
  return (
    <>
      <button
        className={'backbutton ' + props.styleclass}
        onClick={props.onclick}
      >Prior phase &lt;</button>
      <div className="backguard" hidden={backguardHidden}
        onClick={(e) => {
          alert(props.backguard);
          e.stopPropagation();
          setBackguardHidden(true);
        }}
      >
        <div hidden={backguardHidden}></div>
      </div>
      <div className="backguardMessage">{props.backguard}</div>
    </>
  );
}
