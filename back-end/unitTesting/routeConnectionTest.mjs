import { default as test, describe, it } from "node:test";
import { expect } from 'chai';
import { app, dynamicImport } from '../routes/routes.js';
// import dynamicImport from "../routes/routes.js";

describe('Routes', () => {
    it('Is connected to Main Controller', function() {
        const mainRoutes = [
            { path: '/', method: 'get' },
            { path: '/login', method: 'post' },
            { path: '/import', method: 'get' },
            { path: '/home', method: 'get' },
        ];

        mainRoutes.forEach(route => {
            const routeExists = app.stack.some((layer) => {
                return layer.route && layer.route.path === route.path && layer.route.methods[route.method];
            });

            expect(routeExists).to.equal(true);
        });
    }),

    it('Is connected to Import Controller', async function() {
        const importRoutes = [
            { path: '/importFile', method: 'post' },
        ];

        await dynamicImport();

        importRoutes.forEach(route => {
            const routeExists = app.stack.some((layer) => {
                return layer.route && layer.route.path === route.path && layer.route.methods[route.method];
            });

            expect(routeExists).to.equal(true);
        });
    })

    it('Is connected to Repair Controller', function() {
        const repairRoutes = [
            { path: '/table', method: 'get' },
            { path: '/IQPMpost', method: 'post' },
            { path: '/TDPMpost', method: 'post' },
            { path: '/PTPMpost', method: 'post' },
            { path: '/TIQPT', method: 'post' },
            { path: '/AWDPT', method: 'post' },
        ];

        repairRoutes.forEach(route => {
            const routeExists = app.stack.some((layer) => {
                return layer.route && layer.route.path === route.path && layer.route.methods[route.method];
            });

            expect(routeExists).to.equal(true);
        });
    })
});