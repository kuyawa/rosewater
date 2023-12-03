//import Image from 'next/image'
import Page from '@/components/page'
import ButtonFund from '@/components/button-fund'
import styles from './page.module.css'

export default function Home() {
  async function getDreams(){
    //
  }

  return (
    <Page>
      <div className={styles.hero}>
        <h1>Do you have a dream?</h1>
        <h3>Let the world make your ideas come true</h3>
        <a className={styles.start} href="/start">START YOUR DREAM FOR FREE</a>
        <h2>Are you a dream maker?</h2>
        <h3>Help people around the world reach their goals</h3>
        <h3>Donate to causes next to your heart or town</h3>
      </div>
      <div className={styles.panel}>
        <h1>Recent dreams</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <a href="/view/1"><img src="/media/fund1.jpg" /></a>
            <h1>Ptechnodactylus</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $100,000</div>
            <progress value="23" max="100" />
            <div className={styles.fund}>23% funded - since Oct 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/2"><img src="/media/fund2.jpg" /></a>
            <h1>Jack in the box</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $250,000</div>
            <progress value="31" max="100" />
            <div className={styles.fund}>31% funded - since Jan 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/3"><img src="/media/fund3.png" /></a>
            <h1>Smart bag</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $75,000</div>
            <progress value="54" max="100" />
            <div className={styles.fund}>54% funded - since May 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/4"><img src="/media/fund4.png" /></a>
            <h1>Smart Belt</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $50,000</div>
            <progress value="28" max="100" />
            <div className={styles.fund}>28% funded - since Sep 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/5"><img src="/media/fund5.jpg" /></a>
            <h1>Pet Dragon</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $345,000</div>
            <progress value="12" max="100" />
            <div className={styles.fund}>12% funded - since Aug 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
        </div>
      </div>
      <div className={styles.panel}>
        <h1>Most funded</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <a href="/view/2"><img src="/media/fund2.jpg" /></a>
            <h1>Jack in the box</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $250,000</div>
            <progress value="31" max="100" />
            <div className={styles.fund}>31% funded - since Jan 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/5"><img src="/media/fund5.jpg" /></a>
            <h1>Pet Dragon</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $345,000</div>
            <progress value="12" max="100" />
            <div className={styles.fund}>12% funded - since Aug 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/1"><img src="/media/fund1.jpg" /></a>
            <h1>Ptechnodactylus</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $100,000</div>
            <progress value="23" max="100" />
            <div className={styles.fund}>23% funded - since Oct 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/4"><img src="/media/fund4.png" /></a>
            <h1>Smart Belt</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $50,000</div>
            <progress value="28" max="100" />
            <div className={styles.fund}>28% funded - since Sep 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/3"><img src="/media/fund3.png" /></a>
            <h1>Smart bag</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $75,000</div>
            <progress value="54" max="100" />
            <div className={styles.fund}>54% funded - since May 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
        </div>
      </div>
      <div className={styles.panel}>
        <h1>In your region</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <a href="/view/5"><img src="/media/fund5.jpg" /></a>
            <h1>Pet Dragon</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $345,000</div>
            <progress value="12" max="100" />
            <div className={styles.fund}>12% funded - since Aug 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/3"><img src="/media/fund3.png" /></a>
            <h1>Smart bag</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $75,000</div>
            <progress value="54" max="100" />
            <div className={styles.fund}>54% funded - since May 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/4"><img src="/media/fund4.png" /></a>
            <h1>Smart Belt</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $50,000</div>
            <progress value="28" max="100" />
            <div className={styles.fund}>28% funded - since Sep 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/2"><img src="/media/fund2.jpg" /></a>
            <h1>Jack in the box</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $250,000</div>
            <progress value="31" max="100" />
            <div className={styles.fund}>31% funded - since Jan 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
          <div className={styles.card}>
            <a href="/view/1"><img src="/media/fund1.jpg" /></a>
            <h1>Ptechnodactylus</h1>
            <p>Description of the project, goals, roadmap, perks and everything that makes the idea appealing to investors</p>
            <div className={styles.goal}>Dream goal $100,000</div>
            <progress value="23" max="100" />
            <div className={styles.fund}>23% funded - since Oct 2023</div>
            <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
          </div>
        </div>
      </div>
    </Page>
  )
}
