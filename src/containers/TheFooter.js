import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  let date = new Date().getFullYear();
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Providus Bank</a>
        <span className="ml-1">&copy; {date}</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">ProvidusBank</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
