import * as React from 'react'
import * as api from './api'

export class ComponentExt<P, S> extends React.Component<P, S> {
  readonly api = api
  readonly $message = 'yes'
  readonly $notification = 'notification'
}

export class PureComponentExt<P, S> extends React.PureComponent<P, S> {
  readonly api = api
  readonly $message = 'yes'
  readonly $notification = 'notification'
}

export class StoreExt {
  readonly api = api
  readonly $message = 'yes'
  readonly $notification = 'notification'
}
