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

let flatten = (arr => {
	return arr.reduce((previous, current) => previous.concat(current), []);
})

let getLinksGroups = () => new Promise((resolve, reject) => {
	driver
		.findElement({ css: '.uiList.mam._509-._4ki._4ks' })
		.findElements({ xpath: './li' })
		.then(nLi => Promise.all(nLi
			.map(element => element.findElements({ css: 'li>ul>li' }))))
		.then(arrLinks => flatten(arrLinks))
		.then(resolve)
		.then(reject);
});

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups()
		.then(arrLinks => console.log(arrLinks));
});

setTimeout(() => {
	driver.quit();
}, 15000);