import './index.css'

const TransactionItem = props => {
  const {item, handleDelete} = props
  const {id, title, amount, type} = item

  return (
    <li className="transaction-row">
      <p>{title}</p>
      <p>{amount}</p>
      <p className="type">{type}</p>
      <p>
        <button data-testid="delete" className="delete-btn" type="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
            onClick={() => handleDelete(id)} // Implement the delete functionality
          />
        </button>
      </p>
    </li>
  )
}

export default TransactionItem
