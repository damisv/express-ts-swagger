import { Controller, Get, Post, Route, Path, Body, Patch, SuccessResponse, Delete, Security } from 'tsoa';

import { EmployeesTable } from "../database";
import Employee from '../models/employee.model';

type EmployeeCreationParams = Pick<Employee, "first_name" | "last_name">;
type EmployeeUpdateParams = Pick<Employee, "email" | "phone">;

@Route("/employees")
export class EmployeesController extends Controller {

    @Security("jwt", ["admin"])
    @Get("/{id}")
    public async getOne(@Path() id: number): Promise<Employee> {
        return await EmployeesTable.findByPk(id);
    }

    @Security("jwt", ["admin"])
    @Post("/")
    public async createEmployee(@Body() body: EmployeeCreationParams): Promise<Employee | Error> {
        const employee = {
            ...body,
        };
        try {
            this.setStatus(201);
            return await EmployeesTable.create(employee);
        } catch (ex) {
            this.setStatus(500);
            if (ex.name && ex.name === "SequelizeUniqueConstraintError") {
                this.setStatus(409);
                return new EntityAlreadyExists("Employee");
            }
            console.log(ex);
            return new InternalServerError(ex);
        }
    }

    @Security("jwt", ["admin"])
    @SuccessResponse("200", "Updated")
    @Patch("/{employeeID}")
    public async updateCompany(@Path() employeeID: number, @Body() body: EmployeeUpdateParams): Promise<Employee | Error> {
        const updateQuery = {
            ...body,
        };
        const whereQuery = { where: { id: employeeID } };
        try {
            await EmployeesTable.update(updateQuery, whereQuery);
            return;
        } catch (ex) {
            this.setStatus(500);
            if (ex.name && ex.name === "SequelizeUniqueConstraintError") {
                this.setStatus(409);
                return new EntityAlreadyExists("Company");
            }
            return new InternalServerError(ex);
        }
    }

    @Security("jwt", ["admin"])
    @Delete("/{employeeID}")
    public async deleteCompany(@Path() employeeID: number): Promise<"Success" | Error> {
        const whereQuery = { where: { id: employeeID } };
        try {
            return await EmployeesTable.destroy(whereQuery);
        } catch (ex) {
            this.setStatus(500);
            return new InternalServerError(ex);
        }
    }
}

class EntityAlreadyExists extends Error {
    constructor(entityType: string) {
        super();
        this.message = `${entityType} already exists!`;
    }
}

class InternalServerError extends Error {
    constructor(data: any) {
        super();
        this.message = "Internal Server Error";
    }
}
