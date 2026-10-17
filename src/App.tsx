import { useMemo, useState } from "react";

const compliments = [
  {
    number: "01",
    title: "Your smile is magic",
    copy: "The kind that turns an ordinary Tuesday into the best day ever. It is warm, bright, and completely impossible not to love.",
  },
  {
    number: "02",
    title: "You make cute look easy",
    copy: "Every little laugh, every tiny expression, every sleepy hello — somehow you make all of it the sweetest thing in the world.",
  },
  {
    number: "03",
    title: "Beautiful, always",
    copy: "Dressed up, dressed down, hair perfect or beautifully messy — you are breathtaking in every single version of you.",
  },
];

const photoCards = [
  { label: "Highlight of the week", caption: "That moment I keep replaying", tone: "bg-[#ffd0e5]", image: "/photos/photo-1.jpg" },
  { label: "My fashion week pick", caption: "Obviously, you won again", tone: "bg-[#ffc1db]", image: "/photos/photo-2.jpg" },
  { label: "Cutest memory", caption: "One for our forever folder", tone: "bg-[#ffe0ec]", image: "/photos/photo-3.jpg" },
];

const favoriteThings = {
  eyes: {
    label: "Her eyes",
    title: "Your eyes are their own little universe",
    copy: "I could look into your eyes forever and still find something new to love. They sparkle when you are excited, soften when you are thoughtful, and somehow always make me feel completely at home.",
  },
  smile: {
    label: "Her smile",
    title: "Your smile is my favorite kind of magic",
    copy: "Your smile can rescue any day. It lights up your whole face, sneaks into your eyes, and makes everything around you feel warmer. I would do almost anything just to see one more.",
  },
  curves: {
    label: "Her curves",
    title: "Every curve is a masterpiece",
    copy: "You are breathtaking exactly as you are. Every beautiful curve is part of the woman I adore, and you carry it all with a kind of confidence and softness that leaves me speechless.",
  },
  sweetness: {
    label: "Her sweetness",
    title: "Your heart is the sweetest place I know",
    copy: "It is in the way you care, the little things you notice, and the love you give so naturally. Your kindness makes me want to be softer, braver, and better every single day.",
  },
  hair: {
    label: "Her hair",
    title: "Your hair deserves love letters too",
    copy: "Perfectly styled, tied up, windswept, or adorably messy — I love every version. It frames the face I love most and somehow always makes you look like the main character.",
  },
};

function Rose({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none" aria-hidden="true">
      <path d="M50 61C48 80 51 99 45 117" stroke="#2eaa66" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 86C31 78 27 89 44 96M50 74C65 64 72 73 53 82" fill="#6fd492" stroke="#2eaa66" strokeWidth="2" />
      <path d="M49 59C24 59 16 37 28 24C37 14 49 21 50 32C51 16 68 12 77 24C89 41 69 59 49 59Z" fill="#ff5c9b" stroke="#e5357b" strokeWidth="3" />
      <path d="M50 55C37 52 33 41 39 34C45 27 54 33 50 41C56 31 66 34 65 43C64 52 56 56 50 55Z" fill="#ffadd0" />
      <path d="M51 51C47 48 46 42 50 40C56 38 58 47 51 51Z" fill="#e5357b" />
    </svg>
  );
}

function Bunny({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg className={className} style={{ transform: flip ? "scaleX(-1)" : undefined }} viewBox="0 0 130 110" fill="none" aria-hidden="true">
      <ellipse cx="73" cy="76" rx="40" ry="27" fill="#fff9fc" stroke="#e8669d" strokeWidth="3" />
      <circle cx="36" cy="58" r="25" fill="#fff9fc" stroke="#e8669d" strokeWidth="3" />
      <path d="M25 39C11 16 16 3 25 7C33 11 34 28 33 36M40 35C41 12 51 2 57 9C64 18 52 35 47 42" fill="#fff9fc" stroke="#e8669d" strokeWidth="3" />
      <path d="M25 33C18 18 21 13 25 14M44 32C47 18 52 13 54 15" stroke="#ffb2cf" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="57" r="2.7" fill="#53253a" />
      <path d="M14 64C19 64 21 67 23 70M21 70C25 68 28 68 30 70" stroke="#e8669d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="104" cy="60" r="13" fill="#fff9fc" stroke="#e8669d" strokeWidth="3" />
      <path d="M50 97L44 105M88 98L96 104" stroke="#e8669d" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 36" aria-hidden="true">
      <path d="M20 34S2 23 2 11C2 1 15-2 20 7C25-2 38 1 38 11C38 23 20 34 20 34Z" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [monthOffset, setMonthOffset] = useState(0);
  const [favoriteThing, setFavoriteThing] = useState<keyof typeof favoriteThings>("eyes");
  const [confirmStatus, setConfirmStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const calendar = useMemo(() => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const start = new Date(year, month, 1).getDay();
    return {
      year,
      month,
      days,
      start,
      name: date.toLocaleDateString("en-US", { month: "long" }),
    };
  }, [monthOffset]);

  const handleConfirmDate = async () => {
    if (!selectedDate || confirmStatus === "sending") return;
    const formattedDate = `${calendar.name} ${selectedDate}, ${calendar.year}`;
    setConfirmStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/vigneshmhatre474@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `💖 She picked a date: ${formattedDate}!`,
          Date_Selected: formattedDate,
          Message: `Your girlfriend just confirmed your next cute date for ${formattedDate}! Time to bring the plans, the snacks, and one million kisses.`,
          _template: "table",
        }),
      });

      if (response.ok) {
        setConfirmStatus("sent");
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setConfirmStatus("error");
      const subject = encodeURIComponent(`💖 Our Next Cute Date: ${formattedDate}!`);
      const body = encodeURIComponent(
        `Hey! I picked our next cute date: ${formattedDate} 💕 Can't wait!`
      );
      window.location.href = `mailto:vigneshmhatre474@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff5f9] text-[#5c2039]">
      <section className="relative min-h-[92vh] border-b-4 border-[#ef73aa] px-6 pb-16 pt-6 md:px-12">
        <div className="absolute inset-0 heart-grid opacity-30" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="font-display text-xl font-bold italic text-[#df327f]">the Sexiest chick in lly life</a>
          <a href="#date" className="rounded-full border-2 border-[#df327f] bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[3px_3px_0_#df327f] transition hover:-translate-y-1">
            plan our date
          </a>
        </nav>

        <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center pt-20 text-center md:pt-24">
          <p className="mb-5 rounded-full bg-[#ffcfdf] px-5 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#c82069]">
            An important announcement
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,12vw,9.5rem)] font-black uppercase leading-[0.74] tracking-[-0.07em] text-[#f0448c]">
            The cutest
            <span className="block text-[#ff84b6]">The hottest</span>
            <span className="block text-[#d92873]">The sweetest</span>
          </h1>
          <div className="mt-9 rotate-[-2deg] border-2 border-[#df327f] bg-white px-7 py-3 shadow-[6px_6px_0_#ffafd0]">
            <p className="font-display text-xl font-bold italic md:text-2xl">Yes, this is all about you. Who else?</p>
          </div>
          <a href="#love-notes" className="mt-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0448c] text-white shadow-[0_8px_0_#be235f] transition hover:translate-y-1 hover:shadow-[0_4px_0_#be235f]" aria-label="Read my love notes">
            <span className="text-2xl">↓</span>
          </a>
        </div>

        <Rose className="float-slow absolute -left-5 top-32 w-32 rotate-[-18deg] md:left-10 md:w-44" />
        <Rose className="float-delayed absolute -right-3 top-44 w-28 rotate-[20deg] md:right-14 md:w-40" />
        <Bunny className="bunny-hop absolute bottom-4 left-[2%] w-32 md:left-[10%] md:w-44" />
        <Bunny className="bunny-hop-delayed absolute bottom-6 right-[1%] w-28 md:right-[9%] md:w-40" flip />
        <Heart className="float-slow absolute left-[22%] top-28 w-7 rotate-[-12deg] text-[#ff9bc3]" />
        <Heart className="float-delayed absolute right-[22%] top-[42%] w-9 rotate-[14deg] text-[#ffc2da]" />
      </section>

      <section id="love-notes" className="relative bg-[#ffbed8] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-7 md:grid-cols-[1fr_1.4fr] md:items-end">
            <h2 className="font-display text-6xl font-black leading-[0.9] tracking-[-0.05em] text-[#b91f61] md:text-8xl">Reasons I’m<br />obsessed with you</h2>
            <p className="max-w-xl border-l-4 border-[#e7337d] pl-6 text-lg font-semibold leading-relaxed">
              You are not just beautiful. You are the kind of beautiful that makes the whole room feel softer. Being around you feels like finding extra sprinkles at the bottom of the bag.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {compliments.map((item, index) => (
              <article key={item.number} className={`group border-2 border-[#d92873] bg-[#fff9fc] p-7 shadow-[8px_8px_0_#e94b8c] transition hover:-translate-y-2 ${index === 1 ? "md:rotate-1" : index === 2 ? "md:-rotate-1" : ""}`}>
                <span className="font-display text-5xl font-black text-[#ffb0ce]">{item.number}</span>
                <h3 className="mt-8 font-display text-3xl font-black text-[#d92873]">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-[#713149]">{item.copy}</p>
                <Heart className="mt-7 w-8 text-[#f0448c] transition group-hover:scale-125" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#e7337d]">Our tiny museum of us</p>
            <h2 className="mt-3 font-display text-6xl font-black tracking-[-0.05em] text-[#d92873] md:text-8xl">HOT, CUTE & SEXY</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg">Reserved for the moments where you were extra adorable — which is, inconveniently, every moment.</p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {photoCards.map((card, index) => (
              <article key={card.label} className={`border-2 border-[#df327f] bg-white p-3 shadow-[10px_10px_0_#ffb3d0] ${index === 0 ? "md:rotate-[-2deg]" : index === 2 ? "md:rotate-[2deg]" : ""}`}>
                <div className={`group relative overflow-hidden border-2 border-[#e8669d] ${card.tone}`}>
                  <img
                    src={card.image}
                    alt={card.caption}
                    className="block h-auto w-full"
                  />
                </div>
                <div className="px-2 pb-2 pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ee4b8e]">{card.label}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{card.caption}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#fff5f9] px-6 pb-24 pt-8 md:px-12">
        <div className="relative mx-auto max-w-5xl overflow-hidden border-2 border-[#d92873] bg-white shadow-[12px_12px_0_#ffadd0]">
          <div className="grid md:grid-cols-[0.75fr_1.25fr]">
            <div className="relative flex min-h-72 flex-col justify-between overflow-hidden bg-[#f05091] p-8 text-white md:p-10">
              <div className="absolute inset-0 heart-grid opacity-20" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ffe2ed]">Select a love note</p>
                <label htmlFor="favorite-thing" className="mt-5 block font-display text-4xl font-black leading-tight">
                  What I think about her...
                </label>
                <div className="relative mt-6">
                  <select
                    id="favorite-thing"
                    value={favoriteThing}
                    onChange={(event) => setFavoriteThing(event.target.value as keyof typeof favoriteThings)}
                    className="w-full appearance-none rounded-none border-2 border-[#971546] bg-[#fff5f9] px-5 py-4 pr-12 text-sm font-black uppercase tracking-[0.12em] text-[#a91f55] outline-none transition focus:shadow-[5px_5px_0_#9f1b50]"
                  >
                    {Object.entries(favoriteThings).map(([key, item]) => (
                      <option key={key} value={key}>{item.label}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-lg text-[#d92873]">↓</span>
                </div>
              </div>
              <div className="relative mt-10 flex items-end justify-between">
                <Heart className="w-10 text-[#ffd1e2]" />
                <span className="font-display text-6xl font-black text-[#ff9fc4]">05</span>
              </div>
            </div>

            <div key={favoriteThing} className="love-note-enter relative flex min-h-72 flex-col justify-center p-8 md:p-12">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#e44484]">
                About {favoriteThings[favoriteThing].label.toLowerCase()}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#bf2263] md:text-5xl">
                {favoriteThings[favoriteThing].title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#713149]">
                {favoriteThings[favoriteThing].copy}
              </p>
              <div className="mt-8 h-1 w-24 bg-[#ff9ec3]" />
            </div>
          </div>
        </div>
      </section>

      <section id="date" className="relative border-y-4 border-[#ef73aa] bg-[#ffe0ec] px-6 py-24 md:px-12">
        <Rose className="absolute -bottom-5 -left-5 w-40 rotate-[18deg] opacity-70" />
        <Rose className="absolute -right-7 -top-8 w-44 rotate-[-20deg] opacity-70" />
        <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.85fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#d92873]">Very official business</p>
            <h2 className="mt-4 font-display text-6xl font-black leading-[0.88] tracking-[-0.05em] text-[#c82269] md:text-7xl">Pick our next cute date</h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed">Choose a day and I’ll bring the plans, the snacks, and approximately one million kisses.</p>
            {selectedDate && (
              <div className="mt-8 flex flex-col items-start gap-4">
                <div className="inline-flex rotate-[-2deg] items-center gap-3 bg-[#f0448c] px-5 py-3 font-bold text-white shadow-[5px_5px_0_#b91f61]">
                  <Heart className="w-5" />
                  It’s a date: {calendar.name} {selectedDate}!
                </div>
                <button
                  type="button"
                  onClick={handleConfirmDate}
                  disabled={confirmStatus === "sending" || confirmStatus === "sent"}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#b91f61] bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#c82269] shadow-[5px_5px_0_#d92873] transition hover:-translate-y-1 hover:bg-[#f0448c] hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
                >
                  <Heart className="w-4 text-[#f0448c] group-hover:text-white" />
                  {confirmStatus === "sending"
                    ? "Sending to Vignesh..."
                    : confirmStatus === "sent"
                      ? "Date Confirmed & Mail Sent! 💖"
                      : "Confirm Date"}
                </button>
                {confirmStatus === "sent" && (
                  <p className="text-sm font-bold text-[#b91f61]">
                    Yay! Vignesh just got an email for {calendar.name} {selectedDate}, {calendar.year} 💕
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border-2 border-[#d92873] bg-[#fffafd] p-5 shadow-[12px_12px_0_#ee77a9] md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={() => { setMonthOffset((m) => m - 1); setSelectedDate(null); setConfirmStatus("idle"); }} className="h-10 w-10 rounded-full border-2 border-[#dc367c] bg-[#ffd1e3] font-black transition hover:bg-[#f0448c] hover:text-white" aria-label="Previous month">←</button>
              <h3 className="font-display text-3xl font-black text-[#c82269]">{calendar.name} <span className="text-[#ee77a9]">{calendar.year}</span></h3>
              <button onClick={() => { setMonthOffset((m) => m + 1); setSelectedDate(null); setConfirmStatus("idle"); }} className="h-10 w-10 rounded-full border-2 border-[#dc367c] bg-[#ffd1e3] font-black transition hover:bg-[#f0448c] hover:text-white" aria-label="Next month">→</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => <span key={`${day}-${i}`} className="pb-2 text-xs font-black text-[#e34886]">{day}</span>)}
              {Array.from({ length: calendar.start }).map((_, i) => <span key={`empty-${i}`} />)}
              {Array.from({ length: calendar.days }, (_, i) => i + 1).map((day) => (
                <button key={day} onClick={() => { setSelectedDate(day); setConfirmStatus("idle"); }} className={`aspect-square rounded-full text-sm font-bold transition hover:scale-110 hover:bg-[#ffb3d0] ${selectedDate === day ? "bg-[#e9347d] text-white shadow-[3px_3px_0_#8f1849]" : "bg-[#fff0f6]"}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#f0448c] px-6 py-20 text-center text-white">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="font-display text-5xl font-black leading-tight md:text-7xl">if you liked it then hug me if you loved it thhen a kiss on cheeks would be sweet</p>
          <p className="mt-6 font-bold">Made with a ridiculous amount of love, just for you.</p>
          <Heart className="mx-auto mt-8 w-10 text-[#ffd5e5]" />
        </div>
        <Bunny className="absolute -bottom-4 left-2 w-36 opacity-40" />
        <Bunny className="absolute -bottom-4 right-2 w-36 opacity-40" flip />
      </footer>
    </main>
  );
}
