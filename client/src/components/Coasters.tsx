import { useQuery } from '@tanstack/react-query';
import '../styles/Coasters.css'

import CSplash from '../assets/CSplash.jpg'

function Coasters (){
  const { data, isLoading, error } = useQuery({
    queryKey: ['coasters'],
    // We use a relative path now!
    queryFn: () => fetch('/api/coasters/').then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }),
  });

  let coasterElement = data?.map((coaster) => (
    <li>{coaster}</li>
));

  if (isLoading) coasterElement = <li>Loading...</li>;
  if (error) coasterElement =  <li>Error: {error.message}</li>; 
  return (
    <section className="Coasters" id="Coasters">
      <div>
        <img src={CSplash} alt="CoasterSpash"></img>
      </div>
      <div className="CoastersContent">
        <ul>
          {coasterElement}

        </ul>
      </div>
    </section>
  )
}

export default Coasters;
