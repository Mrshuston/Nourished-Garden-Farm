export default function Footer() {
  return (
    <footer className="px-6 py-8 text-center text-sm text-muted">
      <p>
        &copy; {new Date().getFullYear()} The Nourished Garden & Farm.
        Affordable health coaching for women, men, kids, and families.
      </p>
      <p className="mx-auto mt-2 max-w-3xl">
        Disclaimer: Health coaching is educational and supportive. It does not
        diagnose, treat, cure, or replace medical, nutritional, developmental,
        or mental health care.
      </p>
    </footer>
  );
}
