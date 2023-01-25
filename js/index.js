class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.querySelector(".budget-container");
        this.budgetInput = document.querySelector(".budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balanceAmount = document.getElementById("balance-amount");
        this.balance = document.getElementById("balance");
        this.expenseForm = document.getElementById("expense-container");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }

    submitBudgetForm() {
        const value = this.budgetInput.value;

        if (value === '' || value < 0) {
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `<p>values can not be empty or negative</p>`

            setTimeout(() => {
                this.budgetFeedback.classList.remove('showItem');
            }, 4000);
        }
        else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }

    showBalance() {
        const expense = this.totalExpense();
        // console.log(expense);
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;

        if (total < 0) {
            this.balance.classList.remove('showBlue')
            this.balance.classList.add('showRed');
        } else {
            this.balance.classList.remove('showRed');
            this.balance.classList.add('showBlue')
        }
    }

    submitExpenseForm() {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;

        if (expenseValue === '' || amountValue < '' || amountValue < 0 || !amountValue) {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p>values can not be empty or negative</p>`

            setTimeout(() => {
                this.expenseFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            this.expenseInput.value = '';
            this.amountInput.value = '';
            let amount = parseInt(amountValue)

            let expense = {
                id: this.itemID,
                title: expenseValue,
                amount: amount
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
    }

    addExpense(expense) {
        let div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class = "expense-item">
            <h6 class="expense-title list-item">${expense.title}</h6>
            <h5 class="expense-amount list-item">${expense.amount}</h5>
            <div class ="expense-icons list-item"> 
                <a class="edit-icon"  data-id = "${expense.id}"><i class="fas fa-edit"></i></a>
                <a class="delete-icon" data-id = "${expense.id}"><i class="fas fa-trash"></i></a>
            </div>
        </div>`

        this.expenseList.appendChild(div);
    }

    totalExpense() {
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce((acc, curr) => {
                acc += curr.amount;
                return acc
            }, 0);

        }
        this.expenseAmount.textContent = total;

        return total;
    }

    editExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        // console.log(parent);
        this.expenseList.removeChild(parent);

        let expense = this.itemList.filter((item) => id === item.id)

        let tempList = this.itemList.filter((item) => id !== item.id)

        this.itemList = tempList;

        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;

        this.showBalance();
    }

    deleteExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);

        let tempList = this.itemList.filter((item) => id !== item.id)
        this.itemList = tempList;
        this.showBalance();


    }
}


function eventListeners() {
    const budgetForm = document.querySelector(".budget-container");
    const expenseForm = document.getElementById("expense-container");
    const expenseList = document.getElementById("expense-list");

    const ui = new UI;

    budgetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.submitBudgetForm()
    });
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.submitExpenseForm();

    });
    expenseList.addEventListener('click', function (event) {
        if (event.target.parentElement.classList.contains('edit-icon')) {
            ui.editExpense(event.target.parentElement);
        }
        else if (event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target.parentElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
})



