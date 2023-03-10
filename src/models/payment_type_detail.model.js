const sql = require("../conexion.js");

// constructor
const Payment_Type_Detail = function(payment_type_detail) {
    this.Total_Amount = payment_type_detail.Total_Amount;
    this.Description = payment_type_detail.Description;
    this.Payment_Id = payment_type_detail.Payment_Id;
    this.Bill_header_Id = payment_type_detail.Bill_header_Id;
};

//CRUD
Payment_Type_Detail.create = (newPurchaseD, result) => {
    sql.query("INSERT INTO Payment_Type_Detail SET ?", newPurchaseD, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Detalle tipo de pago creado: ", { id: res.insertId, ...newPurchaseD });
        result(null, { id: res.insertId, ...newPurchaseD });
    });
};

Payment_Type_Detail.findById = (PaymentDetailId, result) => {
    sql.query(`SELECT * FROM Payment_Type_Detail WHERE Type_Detail_Id = ${PaymentDetailId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Detalle tipo de pago encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Detalle tipo de pago no encontrada" }, null);
    });
};

Payment_Type_Detail.getAll = result => {
    sql.query("SELECT *, p.Method_Name as Method FROM Payment_Type_Detail as e INNER JOIN Payment as p ON p.Payment_Id = e.Payment_Id", (err, res) => { 
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Detalle tipo de pago: ", res);
        result(null, res);
    });
};

Payment_Type_Detail.updateById = (id, paymentDetail, result) => {
    sql.query(
        "UPDATE Payment_Type_Detail SET Total_Amount = ?, Description = ?, Payment_Id = ?, Bill_header_Id = ? WHERE Type_Detail_Id = ?", [paymentDetail.Total_Amount, paymentDetail.Description, paymentDetail.Payment_Id, paymentDetail.Bill_header_Id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "no encontrado" }, null);
                return;
            }
            console.log("Detalle tipo de pago actualizado: ", { id: id, ...paymentDetail });
            result(null, { id: id, ...paymentDetail });
        }
    );
};

Payment_Type_Detail.remove = (id, result) => {
    sql.query("DELETE FROM Payment_Type_Detail WHERE Type_Detail_Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "no encontrado" }, null);
            return;
        }

        console.log("Detalle tipo de pago eliminado con ID: ", id);
        result(null, res);
    });
};

module.exports = Payment_Type_Detail;