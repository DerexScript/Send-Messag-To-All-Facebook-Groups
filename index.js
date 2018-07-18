const webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until, keys = webdriver.keys;
let chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();

options.addArguments("user-data-dir=c:/Users/Derex/AppData/Local/Google/Chrome/User Data/DC/");
let driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();

driver.get('http://www.facebook.com/groups/');


let getLinksGroups = (() => {
	return new Promise(resolve => {
		driver.findElement({ css: '.uiList.mam._509-._4ki._4ks' }).then((ncol) => {
			ncol.findElements({ xpath: './li' }).then((lis) => {

				const results = lis.map((obj) => {
					obj.findElements({ css: 'li>ul>li' }).then((lisgroups) => {
						lisgroups[k].getAttribute("id").then((idattr) => {

						});
					});
				});

				console.log(results);
				/*
				for (let i = 0; i < lis.length; i++) {
					lis[i].findElements({ css: 'li>ul>li' }).then((lisgroups) => {
						for (let k = 0; k < lisgroups.length; k++) {
							lisgroups[k].getAttribute("id").then((idattr) => {
								console.log(/[^\_]+\_([^\n]+)/.exec(idattr)[1]);
							});
							if (i == lis.length - 1 && k == lisgroups.length - 1) {
								//console.log(arrLinkGroups);
							}
						}
					});
				}*/


			})
		});
	});
})

driver.wait(until.elementLocated({ css: '._38my' })).then(() => {
	getLinksGroups().then((linkGroups) => {
		console.log(linkGroups);
	})
});

setTimeout(() => {
	driver.quit();
}, 15000);