import React from 'react'

const AddAdmin = () => {
  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
  }
  return (
    <div className='addAdmin'>
      <p className='heading3'>Personal Information</p>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
}

export default AddAdmin