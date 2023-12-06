//import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import Index from '@/components/index'
import ButtonFund from '@/components/button-fund'
import DreamCard from '@/components/dream-card'
import * as db from '@/utils/db'
import styles from './page.module.css'


export default async function Home() {
  revalidatePath('/')

  async function getDreams(){
    const location = 'USA' // TODO: get from user IP?
    const dreams = await db.getMainDreams(location)
    //console.log('DREAMS', dreams)
    return dreams
  }

  const data = await getDreams()

  return (
    <Index>
      <div className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroLeft}>
            <h1>Do you have a dream?</h1>
            <h3>Let the whole world kickstart your ideas</h3>
            <a className={styles.start} href="/start">START YOUR DREAM FOR FREE</a>
            <h2>Are you a dream maker?</h2>
            <h3>Help people around the world reach their goals</h3>
            <h3>Donate to causes next to your heart or town</h3>
            <ul className={styles.bullet}>
              <li>Select a project</li>
              <li>Use your crypto wallet</li>
              <li>Make people happy</li>
            </ul>
          </div>
          <div className={styles.heroRight}>
            <Image src="/media/hero.png" alt="hero" width={680} height={680} />
          </div>
        </div>
      </div>

      <div className={styles.wrapc}>
        <h1 className={styles.caption}>Recent dreams</h1>
        <div className={styles.panel}>
          <div className={styles.cards}>
            {data?.latest?.length > 0
              ? data.latest.map(dream=>{
                return <DreamCard data={dream} key={dream.id} />
              })
              : <div>No dreams started yet</div>
            }
          </div>
        </div>

        <h1 className={styles.caption}>Most funded</h1>
        <div className={styles.panel}>
          <div className={styles.cards}>
            {data?.funded?.length > 0
              ? data.funded.map(dream=>{
                return <DreamCard data={dream} key={dream.id} />
              })
              : <div>No dreams funded yet</div>
            }
          </div>
        </div>

        <h1 className={styles.caption}>In your region</h1>
        <div className={styles.panel}>
          <div className={styles.cards}>
            {data?.located?.length > 0
              ? data.located.map(dream=>{
                return <DreamCard data={dream} key={dream.id} />
              })
              : <div>No dreams in your country</div>
            }
          </div>
        </div>
      </div>
    </Index>
  )
}
