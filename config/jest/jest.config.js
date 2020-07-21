
const rootDir = '../../';
const configDir = rootDir + 'config/';
const configJestDir = configDir + 'jest/';
const nodeModulesDir = rootDir + 'node_modules/';
const sourceDir = rootDir + 'src/';

module.exports = {
    verbose: true,
    // An array of glob patterns indicating a set of files for which coverage information should be collected. 
    // If a file matches the specified glob pattern, coverage information will be collected for it even if no tests exist 
    // for this file and it's never required in the test suite. 
    // https://jestjs.io/docs/en/configuration#collectcoveragefrom-array
    collectCoverageFrom: [
        sourceDir + "**/*.{js,jsx}"
    ],
    // A list of paths to modules that run some code to configure or set up the testing environment. 
    // Each setupFile will be run once per test file. Since every test runs in its own environment, 
    // these scripts will be executed in the testing environment immediately before executing the test code itself.
    // https://jestjs.io/docs/en/configuration#setupfiles-array
    setupFiles: [
        configDir + "polyfills.js"
    ],
    // The glob patterns Jest uses to detect test files. 
    // By default it looks for .js, .jsx, .ts and .tsx files inside of __tests__ folders, as well as any files with a suffix 
    // of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.
    // https://jestjs.io/docs/en/configuration#testmatch-arraystring
    testMatch: [
        sourceDir + "__tests__/components/**/*?(*.)(spec|test).js?(x)",
    ],
    // The test environment that will be used for testing. The default environment in Jest is a browser-like environment through jsdom. 
    // If you are building a node service, you can use the node option to use a node-like environment instead.
    // https://jestjs.io/docs/en/configuration#testenvironment-string
    testEnvironment: "node",
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    // https://jestjs.io/docs/en/configuration#testurl-string
    //testUrl: "http://localhost",
    // A map from regular expressions to paths to transformers. 
    // A transformer is a module that provides a synchronous function for transforming source files. 
    // https://jestjs.io/docs/en/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    transform: {
        '.js$': __dirname + '/babel-transformer.jest.js' 
    },
    // An array of regexp pattern strings that are matched against all source file paths before transformation. 
    // If the test path matches any of the patterns, it will not be transformed.
    // https://jestjs.io/docs/en/configuration#transformignorepatterns-arraystring
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.
    // https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring
    moduleNameMapper: {
        "^react-native$": "react-native-web"
    },
    // An array of file extensions your modules use.
    // If you require modules without specifying a file extension, these are the extensions Jest will look for, in left-to-right order.
    // https://jestjs.io/docs/en/configuration#modulefileextensions-arraystring
    moduleFileExtensions: [
        "web.js",
        "js",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ]
};
