const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, context) => {
    return merge(config, {
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    memoryLimit: 4096
                }
            })
        ]
    });
};
