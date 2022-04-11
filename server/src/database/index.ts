import database from "./database";
import CompaniesTable from "./table_companies";
import EmployeesTable from "./table_employee";

// Relationships
EmployeesTable.belongsTo(
    // target
    CompaniesTable,
    // options
    {
        foreignKey: "companyId",
        as: "company",
    }
);
CompaniesTable.hasMany(EmployeesTable, {as: "employees"});

export {
    database,
    CompaniesTable,
    EmployeesTable,
};