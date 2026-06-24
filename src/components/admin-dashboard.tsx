import { approvedSnapshot, siteCopy } from "@/lib/data";
import { formatInteger, formatSarCompact } from "@/lib/format";

export function AdminDashboard() {
  const copy = siteCopy.ar;
  const tabs = ["نظرة عامة", "الأصايل", "السهلي", "الهاجدية", "حالول", "مستورة", "التنفيذ", "جودة البيانات"];

  return (
    <main className="admin-shell" lang="ar" dir="rtl">
      <div className="section-inner">
        <span className="section-kicker">لوحة إدارة</span>
        <h1 className="section-title">{copy.adminTitle}</h1>
        <p className="section-lead">{copy.adminLead}</p>

        <div className="admin-grid">
          <article className="card">
            <h3>إجمالي المحفظة</h3>
            <p dir="ltr">{formatInteger(approvedSnapshot.contractingPortfolio.totalCases, "ar")}</p>
          </article>
          <article className="card">
            <h3>قيمة المحفظة</h3>
            <p dir="ltr">{formatSarCompact(approvedSnapshot.contractingPortfolio.totalAmountSar, "ar")}</p>
          </article>
          <article className="card">
            <h3>طلبات التنفيذ</h3>
            <p dir="ltr">{formatInteger(approvedSnapshot.enforcementPortfolio.totalRequests, "ar")}</p>
          </article>
          <article className="card">
            <h3>قيمة التنفيذ</h3>
            <p dir="ltr">{formatSarCompact(approvedSnapshot.enforcementPortfolio.totalAmountSar, "ar")}</p>
          </article>
        </div>

        <div className="admin-tabs" aria-label="تبويبات التحليلات الداخلية">
          {tabs.map((tab) => (
            <span key={tab}>{tab}</span>
          ))}
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>الشركة</th>
              <th>عدد الملفات</th>
              <th>قيمة المحفظة</th>
              <th>طلبات التنفيذ</th>
              <th>قيمة التنفيذ</th>
            </tr>
          </thead>
          <tbody>
            {approvedSnapshot.contractingPortfolio.companies.map((company) => {
              const enforcement = approvedSnapshot.enforcementPortfolio.companies.find(
                (item) => item.key === company.key,
              );

              return (
                <tr key={company.key}>
                  <td>{company.nameAr}</td>
                  <td dir="ltr">{formatInteger(company.caseCount, "ar")}</td>
                  <td dir="ltr">{formatSarCompact(company.amountSar, "ar")}</td>
                  <td dir="ltr">{formatInteger(enforcement?.requestCount ?? 0, "ar")}</td>
                  <td dir="ltr">{formatSarCompact(enforcement?.amountSar ?? 0, "ar")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="disclaimer">
          هذه الصفحة لا تعرض ملفات خام أو أرقام قضايا. الاستيراد الفعلي يجب أن يحفظ الملفات الخاصة خارج
          GitHub وأن ينشر فقط اللقطات العامة المعتمدة.
        </p>
      </div>
    </main>
  );
}
