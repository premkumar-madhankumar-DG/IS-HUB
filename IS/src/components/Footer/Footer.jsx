import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#F3F0EA",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "80px 32px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "64px",
          }}
        >
          {/* Left CTA */}
          <div>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#F26A21",
                marginBottom: "16px",
                letterSpacing: "-0.03em",
                fontStyle: "italic",
              }}
            >
              Get in Touch
            </h2>

            <p
              style={{
                color: "#111827",
                fontSize: "16px",
                lineHeight: 1.65,
                maxWidth: "320px",
                marginBottom: "36px",
              }}
            >
              We welcome opportunities for partnership
              and collaboration. Let's connect.
            </p>

            <button
              style={{
                padding: "14px 36px",
                background: "transparent",
                border: "1.5px solid #111827",
                color: "#111827",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F26A21";
                e.currentTarget.style.borderColor = "#F26A21";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#111827";
                e.currentTarget.style.color = "#111827";
              }}
            >
              Contact Us
            </button>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <FaLinkedinIn size={16} color="#B5B5B5" />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                Follow our LinkedIn for news and updates
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                color: "#F26A21",
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "24px",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              Company —
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {["About Us", "Our People", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "15px",
                      color: "#111827",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F26A21")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h4
              style={{
                color: "#F26A21",
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "24px",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              Partnership —
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {["Our Approach", "Capabilities", "Markets"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "15px",
                      color: "#111827",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F26A21")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              style={{
                color: "#F26A21",
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "24px",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              Connect —
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {["LinkedIn", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: "15px",
                      color: "#111827",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F26A21")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(0,0,0,0.12)",
            marginTop: "64px",
            marginBottom: "28px",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["Privacy", "Copyright", "Terms & Conditions", "Cookies", "Do Not Sell"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "#F26A21",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {item}
              </a>
            ))}
          </div>

          <div style={{ fontSize: "13px", color: "#111827", fontWeight: 600 }}>
            © BW Design Group
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;