export default function money(num:number|string, dec=0, curr=false) {
  if(typeof(num)=='string') { num = parseFloat(num) }
  const formatter = new Intl.NumberFormat('en-US', {
    //style: 'currency',
    //currency: 'USD',
    minimumFractionDigits: dec, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: dec  // (causes 2500.99 to be printed as $2,501)
  });
  let fmt = formatter.format(num)
  if(curr){ fmt = '$'+fmt }
  return fmt
}
