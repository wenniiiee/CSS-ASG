export default function HoverCard({ title }) {
  return (
    <div className="container noselect">
      <div id="card">
        {/* Title always visible */}
        <div className="title">
          <span>{title}</span>
        </div>

        {/* CTA text appears only on hover */}
        <div className="cta-text">
          <span>Learn more →</span>
        </div>
      </div>
    </div>
  );
}
