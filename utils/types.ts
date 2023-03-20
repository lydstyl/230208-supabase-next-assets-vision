import { RefObject } from "react"
import { SupabaseClient } from "@supabase/auth-helpers-react"

export type Category = {
    id: string
    name: string
}
export type CategoryItemProps = {
    name: string
}
export type Supabase = SupabaseClient<any, "public", any>
