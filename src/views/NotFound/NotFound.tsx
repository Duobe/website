import './NotFound.less'

import * as React from 'react'

export interface INotFoundProps {}

export interface INotFoundState {}

export default class NotFound extends React.Component<INotFoundProps, INotFoundState> {

  render () {
    return (
      <div className='notFound'>Not Found</div>
    )
  }
}
