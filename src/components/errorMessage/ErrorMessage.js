import { PureComponent } from 'react'
import './errorMessage.scss'

class ErrorMessage extends PureComponent {
  render() {
    const { clickHandler } = this.props
    return (
      <div className="error-message">
        <p className="error-message__text">Something went wrong</p>
        {
          clickHandler ? <button className="error-message__btn" onClick={() => clickHandler()}>Try again</button> : null
        } 
      </div>
    )
  }
}

export default ErrorMessage