import { default as test, describe, it } from "node:test";
import { expect } from 'chai';
import app from '../routes/routes.js';

describe('Routes', () => {
    it('Is connected to Main Controller', function() {
        const mainRoutes = [
            { path: '/', method: 'get' },
            { path: '/login', method: 'post' },
            { path: '/import', method: 'get' },
            { path: '/home', method: 'get' },
        ];

        mainRoutes.forEach(route => {
            expect(app.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).to.equal(true);
            expect(app.stack.some((s) => s.route.path === route.path)).to.equal(true);
        });
    }),

    it('Is connected to Import Controller', function() {
        const importRoutes = [
            { path: '/importFile', method: 'post' },
        ];

        importRoutes.forEach(route => {
            expect(app.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).to.equal(true);
            expect(app.stack.some((s) => s.route.path === route.path)).to.equal(true);
        });
    }),

    it('Is connected to Repair Controller', function() {
        const repairRoutes = [
            { path: '/table', method: 'get' },
            { path: '/PTPMpost', method: 'post' },
        ];

        repairRoutes.forEach(route => {
            expect(app.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).to.equal(true);
            expect(app.stack.some((s) => s.route.path === route.path)).to.equal(true);
        });
    })
});