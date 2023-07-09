// https://github.com/viclafouch/mui-file-input
// MIT
import React from 'react'
import { MuiFileInput } from 'mui-file-input'

export const FileComponent = () => {
  const [value, setValue] = React.useState(null)

  const handleChange = (newValue: any) => {
    setValue(newValue)
  }

  return <MuiFileInput style={{height: '3rem'}} value={value} onChange={handleChange} />
}

