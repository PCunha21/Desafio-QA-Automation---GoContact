//Desafio QA Automation - GoContact
//Pedro Cunha

var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
	By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder().forBrowser('chrome').build();

//Site = https://www.amazon.co.uk

driver.get('https://www.amazon.co.uk');

//Para estes testes vai ser usado uma conta criada previamente com os seguintes dados:

//pedrocunhateste@gmail.com
//pass: teste12345
//nome: pedrocunha_teste

//1 - Validar cenário de Criar conta nova: Criar conta nova com user já existente => validar que o site não permite

function tarefa1(driver,test,By,until)
{
	driver.get('https://www.amazon.co.uk/ap/register?showRememberMe=true&openid.pape.max_auth_age=0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=gbflex&openid.return_to=https%3A%2F%2Fwww.amazon.co.uk%2F%3Fref_%3Dnav_em_link_re_signin%26_encoding%3DUTF8&prevRID=C7AJZEZS83YF8NDZ3E8N&openid.assoc_handle=gbflex&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&ref_=nav_em_T2_0_1_0_6_link_clc_signin&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ubid=262-4118636-7850819');

	var userName_r = driver.wait(until.elementLocated(By.id('ap_customer_name')), 120);
	var email_r = driver.wait(until.elementLocated(By.id('ap_email')), 120);
	var password_r = driver.wait(until.elementLocated(By.id('ap_password')), 120);
	var password_check_r  = driver.wait(until.elementLocated(By.id('ap_password_check')), 120);

	userName_r.sendKeys("Pedro Cunha");
	email_r.sendKeys("pedrocunhateste@gmail.com");
	password_r.sendKeys("teste123456");
	password_check_r.sendKeys("teste123456");

	//Se a password for igual à da conta previamente criada, o site faz login com essa mesma conta. Sendo assim é necessário colocar uma password diferente para o site detetar que a conta já existe.
	driver.sleep(200).then(() => {driver.wait(until.elementLocated(By.id('a-autoid-0')), 120).click().then(() =>
		{	
			driver.getCurrentUrl().then(url => {
	    	if(url != 'https://www.amazon.co.uk/?ref_=nav_em_link_re_signin&_encoding=UTF8&' || url != 'https://www.amazon.co.uk/ap/cvf/request?arb=e5a6c65e-3e2d-44fc-8ee4-6811f4bc7917')
			{
				var erro1 = driver.findElement(By.className('a-section auth-pagelet-container')).getText();
				var erro1 = driver.findElements(By.className('a-alert-heading'))
				erro1.then(text => { text[1].getText().then(textfin => console.log("1:",textfin))
				});
			};})
		});;
	})
}
//2 - tentar fazer login com o user e criado mas com password errada => deve falhar
//3 - tentar fazer login com o user e criado e com password correta => deve ter sucesso

function tarefa2e3(driver,test,By,until,login,password,num)
{
	driver.get('https://www.amazon.co.uk/ap/signin?openid.assoc_handle=gbflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.co.uk%2F%3Fref_%3Dnav_em_link_re_signin%26_encoding%3DUTF8&ref_=nav_em_T3_0_1_0_10_link_clc_signin');

	var email_l = driver.wait(until.elementLocated(By.id('ap_email')), 120);
	var password_l = driver.wait(until.elementLocated(By.id('ap_password')), 120);

	driver.sleep(200).then(() => {email_l.sendKeys(login);
		driver.sleep(200).then(() => {password_l.sendKeys(password);

	driver.sleep(200).then(() => {driver.wait(until.elementLocated(By.id('signInSubmit')), 120).click().then(() =>
		{driver.getCurrentUrl().then(url => {
			
			if(url ==  "https://www.amazon.co.uk/?ref_=nav_em_link_re_signin&_encoding=UTF8&")
			{
				console.log("%d: Login Efetuado!",num);
			}
	    	else
	    	{	
	    		var erro2 = driver.findElement(By.className('a-alert-content')).getText();
				erro2.then(text => {console.log("%d: %s",num,text);});
			}
			});});;})
		});;
	})
};

//4 - pesquisar pelo livro: chasing Excellence

function tarefa4(driver,test,By,until,obj,tipo)
{
	driver.wait(until.elementLocated(By.id('searchDropdownBox')),120).sendKeys(tipo);
	var search = driver.wait(until.elementLocated(By.id('twotabsearchtextbox')), 120);
	driver.sleep(200).then(() => {search.sendKeys(obj);

		driver.wait(until.elementLocated(By.className('nav-input')), 120).click().then(() => {
		
		var resultados = driver.wait(until.elementLocated(By.className('a-section a-spacing-small a-spacing-top-small')),120).getText();
		resultados.then(text => {

//4.1 Confirmar que tenho resultado
		if(parseInt(text.split("results")[0],10)>0)
		{
			resultados.then(text => {console.log("4.1:",text);})
			driver.wait(until.elementLocated(By.className('a-section aok-relative s-image-fixed-height')), 120).click();
			
//4.2 Procurar pelo nome do autor. Validar se tem no nome Bergeron
			var autor = driver.wait(until.elementLocated(By.className('a-link-normal contributorNameID')), 120).getText();
			autor.then(text => {console.log("4.2: Autor: ",text)
			driver.wait(until.elementLocated(By.className('a-link-emphasis a-text-bold')), 120).click().then(() => {driver.getCurrentUrl().then(url => {
//4.3 Procurar nos comentários: identificar se temos comentário de user: Cerith Leighton Watkins	
			driver.wait(until.elementLocated(By.xpath("//input[@type='search']")),120).sendKeys('Cerith Leighton Watkins');
			driver.wait(until.elementLocated(By.className('a-button-input')),120).click().then(() => {
			resultados2 = driver.wait(until.elementLocated(By.className('a-section a-spacing-top-large a-text-center no-reviews-section')),120).getText();
			resultados2.then(text2 => {console.log("4.3:",text2);
				driver.executeScript("window.scrollTo(0, 0);");
//4.4 Inserir comentário: "gostei de ler"	
			driver.wait(until.elementLocated(By.className("a-button-inner")),120).click().then(()=>{

			var erro3 = driver.wait(until.elementLocated(By.className('a-color-error ryp__icon-alert__text')),12000).getText();
			erro3.then(text => {console.log("4.4:",text);

//4.5 Pesquisar por comentários com 1 estrela: 
			driver.get(url + '&filterByStar=one_star&pageNumber=1');
			console.log("4.5: (Pesquisar por comentários com 1 estrela)")
//4.6 Validar se existe algum comentário com a data de 17 September 2017
			var datas = driver.findElements(By.className('a-size-base a-color-secondary review-date'));
			var aux = 0;
			var aux2 = 0;
			datas.then(erro=>{
			for(var i in erro)
			{
				erro[i].getText().then(erro2 => 
				{
					if(erro2 == '17 September 2017')
					{
						if(aux != 1)
						{
							console.log("4.6: Existe um comentário com a data de 17 de Setembro de 2017")
						}
						aux = 1;
					}
					else
					{
						if(aux == 0 && aux2 == erro.length-1)
						{
							console.log("4.6: Não existem comentários com a data de 17 de Setembro de 2017")
						}
					}
					aux2 ++;
			    })
			}})
			
				})});


		});})});});});}
	
		else
		{
			//nao funciona
			console.log("4.6: Não existem resultados para a pesquisa efetuada!");
		}

	});});
	})
}

//5. Pesquisar por "avengers"
function tarefa5(driver,test,By,until,obj,tipo)
{
	driver.wait(until.elementLocated(By.id('searchDropdownBox')),120).sendKeys(tipo);
	var search = driver.wait(until.elementLocated(By.id('twotabsearchtextbox')), 120);
	driver.sleep(200).then(() => {search.sendKeys(obj);

		driver.wait(until.elementLocated(By.className('nav-input')), 120).click().then(() => {
			var nrpag = driver.findElements(By.className('a-disabled'));
			nrpag.then(nrpags =>{nrpags[1].getText().then(nr => {
				for(var i=0; i < nr; i++)
				{
					//5.1 verificar se o filme "Avengers Assemble" aparece nos resultados
					var aux = 0;
					var link = driver.findElement(By.xpath("//span[text() = 'Avengers Assemble']")).catch( (err) => 
					{ 
					   aux = 1;
					}).then(() =>
					{
						if(aux == 0)
						{
							console.log("5.1: Avengers Assemble aparece nos resultados")
							driver.findElement(By.xpath("//span[text() = 'Avengers Assemble']")).click()

							var desc = driver.wait(until.elementLocated(By.id('productDescription')),1200).getText()

							desc.then(descr =>
								{
									//5.2 clicar nesse titulo. Verificar se a descrição tem a string "S.H.I.E.L.D"	
									if(descr.includes("S.H.I.E.L.D"))
									{	
										console.log("5.2: A string 'S.H.I.E.L.D' aparece na descrição");
									}
									else
									{
										console.log("5.2: A string 'S.H.I.E.L.D' não aparece na descrição");
									}
								})
									//5.3 clicar em "watch Trailer". Tirar uma captura de ecran dos 10 segundos
									var fs = require('fs');
									var desc = driver.wait(until.elementLocated(By.id('videoCount')),120).click()
									
									
							
									driver.sleep(14500).then(() => {
										driver.takeScreenshot().then(function(data){
										console.log("5.3: Criado um screenshot denominado 'trailer.png' dos 10 segundos");
										fs.writeFileSync('trailer.png',data,'base64')
										driver.wait(until.elementLocated(By.id('vse-ns-airy-container-element')),12000).click()
										});
									})
						}
					});
					break;
					driver.wait(until.elementLocated(By.className('a-last')), 120).click()
				}
			})});
	});
	});
}

//6. No Shop by Department: selecionar Sports & Outdoors -> fitness
function tarefa6(driver,test,By,until,waitForUserInput)
{
	driver.get("https://www.amazon.co.uk/gp/site-directory?ref_=nav_shopall_btn").then(()=>{
	
	driver.findElement(By.xpath("//a[text() = 'Fitness']")).click()

//Procurar nas featured Brands se temos "Adidas" -> tirar foto
	
	driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'See more')]"),120)).click().then(()=>{
	driver.findElement(By.xpath("//a[text() = 'A']")).click().then(()=>{
		var aux = 0;
	driver.findElement(By.xpath("//span[text() = 'adidas']")).catch((err) => {
		aux = 1;
		console.log("6.1: Adidas não aparece nos resultados")
	}).then(()=>{
		if(aux == 0)
		{
			console.log("6.1: Adidas aparece nos resultados")
			var fs = require('fs');
			driver.executeScript("arguments[0].scrollIntoView()", driver.findElement(By.xpath("//span[text() = 'adidas']"))).then(()=>{
			
			driver.takeScreenshot().then(function(data){
			fs.writeFileSync('adidas.png',data,'base64')

			})});}})})})})
}

//7. https://www.amazon.jobs/en-gb
function tarefa7(driver,test,By,until)
{
	driver.get('https://www.amazon.jobs/en-gb')

//7.1 Pesquisar por empregos em "Portugal, setubal" => verificar que tenho 1 ou mais
	driver.wait(until.elementLocated(By.className('undefined form-control tt-input')), 120).sendKeys("setubal").then(()=>{
		driver.wait(until.elementLocated(By.id('search-button')), 120).click().then(()=>{
			var nr = driver.wait(until.elementLocated(By.className('col-sm-6 job-count-info')), 12000).getText().then(num=>{

				console.log("7.1:",num.split(" of ")[1]);
				//7.2 Alterar o filtro para 5 mi => verificar que não tenho nenhum resultado
				driver.findElement(By.xpath("//button[text() = '5']")).click().then(()=>{
					driver.wait(until.elementLocated(By.className('text no-results')), 1200).getText().then(res =>{
						console.log("7.2:",res)
				//7.3 Pesquisar por "software" -> verificar que o autocomplete sugere software Development
				driver.get('https://www.amazon.jobs/en-gb/search?base_query=s&loc_query=');
				driver.wait(until.elementLocated(By.className("form-control tt-input")), 12000).sendKeys("oftware").then(()=>{
					var textaux = driver.wait(until.elementLocated(By.className("keyword-texts")), 12000)
					textaux.getText().then(text=> console.log("7.3:", text))
					//7.4 Clicar na sugestão => software development e pesquisar. Na category filtrar por "Solutions Architect" => verificar se tenho algum para "San Francisco"
					textaux.click().then(()=>{
					driver.wait(until.elementLocated(By.className('search-button btn float-left d-none d-md-block form-control')), 120).click().then(()=>{
					
					driver.getCurrentUrl().then(url => {
						driver.get(url + '&category=solutions-architect').then(()=>{
						driver.wait(until.elementLocated(By.className("display-all-trigger btn")), 12000).click().then(()=>{
						driver.getCurrentUrl().then(url2 => {
						driver.get(url2 + '&cities[]=San%20Francisco%2C%20California%2C%20USA').then(()=>{

						driver.wait(until.elementLocated(By.className('text no-results')), 1200).getText().then(res => console.log("7.4:",res)).catch((err) => 
						{
							driver.wait(until.elementLocated(By.className('checkbox-option btn checkbox-selected')), 1200).getText().then(nrjob => {
						console.log("7.4:",nrjob)

						})


							
						})

						})
							


						})
						})
					})
					})
							})
						})
					})
				})
			})
		})
	})
})
}



console.log("Desafio QA Automation - GoContact\nPedro Cunha\n");


//Executar as tarefas todas

tarefa1(driver,test,By,until);
driver.sleep(10000).then(() => {
	tarefa2e3(driver,test,By,until,"pedrocunhateste@gmail.com","teste123456",2);
	driver.sleep(7000).then(() => {tarefa2e3(driver,test,By,until,"pedrocunhateste@gmail.com","teste12345",3);
	driver.sleep(9000).then(() => {tarefa4(driver,test,By,until,"chasing Excellence","Books",4);
	driver.sleep(7000).then(() => {tarefa5(driver,test,By,until,"avengers","DVD & Blu-ray");
	driver.sleep(20000).then(() => {tarefa6(driver,test,By,until);
	driver.sleep(7000).then(() => {tarefa7(driver,test,By,until);
	})})})})})})

//Caso o site detecte que é um bot e meta captcha para não permitir fazer o login é necessário executar as tarefas individualmente:
//Apenas a tarefa 4 é que necessita de fazer login, as outras funcionam sem login.

//tarefa1(driver,test,By,until);
//tarefa2e3(driver,test,By,until,"pedrocunhateste@gmail.com","teste123456",2); 
//tarefa2e3(driver,test,By,until,"pedrocunhateste@gmail.com","teste12345",3);

//tarefa2e3(driver,test,By,until,"pedrocunhateste@gmail.com","teste12345",3);
//driver.sleep(20000).then(()=>tarefa4(driver,test,By,until,"chasing Excellence","Books",4))

//tarefa5(driver,test,By,until,"avengers","DVD & Blu-ray");
//tarefa6(driver,test,By,until);
//tarefa7(driver,test,By,until);


//.then(()=>(driver.quit()));;





