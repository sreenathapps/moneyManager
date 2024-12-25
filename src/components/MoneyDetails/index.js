import './index.css'

const MoneyDetails = props => {
  const {type, value} = props
  const imageUrl = `https://assets.ccbp.in/frontend/react-js/money-manager/${type}-image.png`
  console.log(`${value} -> ${type}`)

  return (
    <li className={`li-element ${type}`}>
      <img className="item-logo" alt={type} src={imageUrl} />
      <div className="text-container">
        <p className="label">{`Your ${type}`}</p>
        <p className="amount">Rs {value}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
