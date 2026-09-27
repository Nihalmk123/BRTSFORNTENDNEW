import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ticket } from 'lucide-react';
import './PageNav.css';

const LABEL = '.sx-eyebrow, .bb-eyebrow, .db-eyebrow, .MuiChip-label';

// Home-page wayfinding: section dots on wide screens, and a "Book" bar on
// phones once the hero's own button has scrolled away. Sections are read from
// the DOM, labelled by their eyebrow, so new sections join automatically.
const PageNav = () => {
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const els = [...document.querySelectorAll('.page-transition section')]
      .filter((el) => !el.parentElement.closest('section'));
    const list = els
      .map((el, i) => ({ el, label: i === 0 ? 'Top' : el.querySelector(LABEL)?.textContent.trim() }))
      .filter((s) => s.label);
    setSections(list);

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let idx = 0;
      list.forEach((s, i) => { if (s.el.getBoundingClientRect().top <= line) idx = i; });
      setActive(idx);
      const heroGone = (els[0]?.getBoundingClientRect().bottom ?? 0) < 0;
      const ctaIn = (els[els.length - 1]?.getBoundingClientRect().top ?? Infinity) < window.innerHeight;
      setShowBar(heroGone && !ctaIn);
      document.body.classList.toggle('pn-bar-on', heroGone && !ctaIn);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('pn-bar-on');
    };
  }, []);

  return (
    <>
      <nav className="pn-dots" aria-label="Page sections">
        {sections.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={i === active ? 'is-on' : ''}
            onClick={() => s.el.scrollIntoView({ behavior: 'smooth' })}
            aria-label={s.label}
            aria-current={i === active ? 'true' : undefined}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </nav>

      <div className={`pn-bar${showBar ? ' is-on' : ''}`} aria-hidden={!showBar}>
        <span><Ticket size={16} /> Skip the queue</span>
        <Link to="/bookTickets" tabIndex={showBar ? 0 : -1}>Book ticket <ArrowRight size={16} /></Link>
      </div>
    </>
  );
};

export default PageNav;
