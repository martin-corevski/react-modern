import React from 'react'

const wrapWithClass = (WrappedComponent, className) => {
  return (props) => {
    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default wrapWithClass
