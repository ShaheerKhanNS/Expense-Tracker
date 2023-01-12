let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Hey comeback🙄";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

const clearFields = () => {
  document.getElementById("expense").value = document.getElementById(
    "price"
  ).value = "";
  document.getElementById("worth").checked = false;
};

let totalExpense = 0;
if (localStorage.length) {
  Object.keys(localStorage).forEach((el) => {
    totalExpense += JSON.parse(localStorage.getItem(el)).price;
  });
}

let slNo = 1;

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const expense = document.getElementById("expense").value;
  const price = Number(document.getElementById("price").value);
  const worth = document.getElementById("worth").checked;
  if (expense && price) {
    totalExpense += price;
    const id = Date.now();
    const obj = {
      expense,
      price,
      worth,
      id,
    };
    let formatted = Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });
    let formattedPrice = formatted.format(price);
    render(id, expense, formattedPrice, worth);
    localStorage.setItem(id, JSON.stringify(obj));
    clearFields();
  } else {
    alert("Please Input all Values");
  }
});

const render = (id, expense, price, worth) => {
  const tableBody = document.getElementById("tbody");

  const template = `<tr class=${
    worth === true ? "table-light" : "table-danger"
  } id="row_${id}">
              <td>${slNo}</td>
              <td id="expense_${id}">${expense}</td>
              <td id="price_${id}">${price}</td>
              <td>
                <button data-set =${id} onclick="editField(this)" class="btn btn-outline-secondary btn-sm">Edit</button>
              </td>
              <td>
                <button  data-set =${id} onclick="deleteField(this)" class="btn btn-outline-danger btn-sm">Delete</button>
              </td>
            </tr>`;

  tableBody.innerHTML += template;
  slNo++;
  renderExpense();
};
const renderExpense = () => {
  const tablefoot = document.getElementById("tfoot");
  let formatted = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  let formattedPrice = formatted.format(totalExpense);
  const expenseTemplate = `<tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Expense</td>
              <td>${formattedPrice}/-</td>
            </tr>`;
  tablefoot.innerHTML = expenseTemplate;
};

const deleteField = (el) => {
  const id = el.dataset.set;

  localStorage.removeItem(id);
  const price = Number(
    document.getElementById(`price_${id}`).textContent.replace(/[₹ ,]/g, "")
  );
  totalExpense = totalExpense - price;
  el.closest("tr").remove();
  renderExpense();
};

const editField = (el) => {
  const id = el.dataset.set;
  const price = Number(
    document.getElementById(`price_${id}`).textContent.replace(/[₹ ,]/g, "")
  );
  const expense = document.getElementById(`expense_${id}`).textContent;
  const worth = el.closest("tr").classList.contains("table-light");

  document.getElementById("expense").value = expense;
  document.getElementById("price").value = price;
  document.getElementById("worth").checked = worth;
  deleteField(el);
};

const clearStorage = () => {
  localStorage.clear();
};
// clearStorage();

const retriveData = () => {
  console.log(`Dom Loaded`);

  Object.keys(localStorage).forEach((el) => {
    const { expense, price, worth, id } = JSON.parse(localStorage.getItem(el));
    let formatted = Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });
    let formattedPrice = formatted.format(price);
    render(id, expense, formattedPrice, worth);
  });
};

// DOM Content Loaded;
window.addEventListener("DOMContentLoaded", retriveData);
