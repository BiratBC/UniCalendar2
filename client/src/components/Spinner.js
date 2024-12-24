import React from 'react'
import loading from '../images/loading.gif'

function Spinner() {
  return (
    <div className='text-center' style={{height : "650px", display : 'flex', alignItems :  'center', justifyContent : 'center'}}>
      <img src={loading} alt="loading" style={{height: 50}}/>
    </div>
  )
}

export default Spinner
