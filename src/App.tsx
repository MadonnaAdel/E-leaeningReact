import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./ui/AppLayout";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Notfound from "./pages/Notfound";
import User from "./pages/User";
import UserCourses from "./features/user/UserCourses";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import { ModeProvider } from "./contexts/ModeContext";
import AddCourse from "./pages/AddCourse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { EnrolledCoursesProvider } from "./contexts/EnrolledCoursesContext";

const queryClient = new QueryClient();

const options = {
  // Define default options
  className: "",
  duration: 5000,
  style: {
    background: "#363636",
    color: "#fff",
  },

  // Default options for specific types
  success: {
    duration: 3000,
    theme: {
      primary: "green",
      secondary: "black",
    },
  },
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={options}
      />

      <ModeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/courses" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/courses"
                  element={
                    <EnrolledCoursesProvider>
                      <Courses />
                    </EnrolledCoursesProvider>
                  }
                />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <User />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="profile" />} />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="my-courses"
                    element={
                      <ProtectedRoute>
                        <EnrolledCoursesProvider>
                          <UserCourses />
                        </EnrolledCoursesProvider>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="addCourses/new"
                    element={
                      <ProtectedRoute>
                        <AddCourse />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<Notfound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ModeProvider>
    </QueryClientProvider>
  );
}

export default App;
