// app/accountant/page.tsx
import { redirect } from "next/navigation"

export default function AccountantRoot() {
  redirect("/accountant/login")
}
