// const config = {
//     testMatch: ['**/*.test.mjs'],
//     moduleFileExtensions: ['js', 'mjs'],
//     // extensionsToTreatAsEsm: ['.mjs'],
// };

// module.exports = config;

// jest.config.js
module.exports = {
    // ...other config options...
    // verbose: true,
    // transform: {},
    testMatch: ['**/*.test.js', '**/*.test.mjs'],
    moduleFileExtensions: ['js', 'mjs'],
};
