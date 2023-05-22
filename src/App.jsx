import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import HeadDashboard from './Pages/HeadPages/HeadDashboard'
import HeadSearchOptions from './Pages/HeadPages/HeadSearchOptions'
import RDepartment from './Pages/HeadPages/RDepartment'
import RProgram from './Pages/HeadPages/RProgram'
import RSection from './Pages/HeadPages/RSection'
import RSemester from './Pages/HeadPages/RSemester'
import RSession from './Pages/HeadPages/RSession'
import RSubject from './Pages/HeadPages/RSubject'
import RTeachers from './Pages/HeadPages/RTeachers'
import RTeachersInSubject from './Pages/HeadPages/RTeachersInSubject'
import SearchStudent from './Pages/HeadPages/SearchStudent'
import SearchedStudentAttendance from './Pages/HeadPages/SearchedStudentAtteadance'
import UpdateStudent from './Pages/HeadPages/UpdateStudent'
import AuthLayout from './Pages/Layouts/AuthLayout'
import DashboardLayout from './Pages/Layouts/DashboardLayout'
import MarkAttandence from './Pages/MarkAttandence/MarkAttandence'
import ChildsAttendance from './Pages/Parent-Home/ChildsAttendance'
import ParentOption from './Pages/Parent-Home/ParentOptions'
import ParentHome from './Pages/Parent-Home/Parent_Home'
import ResultSheets from './Pages/ResultSheets/ResultSheets'
import ScannerAttendance from './Pages/ScannerAttendance/ScannerAttendence'
import PreviousSheets from './Pages/Sheets/PreviousSheets'
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance'
import Certificate from './Pages/StudentCertificate/Certificate'
import StudentCertificate from './Pages/StudentCertificate/StudentCertificate'
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard'
import StudentDetailProgress from './Pages/StudentProgress/StudentDetailProgress'
import StudentProgress from './Pages/StudentProgress/StudentProgress'
import TeacherDashboard from './Pages/TeacherDashboard/TeacherDashboard'
import ClassResult from './Pages/TeacherForms/ClassResult'

import AuthProvider from './Contexts/AuthContext'

const App = () => {
  // #dcdfca
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#70231d',
      },
      secondary: {
        main: '#4a4a4a',
      },
      background: {
        default: '#ffffff',
      },
    },
  })

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CssBaseline />
              <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path='/' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Route>

                {/* Dashboard Routes */}
                <Route element={<DashboardLayout />}>
                  {/* Student Routes */}
                  <Route path='/student/home' element={<StudentDashboard />} />
                  <Route
                    path='/student/attendance'
                    element={<StudentAttendance />}
                  />
                  <Route
                    path='/student/progress'
                    element={<StudentProgress />}
                  />
                  <Route
                    path='/student/detail-progress'
                    element={<StudentDetailProgress />}
                  />
                  <Route
                    path='/student/certificate'
                    element={<StudentCertificate />}
                  />
                  <Route
                    path='/student/certificate'
                    element={<Certificate />}
                  />
                  <Route
                    path='/student/scanner'
                    element={<ScannerAttendance />}
                  />

                  {/* Admin Routes */}
                  <Route path='/head/dashboard' element={<HeadDashboard />} />
                  <Route path='/head/register/section' element={<RSection />} />
                  <Route
                    path='/head/register/department'
                    element={<RDepartment />}
                  />
                  <Route path='/head/register/subject' element={<RSubject />} />
                  <Route
                    path='/head/register/teacher'
                    element={<RTeachersInSubject />}
                  />
                  <Route path='/head/register/program' element={<RProgram />} />
                  <Route path='/head/register/session' element={<RSession />} />
                  <Route
                    path='/head/register/semester'
                    element={<RSemester />}
                  />
                  <Route
                    path='/head/register/teachers'
                    element={<RTeachers />}
                  />
                  <Route
                    path='/head/search/students'
                    element={<SearchStudent />}
                  />
                  <Route
                    path='/head/search/:studentId'
                    element={<HeadSearchOptions />}
                  />
                  <Route
                    path='/head/search/:studentId/attendance'
                    element={<SearchedStudentAttendance />}
                  />
                  <Route
                    path='/head/search/:studentId/update'
                    element={<UpdateStudent />}
                  />

                  {/* Parent Routes */}
                  <Route path='/parent/home' element={<ParentHome />} />
                  <Route
                    path='/parent/home/:studentId'
                    element={<ParentOption />}
                  />
                  <Route
                    path='/parent/home/:studentId/attendance'
                    element={<ChildsAttendance />}
                  />

                  {/* Teacher Routes */}
                  <Route
                    path='/teacher/result-form'
                    element={<ClassResult />}
                  />
                  <Route path='/teacher/home' element={<TeacherDashboard />} />
                  <Route
                    path='/teacher/mark-attandence'
                    element={<MarkAttandence />}
                  />
                  <Route path='/teacher/sheets' element={<PreviousSheets />} />
                  <Route
                    path='/teacher/result-sheets'
                    element={<ResultSheets />}
                  />
                </Route>
              </Routes>
            </LocalizationProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
