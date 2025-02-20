/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FundController } from './../Components/Funds/funds.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClientController } from './../Components/Clients/clients.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "HttpSuccess": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}],"required":true},
            "message": {"dataType":"string","required":true},
            "results": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IClientData": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsFundController_fetchAndStoreFunds: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/mfb/mutual-funds/fetch-funds',
            ...(fetchMiddlewares<RequestHandler>(FundController)),
            ...(fetchMiddlewares<RequestHandler>(FundController.prototype.fetchAndStoreFunds)),

            async function FundController_fetchAndStoreFunds(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFundController_fetchAndStoreFunds, request, response });

                const controller = new FundController();

              await templateService.apiHandler({
                methodName: 'fetchAndStoreFunds',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsFundController_getPaginatedActionPlansForSupplier: Record<string, TsoaRoute.ParameterSchema> = {
                pageNum: {"in":"query","name":"pageNum","required":true,"dataType":"any"},
                sort: {"in":"query","name":"sort","required":true,"dataType":"any"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"any"},
        };
        app.get('/mfb/mutual-funds/get-paginated-funds',
            ...(fetchMiddlewares<RequestHandler>(FundController)),
            ...(fetchMiddlewares<RequestHandler>(FundController.prototype.getPaginatedActionPlansForSupplier)),

            async function FundController_getPaginatedActionPlansForSupplier(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsFundController_getPaginatedActionPlansForSupplier, request, response });

                const controller = new FundController();

              await templateService.apiHandler({
                methodName: 'getPaginatedActionPlansForSupplier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_createClient: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                clientData: {"in":"body","name":"clientData","required":true,"ref":"IClientData"},
        };
        app.post('/mfb/client/sign-up',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.createClient)),

            async function ClientController_createClient(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_createClient, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'createClient',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_validateAuthenticationCheck: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/mfb/client/auth/check',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.validateAuthenticationCheck)),

            async function ClientController_validateAuthenticationCheck(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_validateAuthenticationCheck, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'validateAuthenticationCheck',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_authenticateUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                userData: {"in":"body","name":"userData","required":true,"dataType":"any"},
        };
        app.post('/mfb/client/auth',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.authenticateUser)),

            async function ClientController_authenticateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_authenticateUser, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'authenticateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_logoutUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/mfb/client/logout',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.logoutUser)),

            async function ClientController_logoutUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_logoutUser, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'logoutUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_addSchemePortfolio: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                data: {"in":"body","name":"data","required":true,"dataType":"any"},
        };
        app.post('/mfb/client/add-scheme-portfolio',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.addSchemePortfolio)),

            async function ClientController_addSchemePortfolio(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_addSchemePortfolio, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'addSchemePortfolio',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClientController_getPortfolio: Record<string, TsoaRoute.ParameterSchema> = {
                clientId: {"in":"query","name":"clientId","required":true,"dataType":"any"},
        };
        app.get('/mfb/client/get-portfolio',
            ...(fetchMiddlewares<RequestHandler>(ClientController)),
            ...(fetchMiddlewares<RequestHandler>(ClientController.prototype.getPortfolio)),

            async function ClientController_getPortfolio(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClientController_getPortfolio, request, response });

                const controller = new ClientController();

              await templateService.apiHandler({
                methodName: 'getPortfolio',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
