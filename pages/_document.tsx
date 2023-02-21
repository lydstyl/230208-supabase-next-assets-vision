import Link from "next/link"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <nav>
                    <Link href="/">Back</Link>
                    <Link href="/categories">/categories</Link>
                </nav>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
