import React from 'react'
import { Outlet } from 'react-router-dom'

// Just to make sure only after login the user can access it
const ProtectedRoute = () => {
  return (
      <>
        <Outlet />
      </>
  )
}

export default ProtectedRoute