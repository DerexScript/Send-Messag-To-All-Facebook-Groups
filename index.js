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


let getLinksGroups = (() => {
	return new Promise(resolve => {
		driver.findElement({ css: '.uiList.mam._509-._4ki._4ks' }).then((ncol) => {
			ncol.findElements({ xpath: './li' }).then((lis) => {
				lis.map((elem, index, lis) => {
					lis[index].findElements({ css: 'li>ul>li' }).then((lisgroups) => {
						lisgroups.map((elem1, index1, lisgroups) => {
							elem1.getAttribute("id").then((idattr) => {
								return /[^\_]+\_([^\n]+)/.exec(idattr)[1];
							});
						})
					});
				});
			});
		});
	});
});

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups().then((vetorlinks)=>{
		console.log(vetorlinks.length);
	});
});

setTimeout(() => {
	driver.quit();
}, 15000);