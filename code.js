const bodyElement = document.body;
const btn_car = document.querySelector(".btn-show-car");
const btn_add_car = document.querySelector(".btn-add-car");

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
        <input type="text" id="year" name="year" value="${carItem.year}"><br><br>
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
        <label for="owner_name">Owner name: </label>
        <input type="text" id="owner_name" name="owner_name"><br><br>
        <label for="car_mark">Car mark: </label>
        <input type="text" id="car_mark" name="car_mark"><br><br>
        <label for="car_number">Car number: </label>
        <input type="text" id="car_number" name="car_number"><br><br>
        <label for="year">Year:</label>
        <input type="text" id="year" name="year"><br><br>
        <input type="submit" value="Add Car">
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
    header.textContent = "Car";
    let html = `
      <table>
        <thead>
          <tr>
            <th>Owner car</th>
            <th>Car mark</th>
            <th>Car number</th>
            <th>Year</th>
            <th>Actions</th>
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

const car = new Car();
car.loadCar();

console.log(btn_car);
console.log(btn_add_car);
