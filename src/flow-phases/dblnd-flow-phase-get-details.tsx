import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {phaseContext} from '../App';
import {BackButton} from '../shared-components/back-button';
import {DblndFlowPhaseArrangeWorkspace} from './dblnd-flow-phase-arrange-workspace';
import {generateDblnd} from '../dblnd-maths';
import {PHASES} from '../enums';
import {ForwardButton} from '../shared-components/forward-button';
import {getPhaseTsxContent} from '../phase-tsx-content';
import {PillContainers} from '../shared-components/pill-containers';

interface DblndFlowPhaseGetDetailsProps {
}

interface FormValues {
  nameOfExperiment: string;
  controlCount: number;
  treatmentCount: number;
  pillContainerSize: number;
}

// eslint-disable-next-line require-jsdoc
function AutoSubmit(props:any): any {
  const formik = useFormikContext();
  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);
  return <div></div>;
}

/** Get Details Phase Component, form inputs to design experiment
 *
 * @param props empty props
 * @return TSX fragments
 */
export function DblndFlowPhaseGetDetails(props: DblndFlowPhaseGetDetailsProps): JSX.Element {
  const {next, back} = useContext(phaseContext);
  const [pcSize, setPcSize] = useState(7);
  const [numTreatment, setNumTreatment] = useState(7);
  const [numControl, setNumControl] = useState(7);
  const [validated, setValidated] = useState(false);

  return (
    <>
      <BackButton onclick={back} styleclass='experimenterstyle'
        backguard='Going back will lose form progress, are you sure?' />
      <div className="frame experimenterstyle">
        {getPhaseTsxContent(PHASES.GET_DETAILS)}
        <Formik
          initialValues={{
            nameOfExperiment: 'My Experiment',
            controlCount: 7,
            treatmentCount: 7,
            pillContainerSize: 7,
          }}
          validate={(values: FormValues) => {
            const errors: any = {};
            if (values.controlCount > 0 && values.controlCount < 101) {
              setNumControl(values.controlCount);
            } else if (values.controlCount <= 0) {
              errors.controlCount = 'Positive number required';
            } else {
              errors.controlCount = 'Values over 100 not allowed';
            }
            if (values.treatmentCount > 0 && values.treatmentCount < 101) {
              setNumTreatment(values.treatmentCount);
            } else if (values.treatmentCount <= 0) {
              errors.treatmentCount = 'Positive number required';
            } else {
              errors.treatmentCount = 'Values over 100 not allowed';
            }
            if (values.pillContainerSize > 0 && values.pillContainerSize < 32) {
              setPcSize(values.pillContainerSize);
            } else if (values.pillContainerSize <= 0) {
              errors.pillContainerSize = 'Positive number required';
            } else {
              errors.pillContainerSize = 'Values over 31 not allowed';
            }
            if (Object.keys(errors).length > 0) {
              setValidated(false);
            }
            return errors;
          }}
          validateOnChange={true}
          onSubmit={(
              values: FormValues,
              {setSubmitting}: FormikHelpers<FormValues>,
          ) => {
            setValidated(true);
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form>
              <AutoSubmit />
              <label htmlFor="nameOfExperiment"><span>Name of Experiment</span>
                <Field id="nameOfExperiment" name="nameOfExperiment" />
                <ErrorMessage name="nameOfExperiment" component="div" className="formerror" />
              </label>
              <label htmlFor="controlCount"><span>Number of Control Pills</span>
                <Field id="controlCount" name="controlCount"
                  type="number" />
                <ErrorMessage name="controlCount" component="div" className="formerror" />
              </label>
              <label htmlFor="treatmentCount"><span>Number of Treatment Pills</span>
                <Field id="treatmentCount" name="treatmentCount"
                  type="number" />
                <ErrorMessage name="treatmentCount" component="div" className="formerror" />
              </label>
              <label htmlFor="pillContainerSize"><span>Size of Pill Containers</span>
                <Field id="pillContainerSize" name="pillContainerSize"
                  type="number" />
                <ErrorMessage name="pillContainerSize" component="div" className="formerror" />
              </label>
              <div className="formsubmit">
                <span>Valid:{validated ? '✔️' : '❌'}</span>
              </div>
            </Form>
          )}
        </Formik>
        <h3>Example Diagram</h3>
        <PillContainers containerSize={pcSize} size={numTreatment + numControl} />
      </div>

      <ForwardButton styleclass='experimenterstyle' onclick={() => {
        validated ?
          next(<DblndFlowPhaseArrangeWorkspace
            dblnd={generateDblnd(numControl, numTreatment)}
            pcSize={pcSize}/>) :
          alert('not validated');
      }} />
    </>
  );
}
