"use client";

import { ChangeEvent, useState } from "react";
import "./sell.css";

const steps = ["Photos", "Details", "Story", "Price", "Review"];

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [sample, setSample] = useState(false);
  const [protectFace, setProtectFace] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [published, setPublished] = useState(false);
  const [title, setTitle] = useState("Gilded Line");
  const [description, setDescription] = useState("A striking black and antique-gold jazz costume with structured corset detailing, a high neckline, and a dramatic asymmetrical drape. Designed for powerful stage presence and precise movement.");

  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  }

  function generateListing() {
    setGenerating(true);
    window.setTimeout(() => { setGenerating(false); setGenerated(true); }, 700);
  }

  if (published) {
    return (
      <main className="sell-page success-page">
        <a className="wordmark" href="/">GINGE<span>.</span></a>
        <div className="publish-success"><span>✓</span><p className="eyebrow">Submitted for curation</p><h1>Your piece is ready<br /><em>for its next entrance.</em></h1><p>Our team will review the presentation and condition details. Most listings are live within 24 hours.</p><div><a href="/shop">View the collection</a><button onClick={() => { setPublished(false); setStep(0); }}>List another piece</button></div></div>
      </main>
    );
  }

  return (
    <main className="sell-page">
      <header className="sell-nav"><a className="wordmark" href="/">GINGE<span>.</span></a><p>Seller Studio</p><a href="/shop">Exit</a></header>
      <div className="seller-progress">
        {steps.map((label, index) => <button key={label} className={index === step ? "active" : index < step ? "complete" : ""} onClick={() => index <= step && setStep(index)}><span>{index < step ? "✓" : `0${index + 1}`}</span>{label}</button>)}
      </div>

      <section className="seller-workspace">
        <aside className="seller-intro">
          <p className="eyebrow">Step {step + 1} of 5</p>
          {step === 0 && <><h1>Begin with<br /><em>the piece.</em></h1><p>Good photographs build confidence. Ginge will crop, light, and prepare them for the collection.</p></>}
          {step === 1 && <><h1>Tell us what<br /><em>you know.</em></h1><p>Only the factual details. Ginge will turn them into an elevated, searchable listing.</p></>}
          {step === 2 && <><h1>Let Ginge<br /><em>shape the story.</em></h1><p>AI drafts the title, description, and theme tags. You remain in control of every word.</p></>}
          {step === 3 && <><h1>Price with<br /><em>confidence.</em></h1><p>We compare design, condition, original value, and current demand—not just the lowest listing.</p></>}
          {step === 4 && <><h1>Ready for<br /><em>another entrance.</em></h1><p>Review exactly what buyers will see before submitting it to Ginge.</p></>}
        </aside>

        <div className="seller-panel">
          {step === 0 && (
            <div className="photo-step">
              <div className="panel-heading"><div><span>Photography</span><h2>Add a clear front view</h2></div><button onClick={() => setSample(true)}>Use sample piece</button></div>
              <label className={(uploadedImage || sample) ? "upload-zone has-image" : "upload-zone"}>
                {(uploadedImage || sample) ? <img src={uploadedImage || "/inventory-gold.png"} alt="Uploaded costume preview"/> : <><b>+</b><h3>Drop a photograph here</h3><p>JPG or PNG · At least 1200px</p></>}
                <input type="file" accept="image/*" onChange={uploadPhoto}/>
              </label>
              <div className="photo-slots"><button className={(uploadedImage || sample) ? "filled" : ""}><span>{(uploadedImage || sample) ? "✓" : "+"}</span>Front</button><button><span>+</span>Back</button><button><span>+</span>Detail</button><button><span>+</span>Action</button></div>
              <div className="image-services"><label><input type="checkbox" defaultChecked/><i/>Place on a Ginge studio background</label><label><input type="checkbox" checked={protectFace} onChange={(event) => setProtectFace(event.target.checked)}/><i/>Detect and protect children&apos;s faces</label></div>
            </div>
          )}

          {step === 1 && (
            <div className="details-step">
              <div className="panel-heading"><div><span>Factual details</span><h2>What should buyers know?</h2></div><small>Required fields *</small></div>
              <div className="field-grid"><label>Dance style *<select defaultValue="Jazz"><option>Jazz</option><option>Contemporary</option><option>Lyrical</option><option>Character</option></select></label><label>Piece type *<select><option>Solo</option><option>Duo / Trio</option><option>Group</option></select></label><label>Tagged size *<select><option>Adult XS</option><option>Child L</option><option>Teen S</option></select></label><label>Condition *<select><option>Excellent</option><option>Pristine</option><option>Performance Ready</option></select></label><label>Designer or maker<input placeholder="Optional"/></label><label>Original price<input placeholder="$  Optional"/></label></div>
              <label className="full-field">Alterations or imperfections<textarea placeholder="Be specific. AI will not infer condition from a photograph."/></label>
              <details><summary>Add garment measurements <span>+</span></summary><div className="measurement-row"><input placeholder="Chest"/><input placeholder="Waist"/><input placeholder="Hips"/><input placeholder="Girth"/></div></details>
            </div>
          )}

          {step === 2 && (
            <div className="story-step">
              {!generated ? <div className="ai-generate"><div className="ai-orbit">G<span>●</span></div><p className="eyebrow">Ginge intelligence</p><h2>Your listing is ready to be written.</h2><p>We&apos;ll use the photographs and confirmed details to create a polished description, searchable themes, and an editorial title.</p><button onClick={generateListing}>{generating ? "Creating your listing…" : "Generate listing"} <span>↗</span></button></div> : <><div className="panel-heading"><div><span>AI draft</span><h2>Make it yours</h2></div><b className="generated-badge">Generated by Ginge</b></div><label className="full-field">Listing title<input value={title} onChange={(event) => setTitle(event.target.value)}/></label><label className="full-field">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)}/></label><div className="tag-section"><span>Suggested themes</span><div><button>Powerful ×</button><button>Art deco ×</button><button>Precision ×</button><button>Black & gold ×</button><button>+ Add theme</button></div></div></>}
            </div>
          )}

          {step === 3 && (
            <div className="price-step"><div className="panel-heading"><div><span>Ginge price guidance</span><h2>A strong opening price</h2></div></div><div className="price-recommendation"><p>Recommended range</p><strong>$235–$290</strong><span>Based on 18 comparable pieces, excellent condition, and above-average interest in black and gold jazz costumes.</span></div><label className="asking-price">Your asking price <div><span>$</span><input defaultValue="265"/></div></label><div className="earnings"><p>Buyer pays <strong>$265</strong></p><p>Ginge commission <strong>− $42</strong></p><p>You receive <strong>$223</strong></p></div><div className="first-entrance"><span>01</span><div><b>First Entrance boost included</b><p>Your first qualified listing receives seven days of priority discovery and matching to saved buyer searches.</p></div></div></div>
          )}

          {step === 4 && (
            <div className="review-step"><div className="panel-heading"><div><span>Buyer preview</span><h2>Review your presentation</h2></div><button onClick={() => setStep(0)}>Edit photos</button></div><div className="review-card"><div className="review-image" style={{backgroundImage:`url(${uploadedImage || "/inventory-gold.png"})`}}><span>First Entrance</span><button>♡</button></div><div className="review-copy"><p>Jazz / Solo</p><div><h2>{title}</h2><strong>$265</strong></div><span>Adult XS · Excellent</span><p>{description}</p><div className="review-tags"><span>Powerful</span><span>Art deco</span><span>Precision</span></div></div></div><label className="approval"><input type="checkbox" defaultChecked/><i/>I confirm that the condition, measurements, and photographs are accurate.</label></div>
          )}

          <div className="seller-controls"><button className="back" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>← Back</button>{step < 4 ? <button className="continue" disabled={(step === 0 && !uploadedImage && !sample) || (step === 2 && !generated)} onClick={() => setStep((value) => Math.min(4, value + 1))}>Continue <span>↗</span></button> : <button className="continue" onClick={() => setPublished(true)}>Submit for curation <span>↗</span></button>}</div>
        </div>
      </section>
      <footer className="seller-footer"><span>Your progress is saved automatically</span><a href="/">Need help? Ask the seller concierge</a></footer>
    </main>
  );
}
