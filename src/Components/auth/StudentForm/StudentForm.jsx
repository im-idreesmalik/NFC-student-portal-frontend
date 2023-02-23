import { Stack, Step, StepButton, Stepper } from '@mui/material'
import { motion } from 'framer-motion'
import { useRef } from 'react'

import useStepper from '../../../Hooks/useStepper'
import useStudentRegisterPage from '../../../Hooks/useStudentRegisterForm'

import StudentForm1 from './StudentFormStep1'
import StudentForm2 from './StudentFormStep2'
import StudentForm3 from './StudentFormStep3'

const StudentForm = ({ animation }) => {
  const firstTimeAnimation = useRef(true)
  const { handleComplete, handleReset, handleBack, steps, activeStep } =
    useStepper(firstTimeAnimation)
  const {
    department,
    gender,
    setDepartment,
    setGender,
    programRef,
    rollNoRef,
    sectionRef,
    sessionRef,
    nameRef,
    phoneNoRef,
    confirmRef,
    passwordRef,
    email,
    sendRequest,
    error,
  } = useStudentRegisterPage()

  return (
    <Stack
      key='Student'
      component={motion.div}
      variants={animation}
      initial='initial'
      animate='animate'
      exit='exit'
      width='100%'
      alignItems='center'
    >
      <Stepper activeStep={activeStep} sx={{ margin: '1.5em 0', width: '90%' }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color='inherit' />
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <StudentForm1
          reset={handleReset}
          handleNext={handleComplete}
          animation={firstTimeAnimation.current && animation}
          programRef={programRef}
          rollNoRef={rollNoRef}
          sectionRef={sectionRef}
          sessionRef={sessionRef}
        />
      )}
      {activeStep === 1 && (
        <StudentForm2
          handleNext={handleComplete}
          handleBack={handleBack}
          department={department}
          setDepartment={setDepartment}
          gender={gender}
          setGender={setGender}
          nameRef={nameRef}
          phoneNoRef={phoneNoRef}
        />
      )}

      {activeStep === 2 && (
        <StudentForm3
          handleBack={handleBack}
          confirmRef={confirmRef}
          passwordRef={passwordRef}
          email={email}
          sendRequest={sendRequest}
          finalError={error}
        />
      )}
    </Stack>
  )
}

export default StudentForm
