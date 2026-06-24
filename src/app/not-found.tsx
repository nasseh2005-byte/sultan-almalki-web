import Link from "next/link";

export default function NotFound() {
  return (
    <main className="admin-shell" lang="ar" dir="rtl">
      <div className="section-inner">
        <span className="section-kicker">404</span>
        <h1 className="section-title">الصفحة غير موجودة</h1>
        <p className="section-lead">
          الرابط المطلوب غير متوفر داخل الموقع. يمكنك العودة إلى النسخة العربية أو الإنجليزية.
        </p>
        <div className="section-actions">
          <Link className="button button-primary" href="/ar">
            العربية
          </Link>
          <Link className="button button-secondary" href="/en">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
