const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until,
	keys = webdriver.keys;
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();

options.addArguments("user-data-dir=c:/Users/Derex/AppData/Local/Google/Chrome/User Data/DC/");
const driver = new webdriver.Builder()
	.forBrowser('chrome')
	.setChromeOptions(options)
	.build();

driver.get('http://www.facebook.com/groups/');

const flatten = (arr => {
	return arr.reduce((previous, current) => previous.concat(current), []);
});

const extractElement = arr => {
	return arr
		.map(async elem => 'https://www.facebook.com/groups/' + /[^\_]+\_([^\n]+)/
			.exec(await elem.getAttribute('id'))[1])
};

const getLinksGroups = async () => {
	const nLi = await driver
		.findElement({ css: '.uiList.mam._509-._4ki._4ks' })
		.findElements({ xpath: './li' })
	nLi.forEach(async element => {
		const vLI = await element.findElements({ css: 'li>ul>li' })
		const vl1 = flatten(vLI)
		const vl2 = extractElement(vl1)
		browseGroups(vl2);
	})
};

const sendMsg = async () => {
	try {
		await driver.wait(until.elementsLocated({ css: '._4h97._30z._4h96' }));
		await driver.findElement({ css: '._4h98' }).click();
		await driver.wait(until.elementsLocated({ css: '._1mf._1mj' }));
		await driver.executeScript('const text = document.querySelector("._1mf._1mj");text.innerHTML = `testt`;event = document.createEvent("UIEvents");event.initUIEvent("input", true, true, window, 1);text.dispatchEvent(event);')
	} catch (error) {
		console.log(error);
	}
}

const browseGroups = async (arr) => {
	arr.forEach(async (elem, index) => {
		driver.get(elem);
		pageElem();
		await sendMsg();
	})
}

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups()
		.then(arrLinks => console.log(arrLinks))
		.catch(console.log);
});