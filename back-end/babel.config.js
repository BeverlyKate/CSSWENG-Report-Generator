// babel.config.js
module.exports = {
    // "transform": {
    //     "\\.[m]js?$": "babel-jest",
    //     // "\\.css$": "some-css-transformer",
    // },
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-react-jsx'],
};
