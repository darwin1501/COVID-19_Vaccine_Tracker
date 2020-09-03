

const vaccineData = 'https://disease.sh/v3/covid-19/vaccine';

async function getData(){

	const fetchData = await fetch(vaccineData);

	// hide content while loading data
	const contentOne = document.getElementById('content-one');

	const contentTwo =document.getElementById('content-two');

	contentOne.classList.add('hidden');

	contentTwo.classList.add('hidden');

	if(fetchData.ok){

		const vaccineJson = await fetchData.json();

		//set to session
		sessionStorage.vaccine = JSON.stringify( vaccineJson );

		getVaccineInfo();

		const loading = document.getElementById('loading');

		loading.classList.add('hidden');

		contentOne.classList.remove('hidden');

		contentTwo.classList.remove('hidden');

	}else{
		console.log( "HTTP-Error: " + vaccineData.status );
	}
}

getData()

const getVaccineInfo = (()=>{

	const vaccine = JSON.parse( sessionStorage.vaccine );

	const totalCandidates = vaccine.totalCandidates;

	const vaccinePhases = vaccine.phases;

	const totalVacTxt =  document.getElementById('vaccine-data');

	totalVacTxt.innerHTML = totalCandidates;

	console.log(vaccine);

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
		for(let fundingCount = 0; fundingCount < fundingList.length; fundingCount++){
			// console.log(sponsorsList[sponsorsCount]);
			funding.push(fundingList[fundingCount]);
		}

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
					    <br>
					    <br>
					    <label>Funding:</label> ${funding}
					</p>
					</div>
			   </div>
			  </div>
			</div>`

	const vaccineList = document.getElementById('vaccine-list');

	vaccineList.insertAdjacentHTML('beforeend', vaccineInfoTemplate)

	};

	const cardFlipping = document.getElementsByClassName('card-flipping');

	for(let element = 0; element < cardFlipping.length; element++){

		cardFlipping[element].addEventListener( 'click', function() {

	  		cardFlipping[element].classList.toggle('is-flipped');
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

	//get data
	const vaccine = JSON.parse( sessionStorage.vaccine );
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

    const divider = document.getElementsByClassName('divider');

    const topDivider = document.getElementsByClassName('divider-top');

    const headerTxt = document.getElementsByClassName('header-txt');

    const phaseContent = document.getElementsByClassName('phase-content');
    //sub text header
    const subTxt = document.getElementsByClassName('sub-txt');

    const thinCard = document.getElementsByClassName('thin-card');

    const txtLink = document.getElementsByClassName('txt-link');

	if(value === 'off'){
		//when darkmode off
		//add light remove dark
		document.getElementById("darkmode-btn").value = 'on';

		html.classList.add('html-bg-lht');
		html.classList.remove('html-bg-drk');

		body.classList.add('body-bg-lht');
		body.classList.remove('body-bg-drk');

		card[0].classList.add('card-lht');
		card[0].classList.remove('card-drk');

		headerTxt[0].classList.add('header-txt-lht');
		headerTxt[0].classList.remove('header-txt-drk');

		phaseContent[0].classList.add('phase-content-lht');
		phaseContent[0].classList.remove('phase-content-drk');

		subTxt[0].classList.add('sub-txt-lht');
		subTxt[0].classList.remove('sub-txt-drk');

		// get all thin cards
		for (let thinCardCount = 0; thinCardCount < thinCard.length; thinCardCount++) {

			thinCard[thinCardCount].classList.add('thin-card-lht');
			thinCard[thinCardCount].classList.remove('thin-card-drk');
		};

		txtLink[0].classList.add('txt-link-lht');
		txtLink[0].classList.remove('txt-link-drk');

		txtLink[1].classList.add('txt-link-lht');
		txtLink[1].classList.remove('txt-link-drk');

		// get all dividers
		for (let dividerCount = 0; dividerCount < divider.length; dividerCount++) {

			divider[dividerCount].classList.add('divider-lht');
			divider[dividerCount].classList.remove('divider-drk');

		};

		topDivider[0].classList.add('divider-lht');
		topDivider[0].classList.remove('divider-drk');

	}else if(value === 'on'){
		//when darkmode off
		//add dark remove light
		document.getElementById("darkmode-btn").value = 'off';

		html.classList.add('html-bg-drk');
		html.classList.remove('html-bg-lht');

		body.classList.add('body-bg-drk');
		body.classList.remove('body-bg-lht');

		card[0].classList.add('card-drk');
		card[0].classList.remove('card-lht');

		headerTxt[0].classList.add('header-txt-drk');
		headerTxt[0].classList.remove('header-txt-lht');

		phaseContent[0].classList.add('phase-content-drk');
		phaseContent[0].classList.remove('phase-content-lht');

		subTxt[0].classList.add('sub-txt-drk');
		subTxt[0].classList.remove('sub-txt-lht');

		// get all thin cards
		for (let thinCardCount = 0; thinCardCount < thinCard.length; thinCardCount++) {

			thinCard[thinCardCount].classList.add('thin-card-drk');
			thinCard[thinCardCount].classList.remove('thin-card-lht');
		};

		txtLink[0].classList.add('txt-link-drk');
		txtLink[0].classList.remove('txt-link-lht');

		txtLink[1].classList.add('txt-link-drk');
		txtLink[1].classList.remove('txt-link-lht');

		// get all dividers
		for (let dividerCount = 0; dividerCount < divider.length; dividerCount++) {

			divider[dividerCount].classList.add('divider-drk');
			divider[dividerCount].classList.remove('divider-lht');

		};

		topDivider[0].classList.add('divider-drk');
		topDivider[0].classList.remove('divider-lht');

	}
	// console.log(value)
})

	


