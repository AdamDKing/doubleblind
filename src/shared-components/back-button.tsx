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
  const [guardMsgHidden, setGuardMsgHidden] = useState(true);
  const guardMsgTimeout = () => {
    setTimeout(() => {
      setGuardMsgHidden(true);
    }, 5000);
  };
  return (
    <>
      <button
        className={'backbutton ' + props.styleclass}
        onClick={props.onclick}
      >Prior phase &lt;
        <div className="guardMessage" hidden={guardMsgHidden}>{props.backguard}</div>
      </button>
      <div className="backguard" hidden={backguardHidden}
        onClick={(e) => {
          e.stopPropagation();
          setBackguardHidden(true);
          setGuardMsgHidden(false);
          guardMsgTimeout();
        }}
      >
      </div>

    </>
  );
}
