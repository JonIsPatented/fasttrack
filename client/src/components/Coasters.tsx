import { useQuery } from '@tanstack/react-query';
import '../styles/Coasters.css'

import CSplash from '../assets/CSplash.jpg'

function Coasters (){
  const { data, isLoading, error } = useQuery({
    queryKey: ['coasters'],
    queryFn: () => fetch('/endpoint/coasters/').then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }),
  });
  const coasters = data?.coasters || [];
  console.log(coasters);
  
  const coasterSort = coasters.sort((a,b) => a.name > b.name)

  
  let coasterElement = coasterSort.map(item => (
  <li 
    key={item.coaster_id} 
    onClick={() => localStorage.setItem("Coaster", JSON.stringify(item))}
  >
    <a href='/view-coaster'>{item.name}</a>
  </li>
));  if (isLoading) coasterElement = <li>Loading...</li>;
  if (error) coasterElement =  <li>Error: {error.message}</li>; 
  return (
    <section className="Coasters" id="Coasters">
      <div className="CoastersDisplay">
        <h1>Coasters</h1>
        <img src={CSplash} alt="CoasterSpash"></img>
      </div>
      <div className="CoastersContent">
       
        <div>
          <ul>
            {coasterElement}
          </ul>
        </div>
      </div>
    </section>
  )
}


export default Coasters;


