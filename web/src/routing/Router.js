import React, { Component } from 'react'
import history from './history'

class Router extends Component {
  state = {
    nav: this.props.pathToState(window.location.pathname)
  }

  render() {
    const { nav } = this.state
    return this.props.render(nav)
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      this.setState({
        nav: this.props.pathToState(location.pathname)
      })
    })
  }

  componentWillUnmount() {
    this.unlisten()
    delete this.unlisten
  }
}

export default Router
