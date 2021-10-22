// header("Access-Control-Allow-Origin: *");
// const cors_api_url = 'https://cors-anywhere.herokuapp.com/';

// const vaccineData = 'https://disease.sh/v3/covid-19/vaccine';


 // async function with CORS request
//  	async function doCORSRequest(options, printResult) {
//  		var dataURL = await options.url;
//  		var CORS = await cors_api_url;
//     var x = new XMLHttpRequest();

//     //start loading animation here

//     // hide content while loading data
// 	const contentOne = document.getElementById('content-one');

// 	const contentTwo =document.getElementById('content-two');

// 	contentOne.classList.add('hidden');

// 	contentTwo.classList.add('hidden');

//     x.open(options.method, CORS + dataURL);
//     x.onload = x.onerror = function() {

//     //stop loading animation here

//     const loading = document.getElementById('loading');

// 	loading.classList.add('hidden');

// 	contentOne.classList.remove('hidden');

// 	contentTwo.classList.remove('hidden');

//       printResult(x.responseText);
//     };

//     x.send(options.data);
//   }
//   	doCORSRequest({
//         method: 'GET',
//         url: vaccineData,
//       }, async function printResult(result) {

//         sessionStorage.vaccine = await result

//         getVaccineInfo();
//       });

// normal fetching of API
async function requestVaccineAPI() {
    let response = await fetch('https://disease.sh/v3/covid-19/vaccine');
    // hide content while loading data
	const contentOne = document.getElementById('content-one');

	const contentTwo =document.getElementById('content-two');

	contentOne.classList.add('hidden');

	contentTwo.classList.add('hidden');

    if (response.status === 200) {

		//stop loading animation here

		const loading = document.getElementById('loading');

		loading.classList.add('hidden');
	
		contentOne.classList.remove('hidden');
	
		contentTwo.classList.remove('hidden');
        //set json
        vaccine = await response.json();

		window.sessionStorage.vaccine = JSON.stringify(vaccine);

		getVaccineInfo(vaccine);
    }
}
requestVaccineAPI()

const getVaccineInfo = ((vaccine)=>{

	// const vaccine = JSON.parse( sessionStorage.vaccine );

	const totalCandidates = vaccine.totalCandidates;

	const vaccinePhases = vaccine.phases;

	const totalVacTxt =  document.getElementById('vaccine-data');

	totalVacTxt.innerHTML = totalCandidates;

	//vaccine phases
	for (phases = 0; phases < vaccinePhases.length; phases++) {
		// console.log(vaccinePhases[phases]);

		const numOfCandidates = vaccinePhases[phases].candidates;
		//each phase
		const phaseList = vaccinePhases[phases].phase;

		const textNodePhase = document.createTextNode(phaseList);

		//select parent element
		const vaccineContainer = document.getElementById('vaccine-phases');

		//selection
		const selection = document.getElementById('selection');

		// create element
		const thinCard = document.createElement('div');

		const thinContent = document.createElement('div');

		const phaseTxt = document.createElement('h3');

		const phaseNum = document.createElement('h3');

		const option = document.createElement('option');

		thinCard.setAttribute('class', 'thin-card');

		thinContent.setAttribute('class', 'thin-content');

		phaseTxt.setAttribute('class', 'phase-txt');

		phaseTxt.setAttribute('id', 'phase-txt');

		phaseTxt.innerHTML = `${phaseList}: `;

		phaseNum.setAttribute('class', 'phase-num');

		phaseNum.setAttribute('id', 'phase-num');

		phaseNum.innerHTML = numOfCandidates;

		thinContent.appendChild(phaseTxt);

		thinContent.appendChild(phaseNum);

		thinCard.appendChild(thinContent);

		vaccineContainer.appendChild(thinCard);

		// console.log(phaseList)
		option.value = phaseList

		option.appendChild(textNodePhase);

		selection.appendChild(option);
	};

	//each vaccine info.
	for (let vaccineData = 0; vaccineData < vaccine.data.length; vaccineData++) {

		const sponsors = [];

		const institutions = [];

		const funding = [];

		const vaccineName = vaccine.data[vaccineData].candidate;

		const sponsorsList = vaccine.data[vaccineData].sponsors;

		const institutionsList = vaccine.data[vaccineData].institutions;

		const fundingList = vaccine.data[vaccineData].funding;

		const vaccineDetails = vaccine.data[vaccineData].details;

		const trialPhase = vaccine.data[vaccineData].trialPhase;

		//replace spaces with underscores for classname
		const classPhase = trialPhase.replace(/ /g, '_');

		const classVaccineName = vaccineName.replace(/ /g, '_');

		//get all sponsors
		for(let sponsorsCount = 0; sponsorsCount < sponsorsList.length; sponsorsCount++){
			// console.log(sponsorsList[sponsorsCount]);
			sponsors.push(sponsorsList[sponsorsCount]);
		}
		//get all institutions
		for(let institutionsCount = 0; institutionsCount < institutionsList.length; institutionsCount++){
			// console.log(sponsorsList[sponsorsCount]);
			institutions.push(institutionsList[institutionsCount]);
		}
		//get all fundings
		// for(let fundingCount = 0; fundingCount < fundingList.length; fundingCount++){
		// 	// console.log(sponsorsList[sponsorsCount]);
		// 	funding.push(fundingList[fundingCount]);
		// }

		const vaccineInfoTemplate =`
		<div class="scene scene--card ${classPhase} ${classVaccineName}">
			  <div class="card-flipping">
			    <div class="card__face card__face--front">
			    	<div class="front-container">
			    		<p class="front-txt">${vaccineName}</p>
			    		<br>
			    		<p class="sub-front-txt">Trial Phase: ${trialPhase}</p>
			    	</div>
			    </div>
			    <div class="card__face card__face--back">
			    <div class="back-container">
			    		<!-- template string -->
				    <p class="back-txt">
				    	<label>Candidate:</label> ${vaccineName}
				    	<br>
				    	<br>
				    	<label>Sponsors:</label> ${sponsors}
				    	<br>
				    	<br>
					    ${vaccineDetails}
					    <br>
					    <br>
					    <label>Trial:</label> ${trialPhase}
					    <br>
					    <br>
					    <label>Institutions:</label> ${institutions}
					    <!-- <br>
					     <br>
					     <label>Funding:</label> ${funding} -->
					</p>
					</div>
			   </div>
			  </div>
			</div>`

	const vaccineList = document.getElementById('vaccine-list');

	vaccineList.insertAdjacentHTML('beforeend', vaccineInfoTemplate)

	};

	const cardFlipping = document.getElementsByClassName('card-flipping');

	const backCard = document.getElementsByClassName('card__face card__face--back');

	for(let element = 0; element < cardFlipping.length; element++){

		cardFlipping[element].addEventListener( 'click', function() {

	  		cardFlipping[element].classList.toggle('is-flipped');

	  		backCard[element].classList.toggle('scrollable')
		});
	}
})

const viewOption =(()=>{
	const selected = document.getElementById('selection').value

	const classPhase = selected.replace(/ /g, '_');

	//add hidden class to all phase card(child element)
		document.querySelectorAll('.scene--card').forEach(function(element){
  		element.classList.add('hidden');
	});

	if(selected === 'all'){
		document.querySelectorAll('.scene--card').forEach(function(element){

  		element.classList.remove('hidden');
		});
	}else{
		const selectedElement = document.getElementsByClassName(classPhase);
		//loop
		for (let element = 0; element < selectedElement.length; element++) {

			selectedElement[element].classList.remove('hidden');
		};
	}
})

const searchVaccine = (()=>{
	//set the selection value to all
	document.getElementById('selection').value = 'all'

	//hide all cards
	document.querySelectorAll('.scene--card').forEach(function(element){
  		element.classList.add('hidden');
	});

	const input =  document.getElementById('vaccineName').value

	const modInput = input.replace(/ /g, '_');

	let countResult = [];

	countResult.length = 0;

	const resultCount =  document.getElementById('result-count');

	resultCount.classList.add('hidden')

	// console.log(sessionStorage.vaccine)

	//get data
	const vaccine = JSON.parse(window.sessionStorage.vaccine)
	
	//run the for loop and look for every string that matches the user input
	for (let vaccineData = 0; vaccineData < vaccine.data.length; vaccineData++) {

		const vaccineName = vaccine.data[vaccineData].candidate;

		const vaccineClassName = vaccineName.replace(/ /g, '_');

		const regEx =  new RegExp(modInput,'ig');

		let result = regEx.test(vaccineClassName);

		if(result === true){

			const selectedElement = document.getElementsByClassName(vaccineClassName);

			//loop
			for (let element = 0; element < selectedElement.length; element++) {

				selectedElement[element].classList.remove('hidden');

				countResult.push(selectedElement[element])

				// console.log(selectedElement.length)

			};


		}

		// resultCount.innerHTML = countResult.length

		}

		if(countResult.length === 0){

			resultCount.classList.remove('hidden')

			resultCount.innerHTML = 'No results found'
		}		 
	})

// toogle option config

document.getElementById("darkmode-btn").addEventListener("click", function(){

	const value = document.getElementById("darkmode-btn").value

    const html = document.querySelector('html');
    
    const body = document.querySelector('body');

    const card = document.getElementsByClassName('card');

    const cardBack = document.getElementsByClassName('card__face--back');

    const cardBackTxt = document.getElementsByClassName('back-txt');

    const cardFront = document.getElementsByClassName('card__face--front');

    const cardFrontTxt = document.getElementsByClassName('front-txt');

    const divider = document.getElementsByClassName('divider');

    const footerTxt = document.getElementsByClassName('footer-lbl');

    const footerBtn = document.getElementsByClassName('footer-btn');

    const footerBrd = document.querySelector('footer');

    // const topDivider = document.getElementsByClassName('divider-top');

    const headerTxt = document.getElementsByClassName('header-txt');

    const option = document.querySelector('select');

    const phaseContent = document.getElementsByClassName('phase-content');

    const searchBox = document.getElementsByClassName('search-box');

    const selection =document.getElementById('selection');
    //sub text header
    const subTxt = document.getElementsByClassName('sub-txt');

    const subFrontTxt = document.getElementsByClassName('sub-front-txt');

    const thinCard = document.getElementsByClassName('thin-card');

    const txtLink = document.getElementsByClassName('txt-link');

    const vaccineList = document.getElementsByClassName('scene');

    const vaccineDataLbl = document.getElementsByClassName('vaccine-data-lbl');

	const headerContainer = document.getElementById('header-container');


	if(value === 'off'){
		//when darkmode off
		//add light remove dark
		document.getElementById("darkmode-btn").value = 'on';

		html.classList.add('html-bg-lht');
		html.classList.remove('html-bg-drk');

		headerContainer.classList.add('header-container-lht');
		headerContainer.classList.remove('header-container-drk');

		body.classList.add('body-bg-lht');
		body.classList.remove('body-bg-drk');

		card[0].classList.add('card-lht');
		card[0].classList.remove('card-drk');

		// get all back flipping cards
		for (let backCount = 0; backCount < cardBack.length; backCount++) {

			cardBack[backCount].classList.add('card-back-lht');
			cardBack[backCount].classList.remove('card-back-drk');

		};

		// get all text in back flipping cards
		for (var backTxtCount = 0; backTxtCount < cardBackTxt.length; backTxtCount++) {

			cardBackTxt[backTxtCount].classList.add('back-lht');
			cardBackTxt[backTxtCount].classList.remove('back-drk');
		};

		// get all front flipping cards
		for (var frontCount = 0; frontCount < cardFront.length; frontCount++) {

			cardFront[frontCount].classList.add('card-front-lht');
			cardFront[frontCount].classList.remove('card-front-drk');

		};

		// get all text in front flipping cards
		for (var frontTxtCount = 0; frontTxtCount < cardFrontTxt.length; frontTxtCount++) {

			cardFrontTxt[frontTxtCount].classList.add('front-lht');
			cardFrontTxt[frontTxtCount].classList.remove('front-drk');
		};

		footerBrd.classList.add('footer-lht');
    	footerBrd.classList.remove('footer-drk');

		footerBtn[0].classList.add('footer-btn-lht');
    	footerBtn[0].classList.remove('footer-btn-drk');

		footerTxt[0].classList.add('footer-txt-lht');
   	 	footerTxt[0].classList.remove('footer-txt-drk');

		headerTxt[0].classList.add('header-txt-lht');
		headerTxt[0].classList.remove('header-txt-drk');

		// get all option
    	for (var optionCount = 0; optionCount < option.length; optionCount++) {

	    	option[optionCount].classList.add('option-lht');
	    	option[optionCount].classList.remove('option-drk');

    	};

		phaseContent[0].classList.add('phase-content-lht');
		phaseContent[0].classList.remove('phase-content-drk');

		searchBox[0].classList.add('search-box-lht');
		searchBox[0].classList.remove('search-box-drk');

		selection.classList.add('selection-lht');
		selection.classList.remove('selection-drk');

		for (let subFrontCount = 0; subFrontCount < subFrontTxt.length; subFrontCount++) {

			subFrontTxt[subFrontCount].classList.add('sub-front-lht');
			subFrontTxt[subFrontCount].classList.add('sub-front-drk');

		};

		subTxt[0].classList.add('sub-txt-lht');
		subTxt[0].classList.remove('sub-txt-drk');

		subTxt[1].classList.add('sub-txt-lht');
		subTxt[1].classList.remove('sub-txt-drk');

		// get all thin cards
		for (let thinCardCount = 0; thinCardCount < thinCard.length; thinCardCount++) {

			thinCard[thinCardCount].classList.add('thin-card-lht');
			thinCard[thinCardCount].classList.remove('thin-card-drk');
		};

		// get all links
		for (let linkCount = 0; linkCount < txtLink.length; linkCount++) {

			txtLink[linkCount].classList.add('txt-link-lht');
			txtLink[linkCount].classList.remove('txt-link-drk');

		};

		// get all dividers
		for (let dividerCount = 0; dividerCount < divider.length; dividerCount++) {

			divider[dividerCount].classList.add('divider-lht');
			divider[dividerCount].classList.remove('divider-drk');

		};

		// topDivider[0].classList.add('divider-lht');
		// topDivider[0].classList.remove('divider-drk');

		//get all vaccine data lbl
		for (let vaccineLblCount = 0;  vaccineLblCount < vaccineDataLbl.length;  vaccineLblCount++) {

			vaccineDataLbl[vaccineLblCount].classList.add('vaccine-data-lht');
			vaccineDataLbl[vaccineLblCount].classList.remove('vaccine-data-drk');
		};

		for (let vaccineCount = 0; vaccineCount < vaccineList.length; vaccineCount++) {

			vaccineList[vaccineCount].classList.remove('scene-drk')
		};


	}else if(value === 'on'){
		//when darkmode off
		//add dark remove light
		document.getElementById("darkmode-btn").value = 'off';

		html.classList.add('html-bg-drk');
		html.classList.remove('html-bg-lht');

		headerContainer.classList.add('header-container-drk');
		headerContainer.classList.remove('header-container-lht');

		body.classList.add('body-bg-drk');
		body.classList.remove('body-bg-lht');

		card[0].classList.add('card-drk');
		card[0].classList.remove('card-lht');

		// get all back flipping cards
		for (let backCount = 0; backCount < cardBack.length; backCount++) {

			cardBack[backCount].classList.add('card-back-drk');
			cardBack[backCount].classList.remove('card-back-lht');

		};

		// get all text in back flipping cards
		for (var backTxtCount = 0; backTxtCount < cardBackTxt.length; backTxtCount++) {

			cardBackTxt[backTxtCount].classList.add('back-drk');
			cardBackTxt[backTxtCount].classList.remove('back-lht');
		};

		// get all front flipping cards
		for (var frontCount = 0; frontCount < cardFront.length; frontCount++) {

			cardFront[frontCount].classList.add('card-front-drk');
			cardFront[frontCount].classList.remove('card-front-lht');

		};

		// get all text in front flipping cards
		for (var frontTxtCount = 0; frontTxtCount < cardFrontTxt.length; frontTxtCount++) {

			cardFrontTxt[frontTxtCount].classList.add('front-drk');
			cardFrontTxt[frontTxtCount].classList.remove('front-lht');
		};

		footerBrd.classList.add('footer-drk');
    	footerBrd.classList.remove('footer-lht');

		footerBtn[0].classList.add('footer-btn-drk');
    	footerBtn[0].classList.remove('footer-btn-lht');

		footerTxt[0].classList.add('footer-txt-drk');
   	 	footerTxt[0].classList.remove('footer-txt-lht');

		headerTxt[0].classList.add('header-txt-drk');
		headerTxt[0].classList.remove('header-txt-lht');

		// get all option
    	for (var optionCount = 0; optionCount < option.length; optionCount++) {

	    	option[optionCount].classList.add('option-drk');
	    	option[optionCount].classList.remove('option-lht');

    	};

		phaseContent[0].classList.add('phase-content-drk');
		phaseContent[0].classList.remove('phase-content-lht');

		searchBox[0].classList.add('search-box-drk');
		searchBox[0].classList.remove('search-box-lht');

		selection.classList.add('selection-drk');
		selection.classList.remove('selection-lht');

		for (let subFrontCount = 0; subFrontCount < subFrontTxt.length; subFrontCount++) {

			subFrontTxt[subFrontCount].classList.add('sub-front-drk');
			subFrontTxt[subFrontCount].classList.add('sub-front-lht');

		};

		subTxt[0].classList.add('sub-txt-drk');
		subTxt[0].classList.remove('sub-txt-lht');

		subTxt[1].classList.add('sub-txt-drk');
		subTxt[1].classList.remove('sub-txt-lht');

		// get all thin cards
		for (let thinCardCount = 0; thinCardCount < thinCard.length; thinCardCount++) {

			thinCard[thinCardCount].classList.add('thin-card-drk');
			thinCard[thinCardCount].classList.remove('thin-card-lht');
		};


		// get all links
		for (let linkCount = 0; linkCount < txtLink.length; linkCount++) {

			txtLink[linkCount].classList.add('txt-link-drk');
			txtLink[linkCount].classList.remove('txt-link-lht');

		};

		// get all dividers
		for (let dividerCount = 0; dividerCount < divider.length; dividerCount++) {

			divider[dividerCount].classList.add('divider-drk');
			divider[dividerCount].classList.remove('divider-lht');

		};

		// topDivider[0].classList.add('divider-drk');
		// topDivider[0].classList.remove('divider-lht');

				//get all vaccine data lbl
		for (let vaccineLblCount = 0;  vaccineLblCount < vaccineDataLbl.length;  vaccineLblCount++) {

			vaccineDataLbl[vaccineLblCount].classList.add('vaccine-data-drk');
			vaccineDataLbl[vaccineLblCount].classList.remove('vaccine-data-lht');
		};

		for (let vaccineCount = 0; vaccineCount < vaccineList.length; vaccineCount++) {

			vaccineList[vaccineCount].classList.add('scene-drk')
		};

	}
	// console.log(value)
})

	


