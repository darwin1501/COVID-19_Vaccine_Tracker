

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

	console.log(vaccine)

})