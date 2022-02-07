const Layout = ({children}) => {
    return (
        <div className="mx-auto p-8  min-h-screen max-w-5xl">
            This is home layout for all page 
            {children}
        </div>
    )
}


export default Layout;