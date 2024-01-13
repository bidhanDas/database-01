import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <div>

        <Image
          src="/vercel.svg" //URL use korle next.config.js a
          alt="Vercel Logo"
          className={styles.vercelLogo}
          width={100}
          height={24}
          priority
        />

        <Image
          src="/next.svg"
          alt="Next Logo"
          className={styles.nextLogo}
          width={100}
          height={24}
          // layout='responsive' //fixed
          priority //age load hobe, lazy loading
        />

      </div>
    </main>
  )
}
