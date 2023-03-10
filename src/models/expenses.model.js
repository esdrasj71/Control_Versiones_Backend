const sql = require("../conexion.js");

// constructor
const Expenses = function(expenses) {
  this.Name = expenses.Name;
};

//CRUD
Expenses.create = (newExpenses, result) => {
  sql.query("INSERT INTO Expenses SET ?", newExpenses, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("creado: ", { id: res.insertId, ...newExpenses });
    result(null, { id: res.insertId, ...newExpenses });
  });
};

Expenses.findById = (expensesId, result) => {
  sql.query(`SELECT * FROM Expenses WHERE Expenses_Id = ${expensesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found  with the id
    result({ kind: "no encontrado" }, null);
  });
};

Expenses.getAll = result => {
  sql.query("SELECT * FROM Expenses ORDER BY Name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Expenses: ", res);
    result(null, res);
  });
};

Expenses.updateById = (id, expenses, result) => {
  sql.query(
    "UPDATE Expenses SET Name = ? WHERE Expenses_Id = ?",
    [expenses.Name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found with the id
        result({ kind: "no encontrado" }, null);
        return;
      }

      console.log("actualizado: ", { id: id, ...expenses });
      result(null, { id: id, ...expenses });
    }
  );
};

Expenses.remove = (id, result) => {
  sql.query("DELETE FROM Expenses WHERE Expenses_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found with the id
      result({ kind: "No encontrado" }, null);
      return;
    }

    console.log("eliminado con ID: ", id);
    result(null, res);
  });
};

module.exports = Expenses;