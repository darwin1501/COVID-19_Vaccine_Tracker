

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

		const phaseList = vaccinePhases[phases].phase;

		//select parent element
		const vaccineContainer = document.getElementById('vaccine-phases');

		// create element
		const thinCard = document.createElement('div');

		const thinContent = document.createElement('div');

		const phaseTxt = document.createElement('h3');

		const phaseNum = document.createElement('h3');

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
	};

	//each vaccine info.
	for (let vaccineData = 0; vaccineData < vaccine.data.length; vaccineData++) {
	
		const vaccineInfoTemplate =`
		<div class="scene scene--card">
			  <div class="card-flipping">
			    <div class="card__face card__face--front">
			    	<div class="front-container">
			    		<p class="front-txt">${vaccine.data[vaccineData].candidate}</p>
			    		<br>
			    		<p class="sub-front-txt">Trial Phase: ${vaccine.data[vaccineData].trialPhase}</p>
			    	</div>
			    </div>
			    <div class="card__face card__face--back">
			    	<div class="back-container">
			    		<!-- template string -->
				    <p class="back-txt">
				    	<label>Candidate: Lorem ipsum dolor sit.</label>
				    	<br>
				    	<br>
				    	Sponsors: Lorem ipsum dolor sit.
				    	<br>
				    	<br>
					    Details: Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quas perspiciatis modi nobis at distinctio! At aut alias accusantium voluptas tenetur. Veniam possimus minus animi, itaque quo, vero dolor nam!
					    <br>
					    <br>
					    Trial Phase: Early research.
					    <br>
					    <br>
					    Institutions: Multiple study sites in Europe and North America
					    <br>
					    <br>
					    Funding: perspiciatis modi
					</p>
					</div>
			   </div>
			  </div>
			</div>`

			const vaccineList = document.getElementById('vaccine-list');

	// vaccineList.innerHTML = vaccineInfoTemplate;
	// let doc = new DOMParser().parseFromString(vaccineInfoTemplate, 'text/html');

	// console.log(doc);

	// console.log(vaccineList)

	vaccineList.insertAdjacentHTML('beforeend', vaccineInfoTemplate)

	};

	const cardFlipping = document.getElementsByClassName('card-flipping');

	// console.log(cardFlipping.length);

	for(let element = 0; element < cardFlipping.length; element++){
		// console.log(cardFlipping[element]);

		cardFlipping[element].addEventListener( 'click', function() {
	  		cardFlipping[element].classList.toggle('is-flipped');
		});
}

// console.log(cardFlipping.lenght);

})
