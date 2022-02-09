import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../pages/utils/supabase";

const Context = createContext()



const Provider = ({ children }) => {

    // built in router from next js for routing
    const router = useRouter()

    // managing the user state
    const [user, setUser] = useState(supabase.auth.user())

    // loading state to managed here is another state
    const [isLoading, setIsLoading] = useState(true)
    


    // onMounting funtion this will loads 
    useEffect(() => {
        const getUserProfile = async () => {
            const sessionUser = supabase.auth.user()

            if (sessionUser) {
                const { data: profile } = await supabase.from('profile').select('*').eq('id', sessionUser.id).single()

                setUser({ ...sessionUser, ...profile })
                setIsLoading(false)

            }
        }
        getUserProfile()

        supabase.auth.onAuthStateChange(() => {
            getUserProfile()
        })
    }, [])


    useEffect(() => {
        axios.post("/api/set-supabase-cookie", {
            event: user ? "SIGNED_IN" : "SIGNED_OUT",
            session: supabase.auth.session(),
        })
    },[user])

    const login = async () => {
        supabase.auth.signIn({
            provider: 'github',
        })
        
    }

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null)
        router.push('/')
    }


    const exposed = {
        user,
        login,
        logout,
        isLoading
    }
    return (
        <Context.Provider value={exposed}>
            {children}
        </Context.Provider>
    )
}
export const useUser = () => useContext(Context)
export default Provider