import FooterBenefits from "./FooterBenefits";
import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer aria-label="Site footer">
      <FooterBenefits />
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}