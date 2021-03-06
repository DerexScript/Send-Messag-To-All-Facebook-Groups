const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until,
	keys = webdriver.keys;
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();

//options.addArguments("user-data-dir=c:/Users/Derex/AppData/Local/Google/Chrome/User Data/DC/");
options.addArguments("user-data-dir=c:/Users/Derex/AppData/Local/Google/Chrome/User Data/SK/");
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

const getLinksGroups = (msg) => new Promise((resolve, reject) => {
	driver
		.findElement({ css: '.uiList.mam._509-._4ki._4ks' })
		.findElements({ xpath: './li' })
		.then(nLi => Promise.all(nLi
			.map(element => element.findElements({ css: 'li>ul>li' }))))
		.then(arrElem => resolve(arrElem))
		.then(reject);
});

const sendMsg = (msg) => new Promise(async (resolve) => {
	await driver.wait(until.elementsLocated({ css: '._4h97._30z._4h96' }));
	await driver.findElement({ css: '._4h98' }).click();
	await driver.wait(until.elementsLocated({ css: '._1mf._1mj' }), 2500);
	await driver.executeScript("const text = document.querySelector('._1mf._1mj');text.innerText = `Clã: DsKillers\nClã Tag: #JRQYGJ9U\nLink De Convite:https://link.clashofclans.com/?action=OpenClanProfile&tag=JRQYGJ9U\nClã consistente em guerras e em jogos de clã, Fechamos todos jogos de clã!\nRecrutamos CV6+ para guerras e jogos de clã!\nNão aceitamos vilas rushadas!\nClã Forum: http://dskillers.cf/forum/`;event = document.createEvent('UIEvents');event.initUIEvent('input', true, true, window, 1);text.dispatchEvent(event); window.scrollTo(0, 400); return 0;");
	setTimeout(async () => {
		const btnSendMsg = await driver.findElement({ css: '._1mf7._4jy0._4jy3._4jy1._51sy.selected._42ft' });
		await btnSendMsg.click()
			.then(() => {
				Console.log('Enviado!');
			}).catch(() => btnSendMsg.submit());
	}, 1000);
	setTimeout(() => {
		resolve();
	}, 7000)
})

const browseGroups = async (arr, msg) => {
	for (let i = 0; i < await arr.length; i++) {
		driver.get(arr[i]);
		await sendMsg(msg);
	}
}

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups()
	.then(arrElem => flatten(arrElem))
	.then(extractElem => extractElement(extractElem))
	.then(Arrlinks => browseGroups(Arrlinks, "msgm"));
});