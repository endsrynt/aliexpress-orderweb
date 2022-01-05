const puppeteer = require('puppeteer');
const chalk = require('chalk');
const moment = require('moment');
const delay = require('delay');
const readline = require("readline-sync");
const fs = require('fs-extra');
var random = require('random-name')
var randomize = require('randomatic');
var Fakerator = require("fakerator");
const randomstring = require("randomstring");


(async () => {


    //INPUT TOKEN
    var linklogin = readline.question(chalk.yellow('[?] List account (ex: token.txt): '))

    console.log('\n');
    const read = fs.readFileSync(linklogin, 'UTF-8');
    const list = read.split(/\r?\n/);
    for (var i = 0; i < list.length; i++) {
    var token = list[i];

    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Account => ${i}`))       
    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Token => ${token}`))

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        ignoreHTTPSErrors: true
    })

    const optionlink = {
        waitUntil : 'networkidle2',
        setTimeout : 60000,
    };
    const optionbtn = {
        visible:true,
        timeout:60000
    };
    
    const page = await browser.newPage();

    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for login`))

    await page.goto(`${token}`,optionlink);
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Login success`))


    //SET ADDRESS
    await page.goto('https://ilogisticsaddress.aliexpress.com/addressList.htm',optionlink)

    try{
        await page.click("#address-main > div > div > div:nth-child(2) > div > div:nth-child(5) > button:nth-child(2)")
        await delay(1000)
        await page.click("body > div.next-overlay-wrapper.opened > div.next-dialog.next-closeable.next-overlay-inner > div.next-dialog-footer.next-align-right > button.next-btn.next-medium.next-btn-primary.next-dialog-btn")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Delete old address`))
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Set New Address`))
    }catch(err){
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Set New Address`))
    }

    var fakerator = Fakerator("en-CA");
    var address = fakerator.address.street()
    var address2 = fakerator.address.street()    
    const randomcity1 = randomstring.generate({length: 1,charset: '31542'}); 
    const fileranprov = fs.readFileSync(`./listprovinsi.txt`, 'utf-8');
    const splitFileranprov = fileranprov.split('\r\n');
    var ranprovinsi = splitFileranprov[Math.floor(Math.random()*splitFileranprov.length)];

await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i",optionbtn)
await page.tap("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > span > span > span.next-input-control > span > i")
await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span",optionbtn)
await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > span > span > span", "indonesia")
await delay(800)
await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div",optionbtn)
await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div.list_country > span > div > div > div > ul > li > div")
await delay(500)
    await page.waitForSelector("#contactPerson",optionbtn)
    await page.type("#contactPerson",`${random.first()} ${randomize('A', 1)}. ${random.last()}`)
    await delay(500)
    await page.click("#phoneCountry",{clickCount:3})
    await page.type("#phoneCountry","+62")
    await delay(500)
    await page.type("#mobileNo",`8${randomize('0', 10)}`)
    await delay(500)
    await page.type("#address",`${address} ${randomize('a', 5)} ${address2}`)
    await delay(500)
    await page.type("#zip",`${randomize('0', 3)}${randomize('a', 3)}`)
    await delay(500)
await page.click("div.selector-item:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > em:nth-child(1)")
await delay(800)
await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
await delay(800)
await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span")
await page.type("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > span > span > span > span",ranprovinsi)
await delay(800)
await page.waitForSelector("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li",optionbtn)
await page.click("#address-main > div > div > div > div > div.group-content.addressInfo > div.input-default.country > div > div:nth-child(2) > span > div > div > div > ul > li")
await delay(500)
await page.click("div.selector-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > em:nth-child(1)")
await delay(1000)
await page.waitForSelector(`.opened > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(${randomcity1})`,optionbtn)
await page.click(`.opened > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(${randomcity1})`)
await delay(500)
await page.waitForSelector("#address-main > div > div > div > div > div.address-save > button",optionbtn)
await page.click("#address-main > div > div > div > div > div.address-save > button")
await page.waitForSelector('#address-main > div > div > div.address-list-wrap > div > div.address-detail.big-detail > div')
const pcitys = await page.$eval('#address-main > div > div > div.address-list-wrap > div > div.address-detail.big-detail > div',(el) => el.innerText);
console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success set address to : ${pcitys}`))

    //DELETE CART
    await page.goto('https://m.id.aliexpress.com/shopcart/list.html#/',optionlink);

    if (await page.$('#shopcart-app > div > div > div:nth-child(2) > div > div > span > div > div:nth-child(3) > div'))
    {
        await page.click("#shopcart-app > div > div > div:nth-child(2) > div > div > span > div > div:nth-child(3) > div")
        await delay(600)
        await page.waitForSelector("#shopcart-app > div > div > div > header > div > div > div > svg > use",optionbtn)
        await page.click("#shopcart-app > div > div > div > header > div > div > div > svg > use")
        await delay(600)
        await page.waitForSelector("#shopcart-app > div > div > div > header > div > div:nth-child(2) > svg > use",optionbtn)
        await page.click("#shopcart-app > div > div > div > header > div > div:nth-child(2) > svg > use")
        await delay(1000)
        await page.click("body > div.flex.justify-center.align-center._3zxBO > div > span > div > div:nth-child(3) > div:nth-child(2)")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success delete all item in cart `))
        await delay(600)

    }
    

        //ADD CART1
        await page.goto("https://m.id.aliexpress.com/item/1005003230523068.html",optionlink)

        try{
            await delay(800)
            await page.click("#smartbanner-main > div.smartbanner-ui__dialog > div > div > img")
        }catch(err){}
        
        const product1= randomstring.generate({length: 1,charset: '132'}); 
        const productname1 = await page.$eval('#root > div:nth-child(4) > div:nth-child(2) > span',(el) => el.innerText);
    
        await page.waitForSelector("#action-bar > div > a",optionbtn)
        await page.click("#action-bar > div > a")
        await delay(1200)
        await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product1}) > img`,optionbtn)
        await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product1}) > img`)
        await delay(1200)
        await page.waitForSelector("#action-bar > div > a",optionbtn)
        await page.click("#action-bar > div > a")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success add product to cart : ${productname1}`))
        await delay(800)
    
    
        //ADD CART2
        await page.goto("https://m.id.aliexpress.com/item/1005003379937583.html",optionlink)
        await delay(800)
    
        const product2= randomstring.generate({length:1,charset:'914673825'}); 
        try{
            var productname2 = await page.$eval('#root > div:nth-child(4) > div:nth-child(2) > span',(el) => el.innerText);
        }catch(e){
            var productname2 = await page.$eval('#root > div:nth-child(5) > div:nth-child(2) > span',(el) => el.innerText);
        }
        await page.waitForSelector("#action-bar > div > a",optionbtn)
        await page.click("#action-bar > div > a")
        await delay(1000)
        await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product2}) > img`,optionbtn)
        await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.sku-panel--property--3YeEpFD > div.sku-panel--skus--3PMc-6q > div:nth-child(${product2}) > img`)
        //await delay(800)
        //await page.waitForSelector(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div:nth-child(5) > div.sku-panel--skus--3PMc-6q > span`,optionbtn)
        //await page.click(`body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div:nth-child(5) > div.sku-panel--skus--3PMc-6q > span`)
        //await delay(800)
        //await page.waitForSelector("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.quantity--container--3D-6hmh > div.number-picker--container--8edZVq_ > svg:nth-child(3) > use",optionbtn)
        //await page.click("body > div.modal-container.modal-drawer.sku--modal--DAuuPBD > div.drawer-container.drawer-bottom.bottom-drawer-container.sku--drawer--3wJ0Mw5 > div.scroll-panel-content.bottom-drawer-content > div > div.quantity--container--3D-6hmh > div > svg:nth-child(3) > use")
        await delay(800)
        await page.waitForSelector("#action-bar > div > a",optionbtn)
        await page.click("#action-bar > div > a")
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success add product to cart : ${productname2}`))
        await delay(500)
    

    //SET ORDER
    await page.goto("https://shoppingcart.aliexpress.com/shopcart/shopcartDetail.htm",optionlink)

    await page.waitForSelector("#root > div > div > div:nth-child(1) > div.main > div.card-container.captain-container > div > div.select-all-container > label > span > input",optionbtn)
    await page.click("#root > div > div > div:nth-child(1) > div.main > div.card-container.captain-container > div > div.select-all-container > label > span > input")
    await delay(1500)
    await page.waitForSelector("#checkout-button > span",optionbtn)
    await page.click("#checkout-button > span")

        //SET DOKU
        await page.waitForSelector("#main > div:nth-child(2) > div > div > div:nth-child(2) > div > span",optionbtn)
        await page.click("#main > div:nth-child(2) > div > div > div:nth-child(2) > div > span")
        await delay(500)
        await page.waitForSelector("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2)",optionbtn)
        await page.click("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div:nth-child(2)")
        await delay(100)
        await page.waitForSelector("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > button",optionbtn)
        await page.click("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(2) > div > div > div > button")
        await delay(800)
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success set payment to DOKU`))

            //SET FREE SHIPING

            await delay(850)
            await page.waitForSelector("#main > div.card-container.orders-list > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(4)",optionbtn)
            await page.click("#main > div.card-container.orders-list > div > div:nth-child(2) > div > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(4)")
            await delay(500)
            await page.waitForSelector("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(2) > div > label > span > input",optionbtn)
            await page.click("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div > div > div > div > div > div > div:nth-child(2) > div > label > span > input")
            await delay(500)
            await page.waitForSelector("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > button",optionbtn)
            await page.click("body > div.next-overlay-wrapper.opened > div:nth-child(2) > div > div:nth-child(2) > button")
            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Success set to free shipping`))

//MAKE PAYMENT
await page.waitForSelector('#checkout-button')
const placeHolder = await page.$('#checkout-button')
await placeHolder.click()
console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] try to make payment`))

try{
await delay(3000)
const placeHolder = await page.$('#checkout-button')
await placeHolder.click()
console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] try to make payment again`))
}catch(err){}
try{
    await page.waitForSelector("#dw_user",optionbtn)
    await page.type("#dw_user", "endsrynt@gmail.com")
    await page.waitForSelector("#dw_pass",optionbtn)
    await page.type("#dw_pass", "polos123321A")
    await page.waitForSelector("#DOKU-SUBMIT-LANG",optionbtn);
    await page.click("#DOKU-SUBMIT-LANG");

        await delay(5000);
        await page.waitForSelector("#pin", "4215")
        await page.type("#pin", "4215")
        await page.waitForSelector("#form-payment-w > div.default-btn.bg-paybtn.radius.btnsignin-dw > input",optionbtn);
        await page.click("#form-payment-w > div.default-btn.bg-paybtn.radius.btnsignin-dw > input");
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Payment Success`))
        await delay(4000)

        await fs.appendFile('succes.txt', `${token}`+'\r\n', err => {
            if (err) throw err;
        })
        await browser.close()
        
        var files = fs.readFileSync(linklogin, 'utf-8');
        var lines = files.split('\n')
        lines.splice(0,1)
        await fs.writeFileSync(linklogin, lines.join('\n'))

        

    var changip = readline.question(chalk.yellow('[?] CHANGE IP, Done? (y/n): '))
    
    if(changip == "y")
    {
        continue;
    }else{
        break;
    }
    }catch(err)
    {
        console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] FAILED ORDER CLOSED`))

        await browser.close()

        // seve file
        await fs.appendFile('closed.txt', `${token};CLOSED`+'\r\n', err => {
        if (err) throw err;
        })
        await browser.close()
    
        var files = fs.readFileSync(linklogin, 'utf-8');
        var lines = files.split('\n')
        lines.splice(0,1)
        await fs.writeFileSync(linklogin, lines.join('\n'))

        var closed = readline.question(chalk.yellow('[?] Continue? y/n : '))

        if(closed == "y"){
            continue;
        }else{
            break;
        }
    
    
   
    }
}
})();