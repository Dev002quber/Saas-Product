import Nav from "./Nav";

const Layout = ({children}) => {
    return (
        <div className="mx-auto p-8  min-h-screen max-w-5xl">
          
            {children}
        </div>
    )
}


export default Layout;