import { Link } from "react-router-dom";
import './Home.css'; // CSS dosyasını ekleyin ve gerekirse stilleri düzenleyin

export default function Home() {
    return (
        <div className="home-container">
            <div>
                <h1>Teknolojik Yemekler</h1>
            </div>
            <div>
                <h1>KOD ACIKTIRIR PİZZA, DOYURUR</h1>
            </div>
            <Link to="/order">
                <button>ACIKTIM</button>
            </Link>
        </div>
    );
}