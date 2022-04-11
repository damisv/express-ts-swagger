import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(request: express.Request, security: string, scopes: string[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
        let token = null;

        if (request.body && request.body.token) {
            token = request.body.token;
        } else if (request.query && request.query.token) {
            token = request.query;
        } else if (request.headers["x-access-token"]) {
            token = request.headers["x-access-token"];
        }

        if (!token) {
            reject(new NoAuthorizationProvided());
        }

        // validate jwt
        jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
            console.log(err);
            if (err) {
                reject(new InvalidTokenProvided())
                return;
            }
            // check issuer

            // check service

            // check scopes
            for (const scope of scopes) {
                if (!decoded.scopes || !decoded.scopes.includes(scope)) {
                    reject(new NotEnoughCredentials());
                    return;
                }
            }
            resolve(decoded);
        });
    });
}

class NoAuthorizationProvided extends Error {
    constructor() {
        super();
        this.message = "No authorization token provided";
    }
}

class InvalidTokenProvided extends Error {
    constructor() {
        super();
        this.message = "Invalid token provided";
    }
}

class NotEnoughCredentials extends Error {
    constructor() {
        super();
        this.message = "Not enough credentials";
    }
}