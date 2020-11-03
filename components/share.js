import { classify } from "components";
import { map } from "ramda";
import { playSnap } from "tricks";
// https://css-tricks.com/simple-social-sharing-links/
const SHARE_LABEL = "Thank You in Advance";
const SHARE_LINKS = [
  {
    url: "https://www.facebook.com/sharer.php?u=habitpulse.com",
    text: "Facebook",
  },
  {
    url:
      "https://twitter.com/intent/tweet?url=habitpulse.com&text=Hey!%20Check%20out%20%22Metasprint%22%20...%20Do%20you%20think%20you'd%20use%2Fshare%20it%3F&hashtags=habits,habit-trackers,productivity,fitness,startups,business",
    text: "Twitter",
  },
  {
    url:
      "mailto:infobot@example.com?cc=bion%40bitpharma.com%2C%20aris.hexagon%40gmail.com&subject=HabitPulse&body=How%20do%20you%20feel%20about%habitpulse.com%3F",
    text: "Email",
  },
];

const linkButtonClass = `${classify("blue")}`;
export const Link = ({ url, text }) => (
  <a
    key={url}
    className="py-2 block"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className={linkButtonClass}>{text}</button>
  </a>
);

const buttonClass = `${classify(
  "green"
)} disabled italic select-none mt-2 cursor-default`;
export const ListOLinks = ({ links, label }) => (
  <form className="w-full min-w-md max-w-md rounded p-6">
    {map(Link, links)}
    <button className={buttonClass} onClick={playSnap}>
      {label}
    </button>
  </form>
);

export const Share = () => (
  <ListOLinks links={SHARE_LINKS} label={SHARE_LABEL} />
);
