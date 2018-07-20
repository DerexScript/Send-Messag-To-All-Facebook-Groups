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
});

let extractElement = (arr => {
	return Promise.all(arr
		.map(async elem => 'https://www.facebook.com/groups/' + /[^\_]+\_([^\n]+)/
			.exec(await elem.getAttribute('id'))[1]))
});

let getLinksGroups = () => new Promise((resolve, reject) => {
	driver
		.findElement({ css: '.uiList.mam._509-._4ki._4ks' })
		.findElements({ xpath: './li' })
		.then(nLi => Promise.all(nLi
			.map(element => element.findElements({ css: 'li>ul>li' }))))
		.then(arrElem => flatten(arrElem))
		.then(adsad => extractElement(adsad))
		.then(links => browseGroups(links))
		.then(resolve)
		.then(reject);
});

let sendMsg = () => new Promise(async (resolve, reject) => {
	await driver.wait(until.elementsLocated({ css: '._4h97._30z._4h96' }));
	await driver.findElement({ css: '._4h98' }).click();
	await driver.wait(until.elementsLocated({ css: '._1mf._1mj' }));
	await driver.executeScript('let text = document.querySelector("._1mf._1mj");text.innerHTML = `testt`;event = document.createEvent("UIEvents");event.initUIEvent("input", true, true, window, 1);text.dispatchEvent(event);')
	resolve();
})

let browseGroups = (arr) => new Promise((resolve, reject) => {
	arr.map((elem, index) => driver
		.get(elem)
		.then(driver.wait(until.elementLocated({ css: '#seo_h1_tag' })))
		.then(sndtext => sendMsg(sndtext))
		.then(resolve));
});

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups()
		.then(arrLinks => console.log(arrLinks));
});