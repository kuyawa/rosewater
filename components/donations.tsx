'use client'
import money from '@/utils/money'
import styles from '@/app/page.module.css'

type Dictionary = { [key:string]:any }

export default function Donations(props:Dictionary) {
  const list = props?.data || []
  let total = 0
  console.log('DATA', list)
  return (
    <>
      <h3>Latest Donors</h3>
      <table className={styles.donors}>
        <thead>
          <tr><th>Date</th><th>Donor</th><th>USD</th></tr>
        </thead>
        <tbody>
        {list.map((item:Dictionary)=>{
          total += Number(item.usdval)
          return (
            <tr key={item.id}><td>{item.created.substr(0,10)}</td><td>{item.donor.substr(0,12)+'...'}</td><td>{item.usdval}</td></tr>
          )
        })}
        </tbody>
        <tfoot>
          <tr><th>{list.length} Donation{list.length==1?'':'s'}</th><th>&nbsp;</th><th>{total}</th></tr>
        </tfoot>
      </table>
    </>
  )
}