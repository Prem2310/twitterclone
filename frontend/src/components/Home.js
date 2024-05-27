import React from 'react'
import Form from './Form'
import Login from './Login'
const Home = () => {
  return (
<>
{/* <div classname='grid gap-4 '>
    <h2 classname ='bg-black text-white'>3</h2>
    <div><h2 classname ='bg-black text-white'>2</h2></div>
  </div> */}
  <div className='grid gap-4 m-3 sm:grid-row-2 grid-rows-2'>
    {/* <div className="bg-black text-red min-h-8 rounded sm:block hidden"> */}
    {/* </div> */}
    <div className="bg-sky-800 text-black p-2 font-bold min-h-8 rounded"><Form /></div>
    <div className="bg-sky-800 text-black p-2 font-bold  min-h-8 rounded"><Login /></div>

  </div>
</>
)}


export default Home;