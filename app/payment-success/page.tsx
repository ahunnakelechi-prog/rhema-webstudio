export default function PaymentSuccessPage() {
  return (
    <main className="page-shell" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div className="panel-card" style={{ maxWidth: 620, width: "100%", padding: "40px 30px", textAlign: "center" }}>
        <p className="eyebrow">Payment received</p>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 12 }}>Thank you!</h1>
        <p style={{ color: "#a4b6d3", lineHeight: 1.7 }}>
          Your payment was successful. I will contact you soon to discuss your website project and next steps.
        </p>
        <a href="/" className="primary-btn" style={{ marginTop: 20 }}>
          Back to homepage
        </a>
      </div>
    </main>
  );
}
