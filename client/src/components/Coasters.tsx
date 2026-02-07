import { useQuery } from '@tanstack/react-query';
import '../styles/Coasters.css'

import CSplash from '../assets/CSplash.jpg'

function Coasters (){
  const { data, isLoading, error } = useQuery({
    queryKey: ['coasters'],
    // We use a relative path now!
    queryFn: () => fetch('/api/coaster/get').then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }),
  });

  let coasterElement = data?.map((coaster) => (
    <p>{coaster}</p>
));

  if (isLoading) coasterElement = <p>Loading...</p>;
  if (error) coasterElement =  <p>Error: {error.message}</p>; 
  return (
    <section className="Coasters" id="Coasters">
      <div>
        <img src={CSplash} alt="CoasterSpash"></img>
      </div>
      <div className="CoastersContent">
        {coasterElement}
      </div>
    </section>
  )
}

export default Coasters;
