

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


})