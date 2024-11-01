import React from 'react'

function SettingDynamic({params}:any) {

    const { id } = params

  return (
    <div>SettingDynamic ID is {id}</div>
  )
}

export default SettingDynamic