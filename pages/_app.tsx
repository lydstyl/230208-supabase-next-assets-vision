import "@/styles/globals.css"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { AppProps } from "next/app"

const queryClient = new QueryClient()

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session
}>) {
    const [supabase] = useState(() => createBrowserSupabaseClient())

    return (
        <QueryClientProvider client={queryClient}>
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={pageProps.initialSession}
            >
                <Component {...pageProps} />
            </SessionContextProvider>
        </QueryClientProvider>
    )
}
export default MyApp
