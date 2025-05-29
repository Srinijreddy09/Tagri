const users = [{ username: "admin", password: "admin123" }];
const employees = [];
let employeeCounter = 1;

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const uname = document.getElementById("username").value;
  const pwd = document.getElementById("password").value;
  const valid = users.find(u => u.username === uname && u.password === pwd);
  if (valid) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("employeePage").classList.remove("hidden");
    generateEmpId();
  } else {
    document.getElementById("loginError").textContent = "Invalid credentials!";
  }
});


function generateEmpId() {
  const empId = `EMP${String(employeeCounter).padStart(4, "0")}`;
  document.getElementById("empId").value = empId;
}

function generateLoginId(first, last) {
  let base = (first[0] + last).toLowerCase();
  let loginId = base;
  let i = 0;
  while (employees.some(emp => emp.loginId === loginId)) {
    loginId = base + Math.floor(Math.random() * 1000);
    i++;
    if (i > 10) break;
  }
  return loginId;
}

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const dob = new Date(document.getElementById("dob").value);
  const department = document.getElementById("department").value;
  const salary = parseFloat(document.getElementById("salary").value);
  const permAddress = document.getElementById("permAddress").value;
  const currAddress = document.getElementById("currAddress").value;
  const idProof = document.getElementById("idProof").files[0];

  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (age < 18 || isNaN(dob.getTime())) {
    document.getElementById("empFormMsg").textContent = "Invalid DOB. Age must be 18+.";
    return;
  }

  if (!idProof || idProof.type !== "application/pdf" || idProof.size < 10240 || idProof.size > 1024 * 1024) {
    document.getElementById("empFormMsg").textContent = "Invalid ID Proof. Only PDF (10KB–1MB) allowed.";
    return;
  }

  const empId = document.getElementById("empId").value;
  const loginId = generateLoginId(firstName, lastName);

  employees.push({
    empId, firstName, lastName, middleName, loginId,
    dob: dob.toISOString().split("T")[0],
    department, salary, permAddress, currAddress, idProofName: idProof.name
  });

  alert("Employee Added Successfully!");
  employeeCounter++;
  document.getElementById("employeeForm").reset();
  generateEmpId();
  document.getElementById("loginId").value = "";
});

document.getElementById("firstName").addEventListener("input", updateLoginId);
document.getElementById("lastName").addEventListener("input", updateLoginId);

function updateLoginId() {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  if (first && last) {
    const loginId = generateLoginId(first, last);
    document.getElementById("loginId").value = loginId;
  }
}

function searchEmployees() {
  const results = document.querySelector("#resultsTable tbody");
  results.innerHTML = "";
  const filters = {
    empId: document.getElementById("searchEmpId").value.trim().toLowerCase(),
    firstName: document.getElementById("searchFirstName").value.trim().toLowerCase(),
    lastName: document.getElementById("searchLastName").value.trim().toLowerCase(),
    loginId: document.getElementById("searchLoginId").value.trim().toLowerCase(),
    dobFrom: document.getElementById("searchDobFrom").value,
    dobTo: document.getElementById("searchDobTo").value,
    department: document.getElementById("searchDepartment").value
  };

  const filtered = employees.filter(emp => {
    return (!filters.empId || emp.empId.toLowerCase().includes(filters.empId)) &&
           (!filters.firstName || emp.firstName.toLowerCase().includes(filters.firstName)) &&
           (!filters.lastName || emp.lastName.toLowerCase().includes(filters.lastName)) &&
           (!filters.loginId || emp.loginId.toLowerCase().includes(filters.loginId)) &&
           (!filters.department || emp.department === filters.department) &&
           (!filters.dobFrom || new Date(emp.dob) >= new Date(filters.dobFrom)) &&
           (!filters.dobTo || new Date(emp.dob) <= new Date(filters.dobTo));
  });

  filtered.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><a href="#">${emp.empId}</a></td>
      <td>${emp.firstName} ${emp.lastName}</td>
      <td>${emp.loginId}</td>
      <td>${emp.dob}</td>
      <td>${emp.department}</td>
      <td>${emp.salary}</td>
      <td>
        <select>
          <option>Actions</option>
          <option>View</option>
          <option>Edit</option>
          <option>Delete</option>
          <option>History</option>
        </select>
      </td>
    `;
    results.appendChild(row);
  });
}
