import { PureComponent } from "react"
import './spinner.scss'

export default class Spinner extends PureComponent {
  render() {
    const { myClass } = this.props
    return (
      <div className={`spinner loadingio-spinner-rolling-8ginrwvivml${myClass ? " " + myClass : ""}`}>
        <div className="ldio-0n489m2q163">
          <div></div>
        </div>
      </div>
    )
  }
}