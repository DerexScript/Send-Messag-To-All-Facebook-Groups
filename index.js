const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until,
	keys = webdriver.keys;
let chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();

options.addArguments("user-data-dir=c:/Users/Derex/AppData/Local/Google/Chrome/User Data/DC/");
let driver = new webdriver.Builder()
	.forBrowser('chrome')
	.setChromeOptions(options)
	.build();

driver.get('http://www.facebook.com/groups/');

let getLinksGroups11 = (() => {
	return new Promise(async resolve => {
		let liDir = await driver.findElement({ css: '.uiList.mam._509-._4ki._4ks' });
		let nLi = await liDir.findElements({ xpath: './li' });
		let nLinks = await Promise.all(nLi.map(async (elem, index) => {
			return await elem.findElements({ css: 'li>ul>li' });
		}))
		resolve(nLinks);
	})
});

const getLinksGroups = () => new Promise((resolve, reject) => {
    driver
        .findElement({ css: '.uiList.mam._509-._4ki._4ks' })
        .findElements({ xpath: './li' })
        .then(nLi => Promise.all(nLi
            .map(element => element.findElements({ css: 'li>ul>li' }))))
        .then(resolve)
        .catch(reject);
});


driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups().then((Arrlinks)=>{
		console.log(Arrlinks);
	})
});

setTimeout(() => {
	driver.quit();
}, 15000);