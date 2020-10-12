const sql = require("../conexion");
//constructor
const Lot = function(lot){
    this.Due_Date = lot.Due_Date;
    this.Inventory_Id = lot.Inventory_Id;
};
//Creacion de CRUD
    //CREATE
Lot.create = (newLot, result) => {
    sql.query("INSERT INTO lot SET ?", newLot, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("El lote ha sido registrado correctamente!: ", {id: res.insertId, ...newLot});
        result(null, {id: res.insertId, ...newLot});
    });
};
    //BUSCAR POR ID
Lot.findById = (lote_id, result) => {
    sql.query(`SELECT l.Lot_Id, p.Name, l.Due_Date FROM lot as l inner join inventory as i on l.Inventory_Id = i.Inventory_Id inner join product as p on p.Product_Id = i.Inventory_Id WHERE lot_id = ${lote_id}`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Lote: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado el Lote! " }, null);
    });
};
//BUSCAR TODO
Lot.getAll = result => {
    sql.query("SELECT l.Lot_Id, p.Name, l.Due_Date FROM lot as l inner join inventory as i on l.Inventory_Id = i.Inventory_Id inner join product as p on p.Product_Id = i.Inventory_Id", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Lote: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Lot.updateById = (id, lot, result) => {
    sql.query("UPDATE lot SET due_date = ?, inventory_id = ? WHERE lot_id = ?",
      [lot.Due_Date, lot.Inventory_Id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Por si no se encuentra
          result({ kind: "Lote no encontrado" }, null);
          return;
        }
  
        console.log("Lote Actualizado: ", { id: id, ...lot });
        result(null, { id: id, ...lot });
      }
    );
  };

module.exports = Lot;