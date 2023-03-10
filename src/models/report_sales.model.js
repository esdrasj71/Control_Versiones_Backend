const sql = require("../conexion.js");
const Report_Sales = function(report_sales) {
    this.fechainicio = report_sales.fechainicio;
    this.fechafin = report_sales.fechafin;
};
//Generete NoFactura Bill_Header
Report_Sales.getReport1 = (newReport, result) => {
    console.log(newReport);

    sql.query("CALL reporte1(?,?);",
    [newReport.fechainicio, newReport.fechafin], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Reporte 1 correctamente: ", { ...res });
        result(null, { ...res });
       
    });
};
Report_Sales.getReport3 = result => {
    sql.query("SELECT c.NIT, CONCAT(c.Names,' ',c.Last_names) AS Names , c.Phone_Number ,SUM(a.Total - a.Quantity) as Total, c.Customers_Id, COUNT(*) as NoFacturas FROM Accounts_Receivable as a INNER JOIN Bill_Header as b on b.Bill_header_Id = a.Bill_header_Id INNER JOIN Customers as c on c.Customers_Id = b.Customers_Id WHERE b.Payment_Complete = 0 GROUP by c.Names ORDER by Total DESC;", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            result;
        }
        console.log("Reporte 3 creado: ", res);
        result(null, res);
    })
}
Report_Sales.getReport2 = (newReport, result) => {
    console.log(newReport);

    sql.query("CALL reporte2(?,?);",
    [newReport.fechainicio, newReport.fechafin], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Reporte 2 correctamente: ", { ...res });
        result(null, { ...res });
       
    });
};

Report_Sales.getSerie = result => {
    sql.query("SELECT Serie_Id, Nombre as Serie FROM Serie;", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            result;
        }
        console.log("Serie creado: ", res);
        result(null, res);
    })
}
module.exports = Report_Sales;