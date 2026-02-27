:root{
  --bg0:#0f0b07;
  --bg1:#1a120b;
  --card:rgba(255,255,255,.06);
  --card2:rgba(255,255,255,.08);
  --line:rgba(255,255,255,.10);

  --text:#fff7ed;
  --muted:rgba(255,247,237,.72);

  --accent:#d97706;
  --accent2:#a16207;

  --radius:18px;
  --shadow:0 18px 55px rgba(0,0,0,.55);

  --wrap:1100px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family:var(--font);
  color:var(--text);
  background:
    radial-gradient(900px 520px at 15% -10%, rgba(217,119,6,.30), transparent 60%),
    radial-gradient(850px 500px at 90% 10%, rgba(161,98,7,.18), transparent 55%),
    linear-gradient(180deg, var(--bg0) 0%, var(--bg1) 55%, #090604 100%);
}

a{ color:inherit; text-decoration:none; }
.wrap{ max-width:var(--wrap); margin:0 auto; padding:0 18px; }

.topbar{
  position:sticky; top:0; z-index:10;
  backdrop-filter: blur(10px);
  background: rgba(15,11,7,.72);
  border-bottom:1px solid var(--line);
}
.topbar-inner{
  display:flex; align-items:center; justify-content:space-between;
  gap:16px; padding:14px 0;
}
.brand{ display:flex; align-items:center; gap:12px; min-width:0; }
.logo-badge{
  width:54px; height:54px; border-radius:16px;
  background: rgba(255,247,237,.92);
  border:1px solid rgba(255,247,237,.45);
  display:grid; place-items:center;
  box-shadow:0 10px 25px rgba(0,0,0,.35);
  flex:0 0 auto;
}
.logo-badge img{ width:38px; height:38px; display:block; }
.brand-text{ min-width:0; }
.brand-name{ font-weight:800; letter-spacing:.2px; }
.brand-sub{ color:var(--muted); font-size:12px; margin-top:2px; }

.nav{ display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
.nav a{ color:var(--muted); padding:8px 10px; border-radius:12px; }
.nav a:hover{ background: rgba(255,255,255,.05); color:var(--text); }

.btn{
  border:1px solid var(--line);
  background: rgba(255,255,255,.06);
  padding:10px 12px;
  border-radius:14px;
  display:inline-flex; align-items:center; gap:10px;
}
.btn:hover{ background: rgba(255,255,255,.09); }
.btn.primary{
  background: linear-gradient(135deg, rgba(217,119,6,.32), rgba(217,119,6,.12));
  border-color: rgba(217,119,6,.55);
}
.btn.primary:hover{ border-color: rgba(217,119,6,.75); }

.hero{ padding:42px 0 18px; }
.hero-grid{
  display:grid; grid-template-columns: 1.25fr .75fr; gap:18px;
}
.card{
  background: var(--card);
  border:1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow:hidden;
}
.card-pad{ padding:18px; }
.kicker{ color:var(--muted); font-size:12px; letter-spacing:.14em; text-transform:uppercase; }
.h1{ margin:10px 0 0; font-size:34px; line-height:1.1; }
.p{ margin:12px 0 0; color:var(--muted); line-height:1.6; }
.cta-row{ margin-top:16px; display:flex; gap:10px; flex-wrap:wrap; }

.feature-list{ display:grid; gap:10px; margin-top:12px; }
.feature{
  background: rgba(0,0,0,.18);
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;
  padding:12px;
}
.feature b{ display:block; margin-bottom:4px; }
.feature span{ color:var(--muted); font-size:13px; }

.gallery{
  padding: 18px 0 42px;
}
.tiles{
  display:grid; gap:14px;
  grid-template-columns: repeat(12, 1fr);
}
.tile{
  grid-column: span 4;
  min-height: 160px;
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(0,0,0,.18));
  border:1px solid rgba(255,255,255,.10);
  border-radius: var(--radius);
}
.tile .cap{ padding:12px 14px; color:var(--muted); font-size:13px; }

.footer{
  border-top:1px solid var(--line);
  background: rgba(15,11,7,.75);
  padding: 16px 0;
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 900px){
  .hero-grid{ grid-template-columns: 1fr; }
  .tile{ grid-column: span 6; }
}
@media (max-width: 560px){
  .nav{ display:none; }
  .tile{ grid-column: span 12; }
  .h1{ font-size:28px; }
}