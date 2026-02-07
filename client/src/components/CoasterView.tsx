import '../styles/CoasterView.css'
import SirensCurse from '../assets/SirensCurse.jpeg'


function CoasterViewer(){
  const coaster = JSON.parse(localStorage.getItem("Coaster")) || null;
  
  console.log(coaster)

  const traits = coaster.coasterTraits.trait_type

  return(
    <section className="CoasterViewer">
      <div>
        <h1>{coaster.name}</h1>
        <p>{coaster.home_park.name}, {coaster.home_park.city} {coaster.home_park.state_province}</p>
        <p>Constructed in {coaster.first_year_construction}, and first ran in {coaster.first_year_operation}. {coaster.name} was made out of: {coaster.material.name}. It's total length is {coaster.length_ft} feet and was constructed by {coaster.manufacturer.name}.</p>
      </div>
      <div>
        <img src={SirensCurse}/> 
      </div>
    </section>

    
  )
}

export default CoasterViewer;
