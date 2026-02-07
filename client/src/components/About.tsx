import '../styles/About.css'
import CoasterSVG from '../assets/Coaster.svg'
function About() {
  return (
    <section className="About" id="About">
      <div>
        <h1>About FastTrack!</h1>
        <p>We're always on track to keep you in the loop with your data! No, we don't do trains...</p>
      </div>
      <img src={CoasterSVG} alt="Coaster_Here"/>
    </section>
  )
}
export default About;
