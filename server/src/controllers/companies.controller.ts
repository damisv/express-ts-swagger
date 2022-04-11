import { Controller, Get, Post, Route, Path, Body, Patch, SuccessResponse, Delete, Query, Security, Example } from 'tsoa';

import { CompaniesTable, database as sequelize, EmployeesTable } from "../database";
import Company from '../models/company.model';

type CompanyCreationParams = Pick<Company, "name">;
type CompanyUpdateParams = Pick<Company, "website" | "email">;

@Route("/companies")
export class CompaniesController extends Controller {

    @Security("jwt", ["admin"])
    @Get("/")
    public async getAll(): Promise<Array<Company>> {
        return await CompaniesTable.findAll();
    }

    @Security("jwt", ["admin"])
    @Get("/{id}")
    public async getOne(@Path() id: number): Promise<Company> {
        return await CompaniesTable.findByPk(id, { include: ["employees"] });
    }

    @Security("jwt", ["admin"])
    @Example({
        "name": "Name of The company",
        "email": "email@email.com",
        "phone": "+0-01342342342",
        "website": "https://testcompany.com"
    })
    @Post("/")
    public async createCompany(@Body() body: CompanyCreationParams): Promise<Company | Error> {
        const company = {
            ...body,
        };
        try {
            this.setStatus(201);
            return await CompaniesTable.create(company);
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
    @SuccessResponse("200", "Updated")
    @Patch("/{companyID}")
    public async updateCompany(@Path() companyID: number, @Body() body: CompanyUpdateParams): Promise<Company | Error> {
        const updateQuery = {
            ...body,
        };
        const whereQuery = { where: { id: companyID } };
        try {
            await CompaniesTable.update(updateQuery, whereQuery);
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
    @Delete("/{companyID}")
    public async deleteCompany(@Path() companyID: number): Promise<"Success" | Error> {
        let transaction = null;

        try {
            transaction = await sequelize.transaction();
            const employeeRemoveWhereQuery = { where: { companyId: companyID }};
            await EmployeesTable.destroy(employeeRemoveWhereQuery, { transaction });

            const companyRemoveWhereQuery = { where: { id: companyID } };
            CompaniesTable.destroy(companyRemoveWhereQuery, { transaction });

            // if everything went well
            await transaction.commit();
        } catch (ex) {
            if (transaction) await transaction.rollback();

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
