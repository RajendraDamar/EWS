import './home.css'
import { HiMenuAlt3, HiArrowCircleLeft } from 'react-icons/hi'
import { MdLocationPin, MdSearch } from 'react-icons/md'
import { AiFillWarning } from 'react-icons/ai'
import hero from '../assets/hero.png'

export default function Home() {
  const today = new Date()
  const date = today.toLocaleDateString('id-ID', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
  const time = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'

  return (
    <main className="home">
      {/* Top date strip */}
      <div className="home__datebar">
        <span>{date}</span>
        <span>{time}</span>
      </div>

      {/* Menu bar */}
      <div className="home__menubar">
        <div className="home__menubar-inner">
          <h1 className="home__menutitle">Menu</h1>
          <HiMenuAlt3 size={24} aria-hidden="true" />
        </div>
      </div>

      {/* Location + search */}
      <section className="home__section">
        <div className="home__locrow">
          <MdLocationPin size={24} aria-hidden="true" />
          <h2 className="home__location">Pantai Depok, Bantul</h2>
        </div>
        <div className="home__search">
          <input aria-label="Cari Lokasi" placeholder="Cari Lokasi" />
          <MdSearch size={22} aria-hidden="true" />
        </div>
      </section>

      {/* Weather hero/summary */}
      <section className="home__hero">
        <img src={hero} alt="Cuaca saat ini" className="home__hero-img" />
      </section>

      {/* Peringatan Cuaca */}
      <section className="home__section">
        <h3 className="home__h3">Peringatan Cuaca</h3>
        <article className="warncard">
          <div className="warncard__head">
            <div className="warncard__icon" aria-hidden="true"><AiFillWarning size={28} /></div>
            <div>
              <div className="warncard__title">Peringatan Dini Cuaca Ekstrim Daerah Depok, Bantul</div>
              <div className="warncard__sub">28 Mei 2025</div>
            </div>
          </div>
          <p className="warncard__body">
            Waspada! Hujan sedang–lebat disertai petir & angin kencang berpotensi terjadi pada pukul 20.30 WIB.
          </p>
          <button className="linkbtn" type="button">
            <span>Lihat Detail</span>
            <HiArrowCircleLeft className="linkbtn__arr" size={20} aria-hidden="true" />
          </button>
        </article>
      </section>

      {/* Quick metrics */}
      <section className="home__cards">
        <article className="statcard">
          <div className="statcard__label">Angin</div>
          <div className="statcard__value">12 mph</div>
          <div className="statcard__meta">Utara</div>
        </article>
        <article className="statcard">
          <div className="statcard__label">Cuaca</div>
          <div className="statcard__value">19°</div>
          <div className="statcard__meta">Hujan Ringan • 30%</div>
        </article>
      </section>
    </main>
  )
}
