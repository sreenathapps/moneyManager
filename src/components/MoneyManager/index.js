import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'INCOME', // Default to Income
    items: [],
  }

  // Handle title input change
  handleOnChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  // Handle amount input change
  handleOnChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  // Handle transaction type change
  handleOnChangeType = event => {
    this.setState({type: event.target.value})
  }

  // Handle form submission to add a transaction
  onSubmitForm = event => {
    event.preventDefault()

    const {title, amount, type} = this.state

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      type,
    }

    this.setState(prevState => ({
      items: [...prevState.items, newTransaction],
      title: '',
      amount: '',
      type: 'INCOME', // Reset to default
    }))
  }

  handleDelete = id => {
    this.setState(prevState => ({
      items: prevState.items.filter(each => each.id !== id),
    }))
    console.log(`hi this is delete fn, ${id}`)
  }

  // Calculate the balance, income, and expenses
  calculateBalance = () => {
    const {items} = this.state
    let income = 0
    let expenses = 0

    items.forEach(item => {
      if (item.type === 'INCOME') {
        income += item.amount
      } else if (item.type === 'EXPENSES') {
        expenses += item.amount
      }
    })

    return {
      balance: income - expenses,
      income,
      expenses,
    }
  }

  render() {
    const {title, amount, type, items} = this.state
    const {balance, income, expenses} = this.calculateBalance()

    return (
      <div className="bg-container">
        <div className="title-card">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="caption">
            Welcome back to your <span className="p">Money Manager</span>
          </p>
        </div>

        <ul className="money-details">
          <MoneyDetails type="balance" value={balance} />
          <MoneyDetails type="income" value={income} />
          <MoneyDetails type="expenses" value={expenses} />
        </ul>

        <div className="transaction-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Add Transaction</h1>

            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="input-el"
              placeholder="Title"
              value={title}
              onChange={this.handleOnChangeTitle}
            />

            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              className="input-el"
              placeholder="Amount"
              value={amount}
              onChange={this.handleOnChangeAmount}
            />

            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select
              id="type"
              className="input-el"
              value={type}
              onChange={this.handleOnChangeType}
            >
              {transactionTypeOptions.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit" data-testid="add" className="submit-button">
              Add
            </button>
          </form>
          <div className="items-display-container">
            <h1 className="form-heading">History</h1>
            <li className="transaction-row">
              <p className="h1">Title</p>
              <p className="h1">Amount</p>
              <p className="h1">Type</p>
              <p>{` `}</p>
            </li>
            {items.map(each => (
              <TransactionItem
                key={each.id}
                item={each}
                handleDelete={this.handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
