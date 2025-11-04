export const config = {
    runner: 'local',
    specs: ['./test/*.js'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'LNGIMVZ5ZPGA6PU4 ',
        'appium:platformVersion': '12',
        'appium:automationName': 'UIAutomator2',
        'appium:appPackage': 'io.appium.android.apis',
        'appium:appActivity': '.ApiDemos',
        'appium:noReset': true,
        'appium:ignoreHiddenApiPolicyError': true 
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
    }]],
    hostname: 'localhost',
    port: 4723,
    path: '/',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function (_, { passed }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};