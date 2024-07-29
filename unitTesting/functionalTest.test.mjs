import { expect, jest, test, describe, it } from '@jest/globals';
// import { default as test, describe, it } from "node:test";
import importController, { insertRepair } from '../controllers/functionalTestController.mjs';
import mainController from '../controllers/mainController.js';
import repairModel from '../models/repairSchema.js';
import repairIdModel from '../models/repairIdSchema.js';
import { IncomingForm } from 'formidable';

describe('Import Controller', () => {
    it('should save repair data', async function() {
        const mockSave = jest.fn();
        const mockInsertMany = jest.fn();

        // Mock the repairIdModel save method
        jest.spyOn(repairIdModel.prototype, 'save').mockImplementation(mockSave);
        // Mock the repairModel inserMany method
        jest.spyOn(repairModel, 'insertMany').mockImplementation(mockInsertMany);

        // Mock any necessary data or input
        const excelValues = [
            null,                  '45391',         '1',
            'Alice',               'FRAME EZ-112A', 'NULL',
            '1',                   'pc',            'mj',
            'ACCESSORIES',         '3',             '12108030',
            '2',                   '45399',         '45400',
            'DANIEL',              'CHRISTIAN',     'DONE',
            'FORWARDED',           'NULL',          '1234',
            '112',                 '45408',         'Repair',
            'NO SOUND / NO AUDIO'
        ];

        // Call the insertRepair function
        insertRepair(excelValues).then(() => {
            expect(mockSave).toHaveBeenCalled();
            expect(mockInsertMany).toHaveBeenCalled();
        }).catch(error => {
            console.log("insertRepair error: " + error);
        });
    }),

    it('should import file', async function() {
        const mockParse = jest.fn();

        // Mock the formidable parse method
        jest.spyOn(IncomingForm.prototype, 'parse').mockImplementation(mockParse);

        // Create a mock request object
        const mockReq = { 
            body: { excelValues: '' }, headers: {
            host: 'localhost:3000',
            connection: 'keep-alive',
            'content-length': '16852305',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            accept: '*/*',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
            'x-requested-with': 'XMLHttpRequest',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'sec-ch-ua-platform': '"Windows"',
            origin: 'http://localhost:3000',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: 'http://localhost:3000/import',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
        }};

        // Call the importFile function
        await importController.importFile(mockReq, null).then(() => {
            expect(mockParse).toHaveBeenCalled();
        }).catch(error => {
            console.log("importFile error: " + error);
        }); // Passing null for res since we're not testing it here
    });
}),

describe('Main Controller', () => {
    describe('Login', () => {
        it('should render login', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() };

            // Create a mock request object
            const mockReq = { 
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the login function
            await mainController.login(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('login');
            }).catch(error => {
                console.log("login error: " + error);
            });
        });
    }),

    describe('Home', () => {
        it('should render home if username and password is correct', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() };

            // Create a mock request object
            const mockReq = { 
                body: { username: "Admin", password: "12345678" },
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the getMain function
            await mainController.getMain(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('home');
            }).catch(error => {
                console.log("getMain error: " + error);
            });
        }),

        it('should render login if username is incorrect', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() };

            // Create a mock request object
            const mockReq = { 
                body: { username: "", password: "12345678" },
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the getMain function
            await mainController.getMain(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('login', {
                    "error": "Invalid username or password"
                });
            }).catch(error => {
                console.log("getMain error: " + error);
            });
        }),

        it('should render login if password is incorrect', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() }

            // Create a mock request object
            const mockReq = { 
                body: { username: "Admin", password: "" },
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the getMain function
            await mainController.getMain(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('login', {
                    "error": "Invalid username or password"
                });
            }).catch(error => {
                console.log("getMain error: " + error)
            });
        });
    }),

    describe('Import', () => {
        it('should render import', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() };

            // Create a mock request object
            const mockReq = { 
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the getImport function
            await mainController.getImport(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('import');
            }).catch(error => {
                console.log("getImport error: " + error);
            });
        });
    }),
    

    describe('Home', () => {
        it('should render home', async function() {
            // Create a mock response object
            const mockRes = { render: jest.fn() };

            // Create a mock request object
            const mockReq = { 
                headers: {
                host: 'localhost:3000',
                connection: 'keep-alive',
                'content-length': '16852305',
                'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                accept: '*/*',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryyjm1HU0NM68qybG8',
                'x-requested-with': 'XMLHttpRequest',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                origin: 'http://localhost:3000',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: 'http://localhost:3000/import',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,tl;q=0.8'
            }};

            // Call the getHome function
            await mainController.getHome(mockReq, mockRes).then(() => {
                expect(mockRes.render).toHaveBeenCalledWith('home');
            }).catch(error => {
                console.log("getHome error: " + error);
            });
        });
    });
});