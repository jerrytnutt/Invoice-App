import '../styles/footer.css';
import { BsGithub } from 'react-icons/bs';

function Footer() {
  return (
    <div className="footer">
      <div>
        <a
          href="https://github.com/jerrytnutt/Invoice-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub />
        </a>
      </div>
    </div>
  );
}

export default Footer;
