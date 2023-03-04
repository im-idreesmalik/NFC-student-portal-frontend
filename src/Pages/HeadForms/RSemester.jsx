import { ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterSemestem from '../../Hooks/useRegisterSemester'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const RSemestem = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const { token } = useAuth()

  const [selectedValue, setSelectedValue] = useState({
    department: '',
    program: '',
    session: '',
  })

  const [formErrors, setFormErrors] = useState({
    department: null,
    program: null,
    session: null,
  })
  const [submitErrors, setSubmitErrors] = useState({
    department: true,
    program: true,
    session: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSession, setEnableSession] = useState(false)

  const {
    isError: isDepartmentError,
    isLoading: areDepartmentsLoading,
    data: departmentsData,
  } = useQuery('departments', () => getDepartments(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isProgramsError,
    isLoading: areProgramsLoading,
    data: programsData,
  } = useQuery(
    ['programs', selectedValue.department],
    () => getPrograms(selectedValue.department),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms,
    },
  )

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery(
    ['sessions', selectedValue.department, selectedValue.program],
    () => getSessions(selectedValue.department, selectedValue.program),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession,
    },
  )

  const inputHandleChange = (key, keyName) => {
    setSelectedValue(prev => ({
      ...prev,
      [key]: keyName,
    }))
    if (key == 'department') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        program: true,
        session: true,
      }))
    } else if (key == 'prgram') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        session: true,
      }))
    } else {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
      }))
    }
  }

  const [startYear, setStartYear] = useState(moment())

  const dateStartHandeler = newValue => {
    setStartYear(newValue)
  }

  const [endYear, setEndYear] = useState(moment())

  const dateEndHandeler = newValue => {
    setEndYear(newValue)
  }

  const { submitForm } = useRegisterSemestem()

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Semestem 1',
            'Semestem 2',
            'Semestem 3',
            'Semestem 4',
            'Semestem 5',
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  const formikOptions = {
    initialValues: {
      semestem_title: '',
      type: '',
      starting: '',
      ending: '',
      department: '',
      program: '',
      session: '',
    },
    validationSchema: Yup.object().shape({
      semestem_title: Yup.string().required('Semestem Title is required'),
      type: Yup.string().required('Semestem Type is required'),
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      setFormErrors(() => ({
        department: submitErrors.department,
        program: submitErrors.program,
        session: submitErrors.session,
      }))
      submitForm(values, selectedValue, startYear.toDate(), endYear.toDate(), {
        setErrors,
        setStatus,
        setSubmitting,
      })
    },
  }

  return (
    <Formik {...formikOptions}>
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container flexWrap='nowrap'>
            <Grid item flexGrow={1}>
              <Grid container direction='column' width='100%'>
                <Grid item width='100%'>
                  <Typography variant='h4'>Register Semestem</Typography>
                  <Typography gutterBottom>
                    Enter the Semestem details
                  </Typography>
                </Grid>
                <Grid item width='100%'>
                  <Grid container width='100%'>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={
                          !!errors.semestem_title && !!touched.semestem_title
                        }
                      >
                        <InputLabel>Semestem Title</InputLabel>
                        <Select
                          labelId='semestem_title'
                          id='semestem_title'
                          value={values.semestem_title}
                          label='Semestem Title'
                          required
                          onChange={handleChange('semestem_title')}
                        >
                          <MenuItem value={'1'}>1</MenuItem>
                          <MenuItem value={'2'}>2</MenuItem>
                          <MenuItem value={'3'}>3</MenuItem>
                          <MenuItem value={'4'}>4</MenuItem>
                          <MenuItem value={'5'}>5</MenuItem>
                          <MenuItem value={'6'}>6</MenuItem>
                          <MenuItem value={'7'}>7</MenuItem>
                          <MenuItem value={'8'}>8</MenuItem>
                          <MenuItem value={'9'}>9</MenuItem>
                          <MenuItem value={'10'}>10</MenuItem>
                        </Select>
                        {!!errors.semestem_title &&
                          !!touched.semestem_title && (
                            <FormHelperText error>
                              {errors.semestem_title}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!errors.type && !!touched.type}
                      >
                        <InputLabel>Semestem Type</InputLabel>
                        <Select
                          labelId='type'
                          id='type'
                          value={values.type}
                          label='Semestem Type'
                          required
                          onChange={handleChange('type')}
                        >
                          <MenuItem value={'normal'}>Normal</MenuItem>
                          <MenuItem value={'summer'}>Summer</MenuItem>
                        </Select>
                        {!!errors.type && !!touched.type && (
                          <FormHelperText error>{errors.type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <MobileDatePicker
                        label='Starting Year'
                        inputFormat='MM/DD/YYYY'
                        value={startYear}
                        onChange={dateStartHandeler}
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <MobileDatePicker
                        label='Ending Year'
                        inputFormat='MM/DD/YYYY'
                        value={endYear}
                        onChange={dateEndHandeler}
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={
                          !!formErrors.department && !!submitErrors.department
                        }
                      >
                        <InputLabel>Department</InputLabel>
                        <Select
                          labelId='department'
                          id='department'
                          value={selectedValue.department}
                          label='Departments'
                          disabled={isDepartmentError || areDepartmentsLoading}
                          required
                          onChange={e => {
                            inputHandleChange('department', e.target.value)
                            setEnablePrograms(true)
                          }}
                        >
                          {departmentsData?.map(d => (
                            <MenuItem value={d._id} key={d._id}>
                              {d.department_name}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.department && (
                          <FormHelperText error>
                            {!!submitErrors.department &&
                              'Department is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!formErrors.program && submitErrors.program}
                      >
                        <InputLabel>Program</InputLabel>
                        <Select
                          labelId='programs'
                          id='programs'
                          value={selectedValue.program}
                          label='Program'
                          required
                          disabled={
                            areProgramsLoading ||
                            isProgramsError ||
                            !enablePrograms
                          }
                          onChange={e => {
                            inputHandleChange('program', e.target.value)
                            setEnableSession(true)
                          }}
                        >
                          {programsData?.map(p => (
                            <MenuItem key={p._id} value={p._id}>
                              {p.program_abbreviation}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.program && (
                          <FormHelperText error>
                            {!!submitErrors.program && 'Program is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!formErrors.session && submitErrors.session}
                      >
                        <InputLabel>Session</InputLabel>
                        <Select
                          labelId='session'
                          id='session'
                          value={selectedValue.session}
                          label='Session'
                          required
                          disabled={
                            isSessionsError ||
                            areSessionsLoading ||
                            !enablePrograms ||
                            !enableSession
                          }
                          onChange={e => {
                            inputHandleChange('session', e.target.value)
                          }}
                        >
                          {sessionsData?.map(s => (
                            <MenuItem key={s._id} value={s._id}>
                              {s.session_title}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.session && (
                          <FormHelperText error>
                            {!!submitErrors.session && 'Seesion is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ margin: '.5em .5em .5em 0' }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                height='100%'
                onClick={() => setShowDrawer(prev => !prev)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    writingMode: 'vertical-rl',
                  }}
                >
                  Show Semestems
                </Typography>
                <ArrowForwardIos htmlColor={theme.palette.warning.main} />
              </Stack>
            </Grid>
            {drawer}
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default RSemestem
