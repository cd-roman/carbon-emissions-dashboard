import { Layout } from "../../components/modules";
import aboutImage from "../../assets/about.webp";
import styles from "./About.module.scss";
import { ReactComponent as GithubIcon } from "../../assets/github.svg";

export const About = () => {
  const githubLink = "https://github.com/cd-roman/carbon-emissions-dashboard";

  return (
    <Layout>
      <div className={styles.about}>
        <div className={styles.left}>
          <h1>About Carbon Emissions Dashboard</h1>
          <p>
            The worldwide carbon footprint affects numerous environmental
            processes, global warming, and climate change. Carbon emissions
            dashboard helps to emphasize the importance of making
            environmentally considered choices. This is a demo project built on
            the data from{" "}
            <a href="https://rapidapi.com/carbonsutra/api/carbonsutra1">
              CarbonSutra API
            </a>
            . All calculations were done to show approximate emissions and do
            not pretend to be 100% accurate.
          </p>
          <p>
            This dashboard aims to calculate the emissions you cause traveling
            by planes and cars. Simply filling up your flight destinations/the
            number of flights and your car trip specifications, you can roughly
            count your carbon footprint, the number of trees needed to offset
            your footprint, and if possible think over your next journeys more
            consciously. Let’s go low-carbon!
          </p>
          <p>
            The project was created by the designers from Ukraine. All design
            solutions are made in Figma and Adobe Illustrator, while the tech
            stack is React + Typescript, React Router Dom, Material UI, and
            Axios.
          </p>
          <div className={styles.iconContainer}>
            <p>
              <a href={githubLink} rel="noreferrer" target="_blank">
                Link to GitHub
              </a>
            </p>
            <a href={githubLink} rel="noreferrer" target="_blank">
              <GithubIcon />
            </a>
          </div>
        </div>
        <div className={styles.right}>
          <img src={aboutImage} alt="About" />
        </div>
      </div>
    </Layout>
  );
};
