const bodyElement = document.body;
const btn_car = document.querySelector(".btn-show-car");
const btn_add_car = document.querySelector(".btn-add-car");
const btn_order = document.querySelector(".btn-show-order");
const btn_add_order = document.querySelector(".btn-add-order");

class Car {
  constructor() {
    this.carList = [];
  }

  async loadCar() {
    try {
      const response = await fetch('car.json');
      const data = await response.json();

      for (let key in data) {
        const item = data[key];
        const carItem = new CarItem(item.owner_name, item.car_mark, item.car_number, item.year);
        this.carList.push(carItem);
      }

      this.showCar();
    } catch (error) {
      console.error('Error loading car data:', error);
    }
  }

  editCar(index) {
    const carItem = this.carList[index];
    const formHtml = `
      <form id="car-form">
        <label for="owner_name">Owner name:</label>
        <input type="text" id="owner_name" name="owner_name" value="${carItem.owner_name}"><br><br>
        <label for="car_mark">Car mark:</label>
        <input type="text" id="car_mark" name="car_mark" value="${carItem.car_mark}"><br><br>
        <label for="car_number">Car number:</label>
        <input type="text" id="car_number" name="car_number" value="${carItem.car_number}"><br><br>
        <label for="year">Year:</label>
        <input type="number" id="year" name="year" value="${carItem.year}"><br><br>
        <input type="submit" value="Save">
      </form>
    `;
    const formContainer = document.getElementById('form');
    formContainer.innerHTML = formHtml;

    const form = document.getElementById("car-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const owner_name = event.target.elements.owner_name.value;
      const car_mark = event.target.elements.car_mark.value;
      const car_number = event.target.elements.car_number.value;
      const year = event.target.elements.year.value;

      const editedCar = new CarItem(owner_name, car_mark, car_number, year);
      this.carList[index] = editedCar;

      formContainer.innerHTML = "";
      this.showCar();
    });
  }

  deleteCar(index) {
    this.carList.splice(index, 1);
    this.showCar();
  }

  addCar() {
    const htmlForm = `
      <form id="car-form">
        <label for="owner_name">Власник: </label>
        <input type="text" id="owner_name" name="owner_name"><br><br>
        <label for="car_mark">Марка автомобіля: </label>
        <input type="text" id="car_mark" name="car_mark"><br><br>
        <label for="car_number">Номер автомобіля: </label>
        <input type="text" id="car_number" name="car_number"><br><br>
        <label for="year">Рік випуску автомобіля:</label>
        <input type="text" id="year" name="year"><br><br>
        <input type="submit" value="Додати">
      </form>
    `;

    const formContainer = document.getElementById("form");
    formContainer.innerHTML = htmlForm;
    const form = document.getElementById("car-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const owner_name = event.target.elements.owner_name.value;
      const car_mark = event.target.elements.car_mark.value;
      const car_number = event.target.elements.car_number.value;
      const year = event.target.elements.year.value;

      const newCar = new CarItem(owner_name, car_mark, car_number, year);
      this.carList.push(newCar);

      formContainer.innerHTML = "";
      this.showCar();
    });
  }

  showCar() {
    const header = document.querySelector(".header");
    header.textContent = "Автомобіль";
    let html = `
      <table>
        <thead>
          <tr>
            <th>Власник</th>
            <th>Марка автомобіля</th>
            <th>Номер автомобіля</th>
            <th>Рік випуску</th>
          </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < this.carList.length; i++) {
      const carItem = this.carList[i];
      html += `
        <tr>
          <td>${carItem.owner_name}</td>
          <td>${carItem.car_mark}</td>
          <td>${carItem.car_number}</td>
          <td>${carItem.year}</td>
          <td>
            <button class="btn-delete" data-index="${i}">Delete</button>
            <button class="btn-edit" data-index="${i}">Edit</button>
          </td>
        </tr>
      `;
    }
    html += `</tbody></table>`;

    const basis = document.getElementById("basis");
    basis.innerHTML = html;

    const deleteButtons = document.querySelectorAll(".btn-delete");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        this.deleteCar(index);
      });
    }

    const editButtons = document.querySelectorAll(".btn-edit");
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        this.editCar(index);
      });
    }
  }
}

class CarItem {
  constructor(name, capital, car_number, year) {
      this.owner_name = owner_name;
      this.car_mark = car_mark;
      this.car_number = car_number;
      this.year = year;
  }
}

const car = new Car()


car.loadCar()
  .then(() => car.showCar())
  .catch((error) => console.error(error))


car.showCar()


/*btn_car.addEventListener("click", () => {
  car.showCar()
  btn_add_order.style.display = "none"
  btnAddPeople.style.display = "none"
  btn_car.style.display = "none"
  btn_add_car.style.display = "inline-block"
  btn_order.style.display = "inline-block"
  btnShowPeople.style.display = "inline-block"
})*/

btn_add_car.addEventListener("click", () => {
  car.addCar()
  car.showCar()
})

class Order {
  constructor() {
      this.orderList = []
  }

  async loadOrder() {
      const response = await fetch('order.json')
      const data = await response.json()
      for (let key in data) {
          const item = data[key]
          const orderItem = new OrderItem(cost, date_of_issue, type, plan_date, real_date)
          this.orderList.push(orderItem)
      }
  }

  editOrder(index) {
      const orderItem = this.orderList[index];
      const formHtml = `
        <form id="edit-order-form">
          <label for="cost">Вартість:</label>
          <input type="text" id="cost" name="cost" value="${orderItem.cost}"><br>
  
          <label for="date_of_issue">Дата видачі:</label>
          <input type="date" id="date_of_issue" name="date_of_issue" value="${orderItem.date_of_issue}"><br>
  
          <label for="type">Вид робіт:</label>
          <input type="text" id="type" name="type" value="${orderItem.type}"><br>

          <label for="plan_date">Планова дата закінчення:</label>
          <input type="text" id="plan_date" name="plan_date" value="${orderItem.plan_date}"><br>

          <label for="real_date">Реальна дата закінчення:</label>
          <input type="text" id="real_date" name="real_date" value="${orderItem.real_date}"><br>
  
          <button type="submit">Save</button>
  
        </form>
      `;
      const formDiv = document.getElementById("form")
      formDiv.innerHTML = formHtml

      const form = document.getElementById("edit-order-form")
      form.addEventListener("submit", (event) => {
          event.preventDefault()

          const cost = form.elements.cost.value
          const date_of_issue = form.elements.date_of_issue.value
          const type = form.elements.type.value
          const plan_date = form.elements.plan_date.value
          const real_date = form.elements.real_date.value

          const editedOrder = new OrderItem(cost, date_of_issue, type, plan_date, real_date)
          this.orderList[index] = editedOrder

          formDiv.innerHTML = ""
          this.showOrder()
      })
  }

  deleteOrder(index) {
      this.orderList.splice(index, 1)
  }

  addOrder() {
      const formHtml = `
        <form id="add-order-form">
          <label for="cost">Вартість:</label>
          <input type="text" id="cost" name="cost"><br>
  
          <label for="date_of_issue">Дата видачі:</label>
          <input type="date" id="date_of_issue" name="date_of_issue"><br>
  
          <label for="type">Вид робіт:</label>
          <input type="text" id="type" name="type"><br>

          <label for="plan_date">Планова дата закінчення:</label>
          <input type="date" id="plan_date" name="plan_date"><br>

          <label for="plan_date">Реальна дата закінчення:</label>
          <input type="date" id="real_date" name="real_date"><br>
  
          <button type="submit">Додати замовлення</button>
  
        </form>
      `

      const formDiv = document.getElementById("form")
      formDiv.innerHTML = formHtml

      const form = document.getElementById("add-order-form")

      form.addEventListener("submit", (event) => {
          event.preventDefault()

          const cost = form.elements.cost.value
          const date_of_issue = form.elements.date_of_issue.value
          const type = form.elements.type.value
          const plan_date = form.elements.plan_date.value
          const real_date = form.elements.real_date.value

          const newOrder = new OrderItem(cost, date_of_issue, type, plan_date, real_date)
          this.orderList.push(newOrder)

          formDiv.innerHTML = ""
          this.showOrder()
      })
  }

  showOrder() {
      header.textContent = "Замовлення"
      let html = `
        <table>
          <thead>
            <tr>
              <th>Вартість</th>
              <th>Дата видачі</th>
              <th>Вид робіт</th>
              <th>Планова дата закінчення</th>
              <th>Реальна дата закінчення</th>
            </tr>
          </thead>
          <tbody>
      `
      for (let i = 0; i < this.orderList.length; i++) {
          html += `
          <tr>
            <td>${this.orderList[i].cost}</td>
            <td>${this.orderList[i].date_of_issue}</td>
            <td>${this.orderList[i].type}</td>
            <td>${this.orderList[i].plan_date}</td>
            <td>${this.orderList[i].real_date}</td>
            <td>
              <button class="btn-delete" data-index="${i}">Delete</button>
              <button class="btn-edit" data-index="${i}">Edit</button>
            </td>
          </tr>
        `
      }
      html += `</tbody></table>`
      basis.innerHTML = html

      const deleteButtons = document.querySelectorAll(".btn-delete");
      for (let i = 0; i < deleteButtons.length; i++) {
          deleteButtons[i].addEventListener("click", (event) => {
              const index = event.target.getAttribute("data-index");
              this.deleteOrder(index)
              this.showOrder()
          })
      }

      const editButtons = document.querySelectorAll(".btn-edit");
      for (let i = 0; i < editButtons.length; i++) {
          editButtons[i].addEventListener("click", (event) => {
              const index = event.target.getAttribute("data-index");
              this.editOrder(index)
              this.showOrder()
          })
      }
  }
}



console.log(btn_car);
console.log(btn_add_car);
