

const vaccineData = 'https://disease.sh/v3/covid-19/vaccine';

async function getData(){

	const fetchData = await fetch(vaccineData);

	if(fetchData.ok){

		const vaccineJson = await fetchData.json();

		//set to session
		sessionStorage.vaccine = JSON.stringify( vaccineJson );

		getVaccineInfo();

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

	// const vaccineList = document.querySelectorAll('#vaccine-list');

	const classPhase = selected.replace(/ /g, '_');

	//add hidden class to all phase card(child element)
		document.querySelectorAll('.scene--card').forEach(function(element){
  		element.classList.add('hidden');
	});
	// vaccineList.find('*')
	// console.log(vaccineList);
	//select all element
	if(selected === 'all'){
		document.querySelectorAll('.scene--card').forEach(function(element){

  		element.classList.remove('hidden');
		});
	}else{
		const selectedElement = document.getElementsByClassName(classPhase);
		//loop
		for (let element = 0; element < selectedElement.length; element++) {
			// console.log(selectedElement[element]);

			selectedElement[element].classList.remove('hidden');
		};
	//remove hidden class name at the selected value
	}
	// console.log(classPhase);
	// console.log(selectedElement.length);
})
