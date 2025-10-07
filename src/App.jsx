import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Rigester from './Components/Rigester/Rigester'
import Payment from './Components/Payment/Payment'
import Brand from './Components/Brand/Brand'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Catogery from './Components/Catogery/Catogery'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import store from '../src/Redux/reduxStore'
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerfyCode from './Components/VerfyCode/VerfyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '', element: <Layout />,
    children: [
      { path: 'Home', element: <Home /> },
      { path: 'Login', element: <Login /> },
      { path: 'Rigester', element: <Rigester /> },
      { path: 'Payment/:id', element: <Payment /> },
      { path: 'Brand', element: <Brand /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'VerfyCode', element: <VerfyCode /> },
      { path: 'ResetPassword', element: <ResetPassword /> },
      { path: 'Catogery', element: <Catogery /> },
      { path: 'allorders', element: <Home /> },
      { path: 'https://e-commerce-25sm-m3tfomeh9-khaledhany10s-projects.vercel.app/', element: <Login /> },
      { path: 'ProductDetails/:id', element: <ProductDetails /> },
      { path: 'Cart/:id', element: <Cart /> },
      { path: '*', element: <NotFound /> },
      { path: '', element: <Login /> }
    ]
  }
])

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
