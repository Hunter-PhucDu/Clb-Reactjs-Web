import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import './css/common.css'

const App = () => {

  const notify = (msg, type = "SUCCESS") => {
    if (type === "ERROR") {
      toast.error(msg)
    } else {
      toast.success(msg)
    }
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <ToastContainer />
        <Routers notify={notify} />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
