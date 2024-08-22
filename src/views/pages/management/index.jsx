import React, { useEffect } from 'react'

const Management = () => {
    useEffect(() => {
        document.title = "Đăng nhập quản trị viên"
    }, [])
    return (
        <div className="admin-management">
            quản trị viên
        </div>
    )
}

export default Management