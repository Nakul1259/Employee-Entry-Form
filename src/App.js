import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [salary, setSalary] = useState("");
  const [qualification, setQualification] = useState("");
  const [marks, setMarks] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees([]); // Set an empty array as the initial value
    }
  }, []);
  // Save employees to localStorage whenever it changes


  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: employees.length + 1,
      name: name,
      gender: gender,
      birthdate: birthdate,
      salary: salary,
      qualifications: qualifications,
    };

    setEmployees([...employees, newEmployee]);
    setName("");
    setGender("");
    setBirthdate("");
    setSalary("");
    setQualifications([]);

    // localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleAddQualification = () => {
    const newQualification = {
      id: qualifications.length + 1,
      name: qualification,
      marks: marks,
    };

    setQualifications([...qualifications, newQualification]);
    setQualification("");
    setMarks("");
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setName(employee.name);
    setGender(employee.gender);
    setBirthdate(employee.birthdate);
    setSalary(employee.salary);
    setQualifications(employee.qualifications);
  };

  const handleCancel = () => {
    setName("");
    setGender("");
    setBirthdate("");
    setSalary("");
    setQualifications([]);
    setQualification("");
    setMarks("");
  };

  const handleDelete = () => {
    const filteredEmployees = employees.filter(
      (employee) => employee.id !== selectedEmployee.id
    );
    setEmployees(filteredEmployees);
    setSelectedEmployee(null);
  };

  return (
    <div className="app">
      <h1>Entry Form</h1>
      <div className="form-container">
        <div className="employee-info">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => handleSelectEmployee(employee)}
                  className={selectedEmployee === employee ? "selected" : ""}
                >
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>
                    <Button onClick={handleDelete}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="employee-details">
          <form onSubmit={handleSubmit}>
            <div className="name">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="gender">
              <label htmlFor="gender">Gender:</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                required
              />
              <span>Male</span>

              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
                required
              />
              <span>Female</span>

              <input
                type="radio"
                name="gender"
                value="Third"
                checked={gender === "Third"}
                onChange={() => setGender("Third")}
                required
              />
              <span>Third Gender</span>
            </div>

            <div>
              <label  htmlFor="dob">DOB:</label>
              <input
              style={{margin: "1.5rem", width: "14rem"}}
                type="date"
                placeholder="Enter BirthDate"
                name="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                pattern="\d{4}/\d{2}/\d{2}"
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="salary">
              <label htmlFor="">Salary: </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <br />
            <br />
            <br />
            <div className="border">
            <h4>Employee Qualification</h4>
              
            <div className="employee-qualification">
              <div className="qualification">
                <label htmlFor="qualification">Qualification: </label>
                <select
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                >
                  <option value="">Select qualification</option>
                  <option value="SLC">SLC</option>
                  <option value="ISC">ISC</option>
                  <option value="BE Computer">BE Computer</option>
                  {/* <option value="BIT">BIT</option> */}
                </select>
              </div>
              <div>
                <label htmlFor="marks">Marks: </label>
                <input
                  type="number"
                  id="marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>

              <Button onClick={handleAddQualification}>Add</Button>
            </div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>QID</th>
                  <th>Qualification Name</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((qualification) => (
                  <tr key={qualification.id}>
                    <td>{qualification.id}</td>
                    <td>{qualification.name}</td>
                    <td>{qualification.marks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>

            <br />
            <br />
            <div className="btn">
              <Button type="submit">Submit</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
